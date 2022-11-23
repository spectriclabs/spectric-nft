require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/SpectricNFT.sol/SpectricNFT.json")
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS)

async function mintNFT(tokenURI, destination, nonce) {
  if (!nonce) {
    nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
  }
  
  console.log("Using nonce", nonce)
  const maxGas = 200000

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: CONTRACT_ADDRESS,
    nonce: nonce,
    gas: maxGas,
    data: nftContract.methods.mintNFT(destination, tokenURI).encodeABI(),
  }

  let gasPrice = await web3.eth.getGasPrice() // return price in WEI
  let gasNeeded = await web3.eth.estimateGas(tx)
  let baseFeePerGas = await (await web3.eth.getBlock("pending")).baseFeePerGas;

  baseFeePerGas = baseFeePerGas * 1e-9
  gasPrice = gasPrice * 1e-9  // convert to GWEI
  transactionFees = gasNeeded * gasPrice * 1e-9 // convert to ETH

  ethToDollarEstimate = 1650
  transactionFeesDollars = transactionFees * ethToDollarEstimate

  console.log("Base Fee", baseFeePerGas)
  console.log("Gas price (WEI)", gasPrice) // in WEI
  console.log("Gas needed", gasNeeded)
  console.log("Transaction Price", transactionFees, "$", transactionFeesDollars)

  if (gasNeeded > maxGas) {
    console.log("Not enough gas!")
    return
  }
  if (transactionFeesDollars > 2.25) {
      console.log("Try again later when it's less expensive")
      return
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}

mintNFT("ipfs://QmXghvpX2LZj4y84d22FaNDq9o42Ec77UdLzuNreNkU7Bm", process.argv[2], process.argv[3])
