#!/usr/bin/env python
import sys
from web3 import Web3

try:
    num_wallets = int(sys.argv[1])
except IndexError:
    num_wallets = 1

w3 = Web3()
print("idx,account,private_key")
for ii in range(num_wallets):
    acc = w3.eth.account.create();
    print(f"{ii+2},{acc.address},{w3.toHex(acc.privateKey)}")