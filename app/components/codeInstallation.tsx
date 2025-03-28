"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";

function AudioCard({ cardId }: { cardId: number }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="bg-zinc-900/50 border-purple-900/50 backdrop-blur-sm p-2">
        <div className="flex items-center gap-2">
          <audio className="flex-1" controls>
            <source src={`mp3/s${cardId}.mp3`} type="audio/mpeg" />
            not support audio 
          </audio>
          <button
            onClick={() => setShowModal(true)}
            className="px-2 py-1 bg-purple-600 text-white rounded text-sm whitespace-nowrap"
          >
            play
          </button>
        </div>
      </Card>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg relative w-1/2">
            <video className="w-full rounded" controls autoPlay>
              <source src={`video/s${cardId}.mp4`} type="video/mp4" />
              not support video 
            </video>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded text-sm"
            >
              close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function CodeInstallation() {
  const cards = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-2">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              let's{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                start
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
            Follow the steps below to install and run Tempo Model
            </p>
          </motion.div>

           <div className="grid grid-cols-5 gap-4">
             <div className="col-span-2">
              <Card className="bg-zinc-900/50 border-purple-900/50 backdrop-blur-sm p-6">
                <div className="flex items-center mb-4 space-x-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold">Installation Instructions</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      1. Code repository 
                    </h4>
                    <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm text-gray-300">
                        git clone https://github.com/zumwachang479/tempomodel{"\n"}
                        cd tempomodel
                      </code>
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      2. create and activate  conda 
                    </h4>
                    <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm text-gray-300">
                        conda create -n tempomodel python=3.10{"\n"}
                        conda activate tempomodel
                      </code>
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      3. install dependencies
                    </h4>
                    <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm text-gray-300">
                        pip install -r requirements.txt{"\n"}
                        pip install -e ./mochi --no-build-isolation
                      </code>
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      4. Download model weights
                    </h4>
                    <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm text-gray-300">
                        python ./tempo_model/download_weights.py weights/
                      </code>
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      5. Run inference
                    </h4>
                    <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm text-gray-300">
                        python inference.py --input-file {"<vedio>"}{"\n"}
                        {"                  "}--prompt {"<prompt>"}{"\n"}
                        {"                  "}--num-frames {"<frames>"}
                      </code>
                    </pre>
                  </div>
                </div>
              </Card>
            </div>

            {/* AudioCards 区域，占 3/5 */}
            <div className="col-span-3">
              <div className="grid grid-cols-1 gap-2">
                {cards.map((card) => (
                  <AudioCard key={card} cardId={card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}