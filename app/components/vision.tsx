"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Shield, Code, Users } from "lucide-react"

export default function Vision() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const visionPoints = [
    {
      icon: <Music className="h-10 w-10 text-purple-400" />,
      title: "Open Creation",
      description:
        "Eliminating high barriers to dance video production through decentralized tools and AI-powered generation.",
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-400" />,
      title: "Ownership & Privacy",
      description:
        "Ensuring musicians, dancers, and AI contributors maintain control over their work and data sovereignty.",
    },
    {
      icon: <Code className="h-10 w-10 text-indigo-400" />,
      title: "Transparent Value",
      description: "Recording creation and distribution on blockchain for fair value distribution to all participants.",
    },
    {
      icon: <Users className="h-10 w-10 text-violet-400" />,
      title: "Collaborative Ecosystem",
      description: "Fostering seamless collaboration between music creators, dance enthusiasts, and AI developers.",
    },
  ]

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-purple-950/20 to-black opacity-50"></div>
      <div ref={ref} className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            Redefining Creative{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Ownership
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            In the 2025 landscape of generative AI and metaverse expansion, Tempo unleashes a Web3 storm driven by
            Tempo. We liberate creation from centralized constraints, building a permissionless Tempo metaverse.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {visionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-purple-950/50 p-4">{point.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{point.title}</h3>
                  <p className="text-gray-400">{point.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

