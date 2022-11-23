async function main() {
    const SpectricNFT = await ethers.getContractFactory("SpectricNFT")

    // Start deployment, returning a promise that resolves to a contract object
    const spectricNFT = await SpectricNFT.deploy()
    await spectricNFT.deployed()
    console.log("Contract deployed to address:", spectricNFT.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
})
  