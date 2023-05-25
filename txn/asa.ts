import algosdk from 'algosdk'
import { algodClient } from "./client"

(async () => {
  const prompt = require('prompt-sync')()

  const signermn = prompt("Ingrese mnemonic del creador: ")
  const decimals = parseInt(prompt("Decimales del asset: "))
  const total = parseInt(prompt("Total de unidades del asset: "))
  const unitName = prompt("Nombre de unidad del asset: ")
  const assetName = prompt("Nombre del asset: ")

  const suggestedParams = await algodClient.getTransactionParams().do()
  const signer = await algosdk.mnemonicToSecretKey(signermn)

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    decimals,
    total,
    from: signer.addr,
    defaultFrozen: false,
    unitName,
    assetName,
    suggestedParams
  })

  const signedTx = txn.signTxn(signer.sk)
  const tx = await algodClient.sendRawTransaction(signedTx).do()
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4)
  console.log('Transaction ID: ' + tx.txId + '-----Asset ID: ' + confirmedTxn['asset-index'])
})()

