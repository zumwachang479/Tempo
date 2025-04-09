"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Play, Video, X } from "lucide-react"; // Import necessary icons

// Assume these shadcn/ui components are correctly set up
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // Import DialogClose
} from "@/components/ui/dialog";

// --- Enhanced AudioCard Component ---
// Displays an audio player and a button to open a video modal.
function AudioCard({ cardId }: { cardId: number }) {
  const audioSrc = `/mp3/s${cardId}.mp3`; // Assumes files are in public/mp3
  const videoSrc = `/video/s${cardId}.mp4`; // Assumes files are in public/video

  // Note: Error handling for media loading is not included for brevity,
  // but you might want to add <audio onError={...}> or <video onError={...}> handlers.

  return (
    <Card className="bg-zinc-800/60 border-purple-700/50 backdrop-blur-sm text-white overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-purple-900/50 hover:border-purple-600">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-purple-300">Result {cardId}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3 pt-0">
        {/* Audio Player */}
        <audio controls className="w-full h-10 rounded-md" preload="metadata">
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </CardContent>
      <CardFooter className="pt-0 pb-3 flex justify-end">
        {/* Video Modal Trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="bg-purple-600 hover:bg-purple-700 border-purple-800 text-white">
              <Video className="w-4 h-4 mr-2" />
              Watch Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] bg-zinc-900 border-purple-800 text-white">
            <DialogHeader>
              <DialogTitle>Video Result {cardId}</DialogTitle>
               {/* Explicit Close Button */}
               <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                 <X className="h-5 w-5" />
                 <span className="sr-only">Close</span>
               </DialogClose>
            </DialogHeader>
            <div className="py-4">
              {/* Video Player */}
              <video controls className="w-full rounded-lg" preload="metadata">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* You can add a footer inside the modal if needed */}
            {/* <DialogFooter> ... </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}


// --- Main Component (CodeInstallation) ---
// Contains the installation instructions and the grid of AudioCards.
export default function CodeInstallation() {
  // Generate an array of card IDs (1 to 9)
  const cards = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    // Outer container with padding
    <div className="container mx-auto px-4 py-8 text-gray-200 font-sans">
      {/* Animated Title */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl font-bold mb-2 text-purple-300">Let's Get Started</h1>
        <p className="text-lg text-gray-400">
          Follow the steps below to install and run the Tempo Model.
        </p>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8">

        {/* Left Column: Installation Instructions */}
        <div className="md:col-span-2">
          <Card className="bg-zinc-900/70 border border-purple-900/60 backdrop-blur-md p-6 rounded-xl shadow-md h-full">
            <div className="flex items-center mb-5 space-x-3">
              <Terminal className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <h3 className="text-xl font-semibold text-purple-300">Installation Guide</h3>
            </div>

            <div className="space-y-5">
              {/* Step 1: Clone Repo */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                  <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
                  Clone Repository
                </h4>
                <pre className="bg-black/50 p-3 rounded-lg overflow-x-auto border border-zinc-700">
                  <code className="text-sm text-gray-300 font-mono">
                    git clone https://github.com/zumwachang479/tempomodel{"\n"}
                    cd tempomodel
                  </code>
                </pre>
              </div>

              {/* Step 2: Conda Environment */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                  <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">2</span>
                  Create & Activate Conda Env
                </h4>
                <pre className="bg-black/50 p-3 rounded-lg overflow-x-auto border border-zinc-700">
                  <code className="text-sm text-gray-300 font-mono">
                    conda create -n tempomodel python=3.10{"\n"}
                    conda activate tempomodel
                  </code>
                </pre>
              </div>

              {/* Step 3: Install Dependencies */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                  <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">3</span>
                  Install Dependencies
                </h4>
                <pre className="bg-black/50 p-3 rounded-lg overflow-x-auto border border-zinc-700">
                  <code className="text-sm text-gray-300 font-mono">
                    pip install -r requirements.txt{"\n"}
                    pip install -e ./mochi --no-build-isolation
                  </code>
                </pre>
              </div>

              {/* Step 4: Download Weights */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                  <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">4</span>
                  Download Model Weights
                </h4>
                <pre className="bg-black/50 p-3 rounded-lg overflow-x-auto border border-zinc-700">
                  <code className="text-sm text-gray-300 font-mono">
                    python ./tempo_model/download_weights.py weights/
                  </code>
                </pre>
              </div>

              {/* Step 5: Run Inference */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                  <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">5</span>
                  Run Inference
                </h4>
                <pre className="bg-black/50 p-3 rounded-lg overflow-x-auto border border-zinc-700">
                  <code className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                    python inference.py --input-file {"<video_path>"}{" "}
                    --prompt {"<your_prompt>"}{" "}
                    --num-frames {"<number_of_frames>"}
                  </code>
                </pre>
                 <p className="text-xs text-gray-500 mt-1">Replace placeholders with your actual file path, prompt, and desired frame count.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: AudioCards Grid */}
        <div className="md:col-span-3">
          {/* Grid for the AudioCard components */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((cardId) => (
              <AudioCard key={cardId} cardId={cardId} />
            ))}
          </div>
        </div>

      </div> {/* End Main Grid Layout */}
    </div> // End Outer Container
  );
}
