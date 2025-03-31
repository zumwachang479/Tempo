"use client"

import { motion } from "framer-motion"

export default function Roadmap() {
  const roadmapItems = [
    {
      phase: "Phase 1",
      timeline: "0-6 months",
      title: "Foundation",
      items: [
        "Core protocol development",
        "Alpha version of dance generation",
        "Initial smart contracts deployment",
        "Community building",
      ],
    },
    {
      phase: "Phase 2",
      timeline: "7-12 months",
      title: "Expansion",
      items: [
        "NFT marketplace launch",
        "Privacy computation integration",
        "Beta platform release",
        "Initial token utility implementation",
      ],
    },
    {
      phase: "Phase 3",
      timeline: "13-18 months",
      title: "Maturity",
      items: [
        "Complete platform launch",
        "Creative funding mechanism",
        "Advanced AI model integration",
        "Cross-chain functionality",
      ],
    },
    {
      phase: "Phase 4",
      timeline: "19-24 months",
      title: "Evolution",
      items: [
        "VR/AR experience integration",
        "Global ecosystem expansion",
        "Advanced governance implementation",
        "Full DAO transition",
      ],
    },
  ]

  return (
    <section className="bg-gradient-to-b from-black via-purple-950/10 to-black py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            Development{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Our strategic path to building the Tempo ecosystem and revolutionizing music-driven dance creation.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 md:left-1/2 md:-ml-0.5"></div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div
                  className={`flex flex-col items-start gap-8 md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline marker */}
                  <div className="absolute left-4 top-0 z-10 h-8 w-8 -translate-x-1/2 rounded-full border-4 border-black bg-gradient-to-r from-purple-500 to-blue-500 md:left-1/2">
                    <div className="absolute inset-0 animate-ping rounded-full bg-purple-400 opacity-75"></div>
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-12 w-full md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:text-right" : ""}`}
                  >
                    <div className="mb-2 inline-flex rounded-full bg-purple-950/50 px-4 py-1 text-sm font-medium">
                      {item.phase} • {item.timeline}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                    <ul className="space-y-2 text-gray-400">
                      {item.items.map((listItem, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                          <span>{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

