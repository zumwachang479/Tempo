"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music2, ShoppingBag, Coins, Cpu, Award } from "lucide-react";

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState("rdgp");

  const features = [
    {
      id: "rdgp",
      icon: <Music2 className="h-6 w-6" />,
      title: "Tempo Dance Generation Protocol",
      description:
        "Upload music to generate customized dance videos using AI powered by GANs and diffusion models. Community verification ensures quality and copyright compliance before minting dynamic NFTs.",
      image: "/image/1.jpg",
    },
    {
      id: "market",
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Music & Dance NFT Marketplace",
      description:
        "Trade dynamic NFTs that evolve with music updates. Access tiered content from previews to editable versions, with smart contracts ensuring fair revenue sharing and copyright tracking.",
      image: "/image/2.jpg",
    },
    {
      id: "fund",
      icon: <Coins className="h-6 w-6" />,
      title: "Decentralized Creative Fund",
      description:
        "Support creators through DAO donations, micropayments, and NFT revenue sharing. Reward outcomes and crowdfund niche creative projects in the Tempo ecosystem.",
      image: "/image/3.jpg",
    },
    {
      id: "compute",
      icon: <Cpu className="h-6 w-6" />,
      title: "Dance Compute Market",
      description:
        "Access privacy-preserving computation networks for dance generation. Trade algorithm NFTs with dynamic pricing based on complexity and resolution requirements.",
      image: "/image/4.jpg",
    },
    {
      id: "rep",
      icon: <Award className="h-6 w-6" />,
      title: "Creative Reputation System",
      description:
        "Build reputation through music quality, model contributions, and verification participation. Gain priority access to datasets and weighted governance influence.",
      image: "/image/5.jpg",
    },
  ];

  const selectedFeatureData = features.find(
    (feature) => feature.id === selectedFeature
  );

  return (
    <section className="bg-gradient-to-b from-black via-purple-950/10 to-black py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            Core{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Innovations
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Tempo combines cutting-edge Web3 technology with AI to create a
            revolutionary ecosystem for music-driven dance creation.
          </p>
        </motion.div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {features.map((feature) => (
           <Button
           key={feature.id}
           variant={selectedFeature === feature.id ? "default" : "outline"}
           onClick={() => setSelectedFeature(feature.id)}
           className={`inline-flex items-center gap-2 text-sm ${
             selectedFeature === feature.id
               ? "bg-gradient-to-r from-purple-600 to-blue-600"
               : "border-purple-700 text-gray-300 hover:bg-purple-950/30"
           }`}
         >{feature.icon}<span className="hidden sm:inline">{feature.title}</span>
         </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedFeatureData && (
            <motion.div
              key={selectedFeatureData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-5xl"
            >
              <Card className="overflow-hidden border-purple-900/50 bg-black/40 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="overflow-hidden bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-1">
                      {/* 固定容器大小 300 x 400 */}
                      <div className="w-[480px] h-[270px] bg-black">
                        {selectedFeatureData.id === "rdgp" ? (
                          <iframe
                            src="https://www.youtube.com/embed/tJlBt4FdQfE"
                            title={selectedFeatureData.title}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <img
                            src={
                              selectedFeatureData.image || "/placeholder.svg"
                            }
                            alt={selectedFeatureData.title}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-6">
                      <div className="mb-4 inline-flex rounded-full bg-purple-950/50 p-3">
                        {selectedFeatureData.icon}
                      </div>
                      <h3 className="mb-4 text-2xl font-semibold text-white">
                        {selectedFeatureData.title}
                      </h3>
                      <p className="text-gray-300">
                        {selectedFeatureData.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
