<<<<<<< HEAD:frontend/app/config.ts
import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { defineChain } from "viem";

const sonicBlazeTestnet = defineChain({
  id: 57054,
  name: "Sonic Blaze Testnet",
  network: "sonic-blaze-testnet",
  nativeCurrency: {
    name: "Sonic Blaze Testnet Ether",
    symbol: "S",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.blaze.soniclabs.com"] },
  },
  blockExplorers: {
    default: {
      name: "Sonic Blaze Explorer",
      url: "https://testnet.sonicscan.org/",
    },
  },
  testnet: true,
});

export function getConfig() {
  return createConfig({
    chains: [sonicBlazeTestnet],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [sonicBlazeTestnet.id]: http(),
    },
  });
=======
import { 
    createConfig, 
    http, 
    cookieStorage,
    createStorage
} from 'wagmi'
import { defineChain } from 'viem'

const sonicBlazeTestnet = defineChain({
    id: 57054,
    name: 'Sonic Blaze Testnet',
    network: 'sonic-blaze-testnet',
    nativeCurrency: {
        name: 'Sonic Blaze Testnet Ether',
        symbol: 'S',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://rpc.blaze.soniclabs.com'] },
    },
    blockExplorers: {
        default: { name: 'Sonic Blaze Explorer', url: 'https://testnet.sonicscan.org/' },
    },
    testnet: true,
})

export function getConfig() {
    return createConfig({
        chains: [sonicBlazeTestnet],
        ssr: true,
        storage: createStorage({
            storage: cookieStorage,
        }),
        transports: {
            [sonicBlazeTestnet.id]: http(),
        },
    })
>>>>>>> b6506f3e80291a8ee66695cc4e9a0ef7eacc7adb:app/config.ts
}
