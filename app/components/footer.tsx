export default function Footer() {
  return (
     <footer className="border-t border-zinc-800 bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Tempo Protocol. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://x.com/tempo_vedio"   target="_blank"   rel="noopener noreferrer"  className="text-gray-400 hover:text-purple-400">
              GitHub Web
            </a>
            <a href="https://github.com/zumwachang479/Tempo_Model"   target="_blank"   rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
              GitHub Model
            </a> 
                <a href="https://x.com/tempo_vedio"   target="_blank"   rel="noopener noreferrer"  className="hover:text-purple-400">
                  Twitter
                </a> 
          </div>
        </div>
      </div>
    </footer>
  )
}

