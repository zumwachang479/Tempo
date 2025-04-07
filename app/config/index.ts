import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import {
  AppKitNetwork,
  arbitrum,
  bitcoin,
  bitcoinTestnet,
  mainnet,
  optimism,
  polygon,
  solana,
  solanaDevnet,
  solanaTestnet
} from '@reown/appkit/networks'
import {
  createAppKit,
  useAppKit,
  useAppKitAccount,
  useAppKitEvents,
  useAppKitNetwork,
  useAppKitState,
  useAppKitTheme,
  useDisconnect,
  useWalletInfo
} from '@reown/appkit/react'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'b56e18d47c72ab683b10814fe9495694' // this is a public projectId only to use on localhost

export const networks = [
  mainnet,
  polygon,
  arbitrum,
  optimism,
  solana,
  solanaDevnet,
  solanaTestnet,
  bitcoin,
  bitcoinTestnet
] as [AppKitNetwork, ...AppKitNetwork[]]

// Setup wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId
})

export const solanaAdapter = new SolanaAdapter()

export const bitcoinAdapter = new BitcoinAdapter()

// Create modal
const modal = createAppKit({
  adapters: [wagmiAdapter, solanaAdapter, bitcoinAdapter],
  networks,
  metadata: {
    name: 'The Web3 Music-Driven Dance Metaverse',
    description: 'Redefining creative ownership through AI-generated dance, blockchain transparency, and decentralized collaboration',
    url: 'https://tempo-vedio.xyz',
    icons: ['https://tempo-vedio.xyz/ryf.png']
  },
  projectId,
  themeMode: 'light',
  features: {
    analytics: true
  }
})

export {
  modal,
  useAppKit,
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
  useAppKitNetwork,
  useDisconnect
}
