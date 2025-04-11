// app/page.tsx (或者你的 Community 组件所在的文件)
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shadcn UI Imports ---
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// --- Lucide Icons Imports ---
import { Code, Headphones, Paintbrush, Eye, CheckCircle } from 'lucide-react';

// --- ChatRoom Component ---

// 定义聊天消息类型接口
interface ChatMessage {
  type: 'chat' | 'user_join' | 'user_leave' | 'info' | 'error';
  message?: string;
  user?: string;
  timestamp?: number;
}

function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://3.144.254.25:8011/ws';

  const connectWebSocket = useCallback(() => {
    // ... (connectWebSocket 逻辑保持不变) ...
    if (reconnectTimeoutId.current) {
        clearTimeout(reconnectTimeoutId.current);
        reconnectTimeoutId.current = null;
    }
    if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) {
        if(ws.current.readyState === WebSocket.OPEN) setIsConnected(true);
        return;
    }
    console.log('尝试连接 WebSocket...');
    ws.current = new WebSocket(WEBSOCKET_URL);
    // 设置 WebSocket 接收二进制类型为 blob (这是默认值，但明确设置一下)
    // 如果后端确定只发文本，可以设为 'arraybuffer' 然后用 TextDecoder，但处理 Blob 更通用
    // ws.current.binaryType = 'blob';
    setIsConnected(false);

    ws.current.onopen = () => {
      console.log('WebSocket connect success!');
      setIsConnected(true);
      reconnectAttempts.current = 0;
      setMessages((prev) => [...prev, { type: 'info', message: 'join in chat ', timestamp: Date.now() / 1000 }]);
    };

    // **** 修改 onmessage 处理函数 ****
    ws.current.onmessage = async (event) => { // <--- 改为 async 函数
      let dataToParse: string | null = null;
      try {
        // 检查 event.data 类型
        if (event.data instanceof Blob) {
          console.log('read text...');
          // 如果是 Blob，异步读取其文本内容
          dataToParse = await event.data.text();
        } else if (typeof event.data === 'string') {
          // 如果是字符串，直接使用
          dataToParse = event.data;
        } else {
           // 处理其他可能的数据类型，例如 ArrayBuffer
           console.warn('unkonw type WebSocket data:', event.data);
           return; // 忽略无法处理的数据
        }

        // 确保我们得到了可以解析的字符串
        if (dataToParse) {
            console.log('尝试解析:', dataToParse);
            const receivedData: ChatMessage = JSON.parse(dataToParse);
            console.log('收到消息:', receivedData);

            if (typeof receivedData.timestamp !== 'number') {
                receivedData.timestamp = Date.now() / 1000;
            }
            setMessages((prevMessages) => [...prevMessages, receivedData]);
        }

      } catch (error) {
        console.error('处理或解析收到的消息失败:', error, '原始数据:', event.data, '解析前文本:', dataToParse);
         setMessages((prev) => [...prev, { type: 'error', message: 'unkonw message', timestamp: Date.now() / 1000 }]);
      }
    };
    // **** 结束 onmessage 修改 ****


    ws.current.onclose = (event) => {
      // ... (onclose 逻辑保持不变) ...
      console.log('WebSocket 连接关闭:', event.code, event.reason);
      setIsConnected(false);
      setMessages((prev) => [...prev, { type: 'info', message: 'reset connect...', timestamp: Date.now() / 1000 }]);
      if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++;
        const delay = Math.pow(2, reconnectAttempts.current) * 1000;
        console.log(`尝试在 ${delay / 1000} 秒后重连 (第 ${reconnectAttempts.current} 次)...`);
        reconnectTimeoutId.current = setTimeout(connectWebSocket, delay);
      } else if (reconnectAttempts.current >= maxReconnectAttempts) {
        console.error('达到最大重连次数，停止重连。');
        setMessages((prev) => [...prev, { type: 'error', message: 'please flush your browser。', timestamp: Date.now() / 1000 }]);
      } else {
        console.log('WebSocket 正常关闭，不尝试重连。');
      }
    };

    ws.current.onerror = (error) => {
      // ... (onerror 逻辑保持不变) ...
      console.error('WebSocket 错误:', error);
      setIsConnected(false);
      setMessages((prev) => [...prev, { type: 'error', message: 'WebSocket 连接发生错误。', timestamp: Date.now() / 1000 }]);
    };
  }, [WEBSOCKET_URL]);

  useEffect(() => {
    // ... (useEffect 逻辑保持不变) ...
    connectWebSocket();
    return () => {
      if (reconnectTimeoutId.current) {
          clearTimeout(reconnectTimeoutId.current);
      }
      if (ws.current) {
        console.log('ChatRoom 组件卸载，关闭 WebSocket 连接...');
        reconnectAttempts.current = maxReconnectAttempts;
        ws.current.close(1000, "组件卸载");
        ws.current = null;
      }
    };
  }, [connectWebSocket]);

  const sendMessage = () => {
    // ... (sendMessage 逻辑保持不变) ...
    if (inputValue.trim() && ws.current && ws.current.readyState === WebSocket.OPEN) {
      const messageData = { type: 'chat', message: inputValue.trim() };
      ws.current.send(JSON.stringify(messageData));
      setInputValue('');
    } else if (!isConnected) {
        console.error('WebSocket 未连接，无法发送消息。');
         setMessages((prev) => [...prev, { type: 'error', message: '连接已断开，无法发送消息。', timestamp: Date.now() / 1000 }]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // ... (handleKeyDown 逻辑保持不变) ...
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
  };

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // ... (滚动逻辑保持不变) ...
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.children[0] as HTMLElement;
      if (viewport) {
        setTimeout(() => { viewport.scrollTop = viewport.scrollHeight; }, 0);
      }
    }
  }, [messages]);

  const formatTimestamp = (timestamp: number): string => {
      // ... (formatTimestamp 逻辑保持不变) ...
      return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (msg: ChatMessage, index: number) => {
    // ... (renderMessage 逻辑保持不变) ...
    const messageTime = msg.timestamp ? formatTimestamp(msg.timestamp) : '';
    const userInitial = msg.user ? msg.user.substring(0, 1).toUpperCase() : '?';

    switch (msg.type) {
      case 'chat':
        return (
          <div key={index} className="mb-3 flex items-start space-x-3 pr-2">
            <Avatar className="w-8 h-8 border border-gray-700">
              <AvatarFallback className="bg-gray-600 text-gray-200">{userInitial}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
               <div className="flex items-center space-x-2 mb-1">
                 <span className="text-sm font-medium text-gray-200">{msg.user || 'unknow user'}</span>
                 <span className="text-xs text-gray-400">{messageTime}</span>
               </div>
               <p className="text-sm bg-blue-900/80 text-white p-2 rounded-lg max-w-md break-words shadow">
                   {msg.message}
               </p>
            </div>
          </div>
        );
      case 'user_join':
        return <div key={index} className="my-2 text-center text-xs text-green-400 italic"><span className="font-semibold">{msg.user || 'one user'}</span> join in - {messageTime}</div>;
      case 'user_leave':
        return <div key={index} className="my-2 text-center text-xs text-red-400 italic"><span className="font-semibold">{msg.user || 'one user'}</span> leave out  - {messageTime}</div>;
      case 'info':
         return <div key={index} className="my-2 text-center text-xs text-sky-400 italic">{msg.message} - {messageTime}</div>;
      case 'error':
         return <div key={index} className="my-2 text-center text-xs text-orange-400 italic">{msg.message} - {messageTime}</div>;
      default:
        console.warn("get no message:", msg.type, msg);
        return null;
    }
  };

  // ChatRoom JSX (保持不变)
  return (
      <Card className="w-full h-[60vh] md:h-[70vh] flex flex-col bg-black/70 border border-purple-800/50 shadow-lg shadow-purple-900/20 rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-purple-800/50">
          <CardTitle className="text-lg font-bold text-purple-300"> <h2 className="mb-6 text-center text-3xl font-bold tracking-tighter">
                Live <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Chat</span>
             </h2></CardTitle>
          <Badge variant={isConnected ? 'default' : 'destructive'} className={isConnected ? 'bg-green-600/80 border-green-500/50' : 'bg-red-600/80 border-red-500/50'}>
            {isConnected ? 'connect' : 'go out '}
          </Badge>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
             <div className="p-4 space-y-4">
                {messages.map(renderMessage)}
             </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t border-purple-800/50">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder={isConnected ? "enter the message ..." : "wait for connect..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!isConnected}
              className="flex-grow bg-gray-800/50 border-purple-700/50 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
            />
            <Button
                onClick={sendMessage}
                disabled={!isConnected || !inputValue.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg px-5 py-2 transition-opacity duration-300 disabled:opacity-50 hover:opacity-90"
            >
              发送
            </Button>
          </div>
        </CardFooter>
      </Card>
  );
}


// --- Community Component (保持不变) ---

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().optional(),
});

export default function Community() {
  const [showDialog, setShowDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setShowDialog(true);
    form.reset();
    setTimeout(() => {
      setShowDialog(false);
    }, 3000);
  }

  const participants = [
    { icon: <Headphones className="h-10 w-10 text-purple-400" />, title: "Music Creators", description: "Upload music and earn from AI-generated dance videos" },
    { icon: <Paintbrush className="h-10 w-10 text-blue-400" />, title: "Dance Enthusiasts", description: "Provide motion data or verify dance quality" },
    { icon: <Code className="h-10 w-10 text-indigo-400" />, title: "AI Developers", description: "Train models and sell algorithms as NFTs" },
    { icon: <Eye className="h-10 w-10 text-violet-400" />, title: "Audience", description: "Consume videos and fund creative projects" },
    { icon: <CheckCircle className="h-10 w-10 text-pink-400" />, title: "Validators", description: "Ensure quality and earn rewards" },
  ];

  const developers = [
    { ghUser: "f", ghId: "196477" }, { ghUser: "iuzn", ghId: "25708048" }, { ghUser: "fengkiej", ghId: "14020439" },
    { ghUser: "JonathanDn", ghId: "19703819" }, { ghUser: "developer-acc", ghId: "96925396" }, { ghUser: "devisasari", ghId: "99514353" },
    { ghUser: "ersinyilmaz", ghId: "1352881" }, { ghUser: "burakcan", ghId: "3121257" }, { ghUser: "willfeldman", ghId: "13539982" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-blue-950/10 to-black py-20">
      <div className="container relative z-10 mx-auto px-4">
        {/* --- Title Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            Join the <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Movement</span>
          </h2>
          <p className="mb-12 text-gray-400">
            Tempo is building a vibrant community of creators, developers, and enthusiasts. Find your place in our ecosystem.
          </p>
        </motion.div>

        {/* --- Participants Grid --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {participants.map((item, index) => (
              <Card key={index} className="border-purple-900/50 bg-black/60 backdrop-blur-sm transition-all duration-300 hover:border-purple-700 hover:shadow-purple-900/30 hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-purple-950/50 p-4">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* --- Form and Developer List Grid --- */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="rounded-lg border border-purple-900/50 bg-black/60 p-6 backdrop-blur-sm"
          >
             <ChatRoom />
          </motion.div>

          {/* Developer List Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="rounded-lg border border-purple-900/50 bg-black/60 p-6 backdrop-blur-sm"
          >
            <h3 className="text-center text-2xl font-bold mb-6">Core Contributors</h3>
            <ul className="flex flex-wrap justify-center gap-4">
              {developers.map((dev) => (
                <li key={dev.ghId}>
                  <a href={`https://github.com/${dev.ghUser}`} target="_blank" rel="noopener noreferrer" title={`@${dev.ghUser}`}>
                    <img
                        src={`https://avatars.githubusercontent.com/u/${dev.ghId}?s=64&v=4`}
                        alt={`@${dev.ghUser}`}
                        className="rounded-full w-12 h-12 transition-transform duration-300 hover:scale-110"
                        width="64"
                        height="64"
                    />
                  </a>
                </li>
              ))}
            </ul>
             <p className="text-center text-gray-400 mt-6 text-sm">
                Meet some of the brilliant minds behind the project.
             </p>
          </motion.div>
        </div>
 

      </div>

      {/* --- Dialog for Form Submission --- */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-zinc-900/90 border-purple-900/50 backdrop-blur-sm text-white rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">Thanks for your message!</DialogTitle>
            <p className="text-center text-gray-400 mt-2">
              We will contact you as soon as possible.
            </p>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  )
}
