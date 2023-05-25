import algosdk from "algosdk";
import { algodClient } from "./client"

(async () => {
  const prompt = require('prompt-sync')()

  const sendermn = prompt("Ingrese mnemonic de cuenta 1: ")
  const receiveradd = prompt("Ingrese cuenta 2 a recibir: ")
  const amount = parseInt(prompt("Monto a transferir: "))

  const suggestedParams = await algodClient.getTransactionParams().do()
  const account = algosdk.mnemonicToSecretKey(sendermn)

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: account.addr,
    to: receiveradd,
    amount,
    suggestedParams
  })

  const signedTx = txn.signTxn(account.sk)
  const tx = await algodClient.sendRawTransaction(signedTx).do()
  await algosdk.waitForConfirmation(algodClient, tx.txId, 4)
  console.log('Transaction ID: ' + tx.txId)
})()
