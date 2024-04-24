export const sepolia = {
    id: 2,
    network: 'homestead',
    name: 'Starknet Sepolia',
    nativeCurrency: { name: 'Stark', symbol: 'STRK', decimals: 18 },
    rpcUrls: {
        alchemy: {
            http: ['https://starknet-sepolia.g.alchemy.com/v2'],
            webSocket: ['wss://starknet-sepolia.g.alchemy.com/v2'],
        },
        infura: {
            http: ['https://starknet-sepolia.infura.io/v3'],
            webSocket: ['wss://starknet-sepolia.infura.io/ws/v3'],
        },
        default: {
            http: ['https://free-rpc.nethermind.io/sepolia-juno/'],
        },
        public: {
            http: ['https://free-rpc.nethermind.io/sepolia-juno/'],
        },
    },
    blockExplorers: {
        starkcompass: {
            name: 'Stark Compass',
            url: 'https://sepolia.starkcompass.com',
        },
        voyager: {
            name: 'Voyager',
            url: 'https://sepolia.voyager.online',
        },
        starkscan: {
            name: 'Stark Scan',
            url: 'https://sepolia.starkscan.co',
        },
        default: {
            name: 'Stark Compass',
            url: 'https://sepolia.starkcompass.com',
        },
    },
}