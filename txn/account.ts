import algosdk from "algosdk";

const account = algosdk.generateAccount()
console.log(account)
const mnemonic = algosdk.secretKeyToMnemonic(account.sk)
console.log(`Mnemonic is: ${mnemonic}`)
