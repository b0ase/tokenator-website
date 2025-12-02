const bsv = require('bsv')

export interface TokenUTXO {
  txId: string
  outputIndex: number
  satoshis: number
  script: string
  tokenAmount?: number
}

export class SafeTokenBuilder {
  private tx: any
  private tokenInputs: any[]
  private totalInputTokens: number

  constructor() {
    this.tx = new bsv.Transaction()
    this.tokenInputs = []
    this.totalInputTokens = 0
  }

  addTokenInput(utxo: TokenUTXO, tokenAmount: number, privateKey: any) {
    this.tx.from(utxo)
    this.tokenInputs.push({
      utxo,
      tokenAmount: parseInt(tokenAmount.toString()),
      privateKey
    })
    this.totalInputTokens += parseInt(tokenAmount.toString())
    return this
  }

  createTokenOutput(address: any, tokenAmount: number, tokenId: string, protocol: 'bsv-21' | 'brc-100' = 'bsv-21') {
    if (tokenAmount <= 0) {
      throw new Error('Token amount must be positive')
    }

    const transferData = {
      p: protocol,
      op: 'transfer',
      amt: tokenAmount.toString(),
      id: tokenId
    }

    const script = new bsv.Script()
      .add(bsv.Opcode.OP_0)
      .add(bsv.Opcode.OP_RETURN)
      .add(bsv.deps.Buffer.from('ord', 'utf8'))
      .add(bsv.deps.Buffer.from(`application/${protocol}`, 'utf8'))
      .add(bsv.deps.Buffer.from(JSON.stringify(transferData), 'utf8'))

    // Add the actual address output after the OP_RETURN
    const fullScript = bsv.Script.fromASM(
      script.toASM() + ' ' + 
      bsv.Script.buildPublicKeyHashOut(address).toASM()
    )

    this.tx.addOutput(new bsv.Transaction.Output({
      satoshis: 1,
      script: fullScript
    }))

    return this
  }

  createTokenChangeOutput(changeAddress: any, tokenId: string, protocol: 'bsv-21' | 'brc-100' = 'bsv-21') {
    const totalOutputTokens = this.tx.outputs
      .filter((out: any) => out.satoshis === 1)
      .reduce((sum: number, out: any) => {
        const scriptStr = out.script.toString()
        const match = scriptStr.match(/"amt":"(\d+)"/)
        return sum + (match ? parseInt(match[1]) : 0)
      }, 0)

    const changeTokens = this.totalInputTokens - totalOutputTokens

    if (changeTokens > 0) {
      console.log(`Creating CHANGE output for ${changeTokens} tokens`)
      this.createTokenOutput(changeAddress, changeTokens, tokenId, protocol)
    } else if (changeTokens < 0) {
      throw new Error(`FATAL: Trying to send ${totalOutputTokens} tokens but only have ${this.totalInputTokens}`)
    }

    return this
  }

  addBsvChange(changeAddress: any) {
    this.tx.change(changeAddress)
    return this
  }

  sign(privateKeys: any | any[]) {
    if (!Array.isArray(privateKeys)) {
      privateKeys = [privateKeys]
    }
    
    // Sign with SIGHASH_FORKID for BSV
    privateKeys.forEach((key: any) => {
      this.tx.sign(key, bsv.crypto.Signature.SIGHASH_ALL | bsv.crypto.Signature.SIGHASH_FORKID)
    })

    // SAFETY CHECK: Verify token balance
    const inputTokens = this.totalInputTokens
    const outputTokens = this.tx.outputs
      .filter((out: any) => out.satoshis === 1)
      .reduce((sum: number, out: any) => {
        const scriptStr = out.script.toString()
        const match = scriptStr.match(/"amt":"(\d+)"/)
        return sum + (match ? parseInt(match[1]) : 0)
      }, 0)

    if (inputTokens !== outputTokens) {
      throw new Error(`TOKEN MISMATCH: ${inputTokens} in, ${outputTokens} out. Would burn ${inputTokens - outputTokens} tokens!`)
    }

    return this
  }

  build() {
    return this.tx
  }

  toHex() {
    return this.tx.serialize()
  }
}

export function createDeployTransaction(params: {
  ticker: string
  maxSupply: number
  decimals: number
  privateKey: any
  address: any
  utxo: TokenUTXO
  protocol?: 'bsv-21' | 'brc-100'
}) {
  const { ticker, maxSupply, decimals, privateKey, address, utxo, protocol = 'bsv-21' } = params

  const deployData = {
    p: protocol,
    op: 'deploy',
    tick: ticker,
    max: maxSupply.toString(),
    dec: decimals.toString()
  }

  const tx = new bsv.Transaction()
  tx.from(utxo)

  const script = new bsv.Script()
    .add(bsv.Opcode.OP_0)
    .add(bsv.Opcode.OP_RETURN)
    .add(bsv.deps.Buffer.from('ord', 'utf8'))
    .add(bsv.deps.Buffer.from(protocol === 'bsv-21' ? 'application/bsv-21' : 'text/plain', 'utf8'))
    .add(bsv.deps.Buffer.from(JSON.stringify(deployData), 'utf8'))

  tx.addOutput(new bsv.Transaction.Output({
    satoshis: 1,
    script: script
  }))

  tx.change(address)
  tx.fee(500)
  tx.sign(privateKey, bsv.crypto.Signature.SIGHASH_ALL | bsv.crypto.Signature.SIGHASH_FORKID)

  return {
    tx,
    hex: tx.serialize(),
    tokenId: `${tx.id}_0`
  }
}

export function createMintTransaction(params: {
  ticker: string
  amount: number
  privateKey: any
  address: any
  utxo: TokenUTXO
  protocol?: 'bsv-21' | 'brc-100'
}) {
  const { ticker, amount, privateKey, address, utxo, protocol = 'bsv-21' } = params

  const mintData = {
    p: protocol,
    op: 'mint',
    tick: ticker,
    amt: amount.toString()
  }

  const tx = new bsv.Transaction()
  tx.from(utxo)

  const script = new bsv.Script()
    .add(bsv.Opcode.OP_0)
    .add(bsv.Opcode.OP_RETURN)
    .add(bsv.deps.Buffer.from('ord', 'utf8'))
    .add(bsv.deps.Buffer.from(protocol === 'bsv-21' ? 'application/bsv-21' : 'text/plain', 'utf8'))
    .add(bsv.deps.Buffer.from(JSON.stringify(mintData), 'utf8'))

  // Combine with recipient address
  const fullScript = bsv.Script.fromASM(
    script.toASM() + ' 51 ' + // OP_1
    bsv.Script.buildPublicKeyHashOut(address).toASM()
  )

  // Force 1-sat output bypassing dust checks
  const output = new bsv.Transaction.Output({
    satoshis: 1,
    script: fullScript
  })
  
  tx.outputs.push(output)
  tx._outputAmount = 1
  
  // Change
  const changeAmount = utxo.satoshis - 1 - 500
  tx.outputs.push(new bsv.Transaction.Output({
    satoshis: changeAmount,
    script: bsv.Script.buildPublicKeyHashOut(address)
  }))
  tx._outputAmount += changeAmount

  // Sign with SIGHASH_FORKID
  const sigtype = bsv.crypto.Signature.SIGHASH_ALL | bsv.crypto.Signature.SIGHASH_FORKID
  const sig = bsv.Transaction.Sighash.sign(
    tx, privateKey, sigtype,
    0, bsv.Script.buildPublicKeyHashOut(address), 
    new bsv.crypto.BN(utxo.satoshis)
  )
  
  tx.inputs[0].setScript(
    bsv.Script.buildPublicKeyHashIn(
      privateKey.toPublicKey(),
      sig,
      sigtype
    )
  )

  return {
    tx,
    hex: tx.uncheckedSerialize ? tx.uncheckedSerialize() : tx.serialize()
  }
}