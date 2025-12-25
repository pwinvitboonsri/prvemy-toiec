#!/bin/bash

# This script decrypts the specific string using your secret key via OpenSSL
# Flags used:
# -aes-256-cbc: The encryption algorithm
# -d: Decrypt
# -a: Input is Base64 encoded
# -k: The secret key
# -md md5: Use legacy MD5 hashing to match CryptoJS default behavior

echo "U2FsdGVkX1/FbsR4h/3HYx97yTwspBYpfk1wWtpoU7PdqAeiskkCg/tLqES0bxuQeckwiiGeJ39AXpZfeXdHfuroBL3J8GMJfZ7lq+Gj7Gwnl5u9jx+UC2IMMPKVdqs/evUggHAvLJCP+TPDjQ0h107rXod279WYObltV0PIqLgpGFCBe3InHZ/Evdz2Ytubuux8pbTNGfgvR7Z1VVSdqlxZ3nHLRt66jXzr+aLT6AhsZ++pqeXybjb/Emnn419j" | openssl enc -aes-256-cbc -d -a -k "vmIit2YjfdWSWCQTiJbvQ6INdBSDN0KAbr4uGinDjHk=" -md md5