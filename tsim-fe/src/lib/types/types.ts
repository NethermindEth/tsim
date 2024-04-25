export type Felt = `0x${string}`;
export type Hash = `0x${string}`;
export type Address = `0x${string}`;
export type Uint26 = number;


export const goerli = {
    id: 3,
    network: 'homestead',
    name: 'Starknet Goerli',
    nativeCurrency: { name: 'Stark', symbol: 'STRK', decimals: 18 },
    rpcUrls: {
        alchemy: {
            http: ['https://starknet-mainnet.g.alchemy.com/v2'],
            webSocket: ['wss://starknet-mainnet.g.alchemy.com/v2'],
        },
        infura: {
            http: ['https://starknet-goerli.infura.io/v3'],
            webSocket: ['wss://starknet-goerli.infura.io/ws/v3'],
        },
        default: {
            http: ['https://free-rpc.nethermind.io/goerli-juno'],
        },
        public: {
            http: ['https://free-rpc.nethermind.io/goerli-juno'],
        },
    },
    blockExplorers: {
        starkcompass: {
            name: 'Stark Compass',
            url: 'https://starkcompass.com',
        },
        voyager: {
            name: 'Voyager',
            url: 'https://voyager.online',
        },
        starkscan: {
            name: 'Stark Scan',
            url: 'https://starkscan.co',
        },
        default: {
            name: 'Stark Compass',
            url: 'https://starkcompass.com',
        },
    },
}

export type Chain = {
    id: number,
    network: string,
    name: string,
    nativeCurrency: {
        name: string,
        symbol: string,
        decimals: number
    }
    rpcUrls: any,
    blockExplorers: any
}