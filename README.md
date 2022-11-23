Spectric NFT
------------


Based on tutorials: 

* https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft
* https://ethereum.org/en/developers/tutorials/how-to-mint-an-nft/
* https://ethereum.org/en/developers/tutorials/how-to-view-nft-in-metamask/

Spectric NFT (SNFT) Contract/Tokens were made using openzepplin and defined in
the `contracts/SpectricNFT.sol` file.  This is a basic token that stores a URI. 

* https://etherscan.io/address/0xaa5e9053dc9dd5729c2910677c822ee03d922160
* https://etherscan.io/token/0xaa5e9053dc9dd5729c2910677c822ee03d922160

After the fact it would have been nice to know that the `totalSupply()` method
could have been implemented.  The cost to place the contract on the blockchain
is non-trival ($25+) so SNFT will remain as implemented.

The URI that is stored is an
[IPFS metadata file](https://gateway.pinata.cloud/ipfs/QmXghvpX2LZj4y84d22FaNDq9o42Ec77UdLzuNreNkU7Bm) 
that links to an
[IPFS image file](https://gateway.pinata.cloud/ipfs/QmVHGNDXWD348uurrLH7aQn8vGywnNSiYkLpCwXaYtr8cG)

Each employee at the 3rd anniversary receives a token, with the Token ID being incremented

Running `npx hardhat --network mainnet run scripts/deploy.js` creates the contract on the blockchain.
Then NFTs can be minted with `node scripts/mint-nft.js`.

Code was added to `mint-nft.js` to only attempt to mint a token when it's expected to cost $2 or less.  This
is important because if you submit a request with too little gas, the transaction will fail but you will still
pay the transaction fee.

The `interact.js` application extract the stored token URI.  The tutorials show that MetaMask will display
the token image directly, but I wasn't able to get that to work.

The `transfer-nft.js` shows the code necessary to transfer a token to another wallet.

The `wallets.py` application generates 1 or more wallet addresses along with private keys.
