import Hero from "./components/hero"
import Vision from "./components/vision"
import Features from "./components/features"
import Tokenomics from "./components/tokenomics"
import Roadmap from "./components/roadmap"
import Community from "./components/community"
import Footer from "./components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Vision />
      <Features />
      <Tokenomics />
      <Roadmap />
      <Community />
      <Footer />
    </main>
  )
}

