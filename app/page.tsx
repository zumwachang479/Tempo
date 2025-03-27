import Hero from "./components/hero"
import Vision from "./components/vision"
import Features from "./components/features"
import Tokenomics from "./components/tokenomics"
import Roadmap from "./components/roadmap"
import Community from "./components/community"
import Footer from "./components/footer"
import CodeInstallation from "./components/codeInstallation";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Vision />
      <Features />
      <CodeInstallation/>
      <Tokenomics />
      <Roadmap />
      <Community />
      <Footer />
    </main>
  )
}

