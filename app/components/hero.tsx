"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 h-full w-full bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/placeholder.svg?height=1080&width=1920"
        >
          <source
            src="https://aistdancedb.ongaaccel.jp/v1.0.0/video/10M/gBR_sBM_c01_d04_mBR1_ch06.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay/mask for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          className="mb-6 flex items-center justify-center h-24 w-24"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="logoWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#ff00cc", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#9900ff", stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="logoNoteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#ff007a", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#cc00ff", stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            {/* Wave paths */}
            <path
              d="M 40 180 Q 80 80 120 180 Q 140 200 160 140"
              stroke="url(#logoWaveGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 60 160 Q 100 100 140 160"
              stroke="#cc00ff"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Music note */}
            <g transform="translate(85, 85)">
              <g>
                {/* Note stem */}
                <path d="M 15 0 L 15 30" stroke="#ff007a" strokeWidth="4" fill="none" strokeLinecap="round" />
                {/* Note head */}
                <circle cx="15" cy="30" r="12" fill="url(#logoNoteGrad)" />
                {/* Flags */}
                <path d="M 15 0 Q 25 5 20 15" stroke="#cc00ff" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 15 5 Q 23 10 18 20" stroke="#cc00ff" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
              {/* Bouncing animation */}
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 -30; 0 0"
                dur="0.8s"
                repeatCount="indefinite"
                additive="sum"
              />
            </g>

            {/* Outer ring */}
            <circle
              cx="100"
              cy="100"
              r="85"
              stroke="url(#logoWaveGrad)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="10,5"
            />
          </svg>
        </motion.div>

        <motion.h1
          className="mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 bg-clip-text text-6xl font-bold tracking-tighter text-transparent sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Tempo
        </motion.h1>

        <motion.p
          className="mb-8 max-w-[700px] text-lg text-gray-400 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The Web3 Music-Driven Dance Metaverse. Redefining creative ownership through AI-generated dance, blockchain
          transparency, and decentralized collaboration.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6 text-lg">
            Enter the Metaverse
          </Button>
          <Button
            variant="outline"
            className="border-purple-500 px-8 py-6 text-lg text-purple-400 hover:bg-purple-950/30"
          >
            Buy $TEMPO Token
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

