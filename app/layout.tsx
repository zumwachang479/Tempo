import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Tempo - Web3 Music-Driven Dance Metaverse</title>
        <meta
          name="description"
          content="Tempo is a Web3 project using AI to generate dance videos from music, creating a decentralized creative ecosystem powered by $TEMPO."
        />
      </head>
      <body className={`${inter.className} bg-black`}>
      <ContextProvider cookies={null}>{children}</ContextProvider>
      </body>
    </html>
  )
}



import './globals.css'
import ContextProvider from "./providers"

export const metadata = {
      generator: 'v0.dev'
    };
