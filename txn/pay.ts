import algosdk from "algosdk";
import { algodClient } from "./client"

(async () => {
  const prompt = require('prompt-sync')()

  const sendermn = prompt("Insert sender account mnemonic: ")
  const receiveradd = prompt("Insert receiver address: ")
  const amount = parseInt(prompt("Insert amount to transfer: "))

  const suggestedParams = await algodClient.getTransactionParams().do()
  const account = algosdk.mnemonicToSecretKey(sendermn)

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: account.addr,
    to: receiveradd,
    amount,
    suggestedParams,
    note: Uint8Array.from("Test note".split("").map(x => x.charCodeAt(0)))
  })

  const signedTx = txn.signTxn(account.sk)

  const tx = await algodClient.sendRawTransaction(signedTx).do()

  await algosdk.waitForConfirmation(algodClient, tx.txId, 4)
  console.log('Transaction ID: ' + tx.txId)
})()
