"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Coins, Lock, Users, ShoppingCart, Droplet, Gift } from "lucide-react"

export default function Tokenomics() {
  const tokenDistribution = [
    { name: "Ecosystem & Creative Fund", percentage: 30, icon: <Coins className="h-6 w-6 text-purple-400" /> },
    { name: "Team (4-year vesting)", percentage: 20, icon: <Lock className="h-6 w-6 text-blue-400" /> },
    { name: "Early Contributors", percentage: 15, icon: <Users className="h-6 w-6 text-indigo-400" /> },
    { name: "Public Sale", percentage: 20, icon: <ShoppingCart className="h-6 w-6 text-violet-400" /> },
    { name: "Liquidity", percentage: 10, icon: <Droplet className="h-6 w-6 text-pink-400" /> },
    { name: "Airdrop", percentage: 5, icon: <Gift className="h-6 w-6 text-cyan-400" /> },
  ]

  const tokenUtility = [
    {
      title: "Access",
      description: "Use $TEMPO to access generation services and marketplace features",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      title: "Governance",
      description: "Stake $TEMPO to participate in protocol decisions and upgrades",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Staking",
      description: "Earn rewards by supporting computation nodes with $TEMPO",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      title: "Payments",
      description: "Pay for generation, storage, and computation services",
      gradient: "from-violet-500 to-purple-500",
    },
  ]

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-blue-950/10 to-black opacity-50"></div>
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            $TEMPO{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Tokenomics
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
          Launching via a fair launch on Pump.fun, the Tempo Token ($TEMPO) is the lifeblood of our ecosystem, powering access, governance, staking, and payments.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-purple-900/50 bg-black/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-6 text-2xl">Token Distribution</h3>
                <p className="mb-6 text-gray-400">Total Supply: 1,000,000,000 $TEMPO</p>
                <div className="space-y-4">
                  {tokenDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="rounded-full bg-purple-950/50 p-2">{item.icon}</div>
                      <div className="flex-1">
                        <div className="mb-1 flex justify-between">
                          <span>{item.name}</span>
                          <span className="font-semibold">{item.percentage}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-purple-900/50 bg-black/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-6 text-2xl">Token Utility</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {tokenUtility.map((item, index) => (
                    <div key={index} className="rounded-lg border border-purple-900/50 bg-black/40 p-4">
                      <div className={`mb-3 h-1 w-16 rounded bg-gradient-to-r ${item.gradient}`}></div>
                      <h4 className="mb-2 text-lg font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg border border-purple-900/50 bg-black/40 p-4">
                  <h4 className="mb-2 text-lg font-medium">Dynamic Mechanisms</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      <span>Creator incentives for high-quality video generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span>Value flow with NFT fees used for token buyback and burn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                      <span>Deflationary pressure through service fee burning</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

