export default function Footer() {
  return (
     <footer className="border-t border-zinc-800 bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Tempo</h3>
            <p className="text-sm text-gray-400">
              Redefining creative ownership through AI-generated dance, blockchain transparency, and decentralized
              collaboration.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-purple-400">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="https://github.com/zumwachang479/tempomodel"   target="_blank"   rel="noopener noreferrer" className="hover:text-purple-400">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://discord.gg/mgA2Sjm9"   target="_blank"   rel="noopener noreferrer"  className="hover:text-purple-400">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://x.com/tempo_vedio"   target="_blank"   rel="noopener noreferrer"  className="hover:text-purple-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Telegram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Medium
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-purple-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Terms of Service
                </a>
              </li>
              <li>

                <a href="#" className="hover:text-purple-400">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Tempo Protocol. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://discord.gg/mgA2Sjm9"   target="_blank"   rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
              Discord
            </a>
            <a href="https://x.com/tempo_vedio"   target="_blank"   rel="noopener noreferrer"  className="text-gray-400 hover:text-purple-400">
              Twitter
            </a>
            <a href="https://github.com/zumwachang479/tempomodel"   target="_blank"   rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

