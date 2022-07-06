const {createWatcher} = require("createWatcher");
const {ethers} = require("ethers");

// Contract addresses used in this example
let CONTRACT_ADDRESS = "0x49354813d8BFCa86f778DfF4120ad80E4D96D74E"

// The JSON RPC URL and multicall contract address can also be specified in the config:
const config = {
    rpcUrl: 'https://evm-t3.cronos.org',
    multicallAddress: '0x2E20b73235cE8E941A35654c9d1D55DD057F83B9'
  };

  const citys = ["shanghai", "hongkong", "london"];

// Create watcher
const watcher = createWatcher(
  [
    {
      target: CONTRACT_ADDRESS,
      call: ['getWeather(uint32, bytes32)(uint32)', 69931805,ethers.utils.formatBytes32String(citys[0])],
      returns: [['temperature']]
    }
  ],
  config
);

// Subscribe to state updates
watcher.subscribe(update => {
console.log(`Update: ${update.type} = ${update.value}`);
});

// Subscribe to batched state updates
watcher.batch().subscribe(updates => {
  // Handle batched updates here
  // Updates are returned as { type, value } objects, e.g:
  // { type: 'BALANCE_OF_MKR_WHALE', value: 70000 }
});

// Subscribe to new block number updates
watcher.onNewBlock(blockNumber => {
  console.log('New block:', blockNumber);
});

// Start the watcher polling
watcher.start();