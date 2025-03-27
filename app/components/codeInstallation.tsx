"use client"

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CodeInstallation() {
  return (
    <div className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">
            快速{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              开始
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            按照以下步骤安装和运行 Tempo Model
          </p>
        </motion.div>

        <Card className="bg-zinc-900/50 border-purple-900/50 backdrop-blur-sm p-6">
          <div className="flex items-center mb-4 space-x-2">
            <Terminal className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold">安装说明</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">1. 克隆仓库</h4>
              <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-gray-300">
                  git clone https://github.com/zumwachang479/tempomodel{"\n"}
                  cd tempomodel
                </code>
              </pre>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">2. 创建并激活 conda 环境</h4>
              <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-gray-300">
                  conda create -n tempomodel python=3.10{"\n"}
                  conda activate tempomodel
                </code>
              </pre>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">3. 安装依赖</h4>
              <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-gray-300">
                  pip install -r requirements.txt{"\n"}
                  pip install -e ./mochi --no-build-isolation
                </code>
              </pre>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">4. 下载模型权重</h4>
              <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-gray-300">
                  python ./tempo_model/download_weights.py weights/
                </code>
              </pre>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">5. 运行推理</h4>
              <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-gray-300">
                  python inference.py --input-file {"<音频文件>"} \{"\n"}
                  {"                  "}--prompt {"<提示词>"} \{"\n"}
                  {"                  "}--num-frames {"<帧数>"}
                </code>
              </pre>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}