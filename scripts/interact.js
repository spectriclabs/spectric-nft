const { Contract } = require("ethers")
const { ethers } = require("hardhat")

require("dotenv").config()
const API_KEY = process.env.API_KEY
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contractAbi = require("../artifacts/contracts/SpectricNFT.sol/SpectricNFT.json")

const provider = new ethers.providers.AlchemyProvider(network="mainnet", apiKey=API_KEY)
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, provider)

async function main() {
    const name= await contract.name();
    console.log("contract name: ", name);

    const uri= await contract.tokenURI(1);
    console.log("token uri", uri);
}
main();