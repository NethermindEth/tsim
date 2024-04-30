export const devnet = {
  id: 11,
  network: 'homestead',
  name: 'Starknet DevNet',
  nativeCurrency: { name: 'Stark', symbol: 'STRK', decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ['http://127.0.0.1:5050'],
      webSocket: ['wss://starknet-mainnet.g.alchemy.com/v2'],
    },
    infura: {
      http: ['http://127.0.0.1:5050'],
      webSocket: ['wss://starknet-mainnet.infura.io/ws/v3'],
    },
    default: {
        http: ['http://127.0.0.1:5050'],
    },
    public: {
      http: ['http://127.0.0.1:5050'],
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
  isTestnet: true,
  isLocalNode: true
}

