export const devnet = {
  id: 11,
  network: 'homestead',
  name: 'Starknet DevNet',
  nativeCurrency: { name: 'Stark', symbol: 'STRK', decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ['https://starknet-mainnet.g.alchemy.com/v2'],
      webSocket: ['wss://starknet-mainnet.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://starknet-mainnet.infura.io/v3'],
      webSocket: ['wss://starknet-mainnet.infura.io/ws/v3'],
    },
    default: {
      http: ['https://free-rpc.nethermind.io/mainnet-juno'],
    },
    public: {
      http: ['https://free-rpc.nethermind.io/mainnet-juno'],
    },
  },
  blockExplorers: {
    starkcompass: {
      name: 'Stark Compass',
      url: 'https://goerli.starkcompass.com',
    },
    voyager: {
      name: 'Voyager',
      url: 'https://goerli.voyager.online',
    },
    starkscan: {
      name: 'Stark Scan',
      url: 'https://goerli.starkscan.co',
    },
    default: {
      name: 'Stark Compass',
      url: 'https://goerli.starkcompass.com',
    },
  },
}