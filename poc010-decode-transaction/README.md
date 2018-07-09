# POC016 - Decode transactions

This is a proof of concept supplied by ConsenSys to show which data is added to the ethereum blockchain while submitting a new transaction. The data that is submitted is transcoded and not encrypted. 
Privacy and blockchains don't go hand in hand. Currently, 14-05-2018, privacy is not possible on a public blockchain.

## How to install abi-decoder

## ConsenSys abi-decoder
Nodejs and Javascript library for decoding data params and events from etherem transactions

# Install
```
npm install abi-decoder
bower install abi-decoder
```
# Screenshot of decode-example.html
![https://github.com/teamforus/research-and-development/blob/poc016-decode-transaction/poc016-decode-transaction/docs/screenshot.png](https://github.com/teamforus/research-and-development/blob/poc016-decode-transaction/poc016-decode-transaction/docs/screenshot.png)


# Instantiate
Use decode-example.html or write your own test setup from scratch:

```js
<script src="bower_components/abi-decoder/dist/abi-decoder.js"> // Javascript
const abiDecoder = require('abi-decoder'); // NodeJS
```

# Add ABI's
Need to pass the ABI's manually to the library in order to be able to decode params later
```js
const testABI = [{"inputs": [{"type": "address", "name": ""}], "constant": true, "name": "isInstantiation", "payable": false, "outputs": [{"type": "bool", "name": ""}], "type": "function"}, {"inputs": [{"type": "address[]", "name": "_owners"}, {"type": "uint256", "name": "_required"}, {"type": "uint256", "name": "_dailyLimit"}], "constant": false, "name": "create", "payable": false, "outputs": [{"type": "address", "name": "wallet"}], "type": "function"}, {"inputs": [{"type": "address", "name": ""}, {"type": "uint256", "name": ""}], "constant": true, "name": "instantiations", "payable": false, "outputs": [{"type": "address", "name": ""}], "type": "function"}, {"inputs": [{"type": "address", "name": "creator"}], "constant": true, "name": "getInstantiationCount", "payable": false, "outputs": [{"type": "uint256", "name": ""}], "type": "function"}, {"inputs": [{"indexed": false, "type": "address", "name": "sender"}, {"indexed": false, "type": "address", "name": "instantiation"}], "type": "event", "name": "ContractInstantiation", "anonymous": false}];
abiDecoder.addABI(testABI);
```

# Decode Tx data
```js
const testData = "0x53d9d9100000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114de5000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114daa";
const decodedData = abiDecoder.decodeMethod(testData);
```

# Decode Logs from Tx Receipt
```js
web3.eth.getTransactionReceipt("0x9199e262aaab0a6ec99558b3e9f42397c07a2bb9c6befb637643aebfb03cc32a", function(e, receipt) {
  const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
});
```
