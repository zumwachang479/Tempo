// components/ChatRoom.tsx (Example file path)
'use client'; // Add this if using Next.js App Router and client-side hooks

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed uuid import

// --- Shadcn UI Imports ---
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// --- Constants ---
const LOCAL_STORAGE_USER_ID_KEY = 'chatUserID';

// --- ChatRoom Component ---

interface ChatMessage {
  type: 'chat' | 'user_join' | 'user_leave' | 'info' | 'error' | 'system';
  message?: string;
  user?: string; // This will be the chat_user_id assigned by server
  timestamp?: number;
  user_id?: string; // Server sends this in welcome message
}

function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [assignedUserId, setAssignedUserId] = useState<string | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const WEBSOCKET_URL_BASE = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'wss://ai369.xyz:8011/ws';

  // --- Try to load last known User ID on mount ---
  useEffect(() => {
      const savedUserId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY);
      if (savedUserId) {
          console.log('[Init] Retrieved last known User ID from localStorage:', savedUserId);
          setAssignedUserId(savedUserId);
      }
      // Trigger initial connection attempt
      connectWebSocket();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount


  const clearTimers = () => {
    if (reconnectTimeoutId.current) {
      clearTimeout(reconnectTimeoutId.current);
      reconnectTimeoutId.current = null;
    }
  };

  const connectWebSocket = useCallback(() => {
    const fullWebSocketUrl = WEBSOCKET_URL_BASE;
    clearTimers();

    if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) {
        console.log('[Connect] WebSocket is already open or connecting.');
        if(ws.current.readyState === WebSocket.OPEN) setIsConnected(true);
        return;
    }

    console.log(`[Connect] Attempting to connect WebSocket to ${fullWebSocketUrl}... (Attempt ${reconnectAttempts.current + 1})`);
    setMessages((prev) => [...prev, { type: 'info', message: 'Attempting to connect...', timestamp: Date.now() / 1000 }]);
    setIsConnected(false);

    try {
        ws.current = new WebSocket(fullWebSocketUrl);
    } catch (error) {
        console.error("[Connect] Failed to create WebSocket:", error);
        setMessages((prev) => [...prev, { type: 'error', message: 'Failed to create WebSocket', timestamp: Date.now() / 1000 }]);
        if (reconnectAttempts.current < maxReconnectAttempts) {
            reconnectAttempts.current++;
            const delay = Math.pow(2, reconnectAttempts.current) * 1000;
            reconnectTimeoutId.current = setTimeout(connectWebSocket, delay);
        } else {
             setMessages((prev) => [...prev, { type: 'error', message: 'Could not establish connection', timestamp: Date.now() / 1000 }]);
        }
        return;
    }

    ws.current.onopen = () => {
      console.log('[WS OnOpen] WebSocket connection successful!');
      setIsConnected(true);
      reconnectAttempts.current = 0;
      clearTimers();
    };

    ws.current.onmessage = async (event) => {
      console.log('[WS OnMessage] Received raw data:', event.data); // Log raw data
      let dataToParse: string | null = null;
      try {
        if (event.data instanceof Blob) { dataToParse = await event.data.text(); }
        else if (typeof event.data === 'string') { dataToParse = event.data; }
        else if (event.data instanceof ArrayBuffer) { dataToParse = new TextDecoder().decode(event.data); }
        else { console.warn('[WS OnMessage] Received unexpected WebSocket data type:', typeof event.data); return; }

        if (dataToParse) {
            console.log('[WS OnMessage] Attempting to parse:', dataToParse);
            const receivedData: ChatMessage = JSON.parse(dataToParse);
            console.log('[WS OnMessage] Received parsed message:', receivedData);

            if (receivedData.type === 'system' && receivedData.user_id) {
                const serverUserId = receivedData.user_id;
                console.log("[WS OnMessage] Assigned User ID from server:", serverUserId);
                setAssignedUserId(serverUserId);
                try {
                     localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, serverUserId);
                     console.log("[WS OnMessage] Saved User ID to localStorage:", serverUserId);
                } catch (storageError) {
                     console.error("[WS OnMessage] Failed to save User ID to localStorage:", storageError);
                }
                setMessages((prev) => {
                    console.log('[WS OnMessage] Updating messages state with system message.');
                    return [...prev, receivedData];
                });
                return;
            }

            if (typeof receivedData.timestamp !== 'number') {
                receivedData.timestamp = Date.now() / 1000;
            }
            // Update messages state for non-system messages
            setMessages((prevMessages) => {
                 console.log('[WS OnMessage] Updating messages state with received message:', receivedData);
                 const newMessages = [...prevMessages, receivedData];
                 console.log('[WS OnMessage] New messages array:', newMessages);
                 return newMessages;
            });
        }

      } catch (error) {
        console.error('[WS OnMessage] Failed to process or parse received message:', error);
         setMessages((prev) => [...prev, { type: 'error', message: 'Received unparseable message', timestamp: Date.now() / 1000 }]);
      }
    };


    ws.current.onclose = (event) => {
      console.log(`[WS OnClose] WebSocket connection closed: Code=${event.code}, Reason='${event.reason}', WasClean=${event.wasClean}`);
      setIsConnected(false);
      clearTimers();
      let closeMessage = 'Connection closed';
       if (event.code === 1000) { closeMessage = 'Left the chat room'; }
       else if (event.reason) { closeMessage = `Connection closed: ${event.reason}`; }
       else if (event.code === 1006) { closeMessage = 'Connection lost'; }
       else if (event.code === 1002) { closeMessage = 'Connection error (Protocol violation)'; }
      setMessages((prev) => [...prev, { type: 'info', message: closeMessage, timestamp: Date.now() / 1000 }]);

      if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++;
        const delay = Math.min(Math.pow(2, reconnectAttempts.current) * 1000, 30000);
        console.log(`[WS OnClose] Attempting reconnect in ${delay / 1000} seconds (Attempt ${reconnectAttempts.current})...`);
        reconnectTimeoutId.current = setTimeout(connectWebSocket, delay);
      } else if (reconnectAttempts.current >= maxReconnectAttempts) {
        console.error('[WS OnClose] Maximum reconnect attempts reached.');
        setMessages((prev) => [...prev, { type: 'error', message: 'Could not reconnect', timestamp: Date.now() / 1000 }]);
      } else {
           console.log('[WS OnClose] WebSocket closed normally or max attempts reached.');
      }
    };

    ws.current.onerror = (error) => {
      console.error('[WS OnError] WebSocket error:', error);
      setMessages((prev) => [...prev, { type: 'error', message: 'WebSocket connection error', timestamp: Date.now() / 1000 }]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [WEBSOCKET_URL_BASE]);

   // Cleanup function on component unmount
    useEffect(() => {
        return () => {
            console.log('[Cleanup] ChatRoom component unmounting. Closing WebSocket connection...');
            clearTimers();
            reconnectAttempts.current = maxReconnectAttempts;
            if (ws.current) {
                ws.current.onclose = null;
                ws.current.onerror = null;
                ws.current.close(1000, "Component unmounted");
                ws.current = null;
            }
        };
    }, []);


  const sendMessage = () => {
    console.log('[SendMessage] Attempting to send message...'); // Log attempt
    if (inputValue.trim() && ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
          const messageData = { type: 'chat', message: inputValue.trim() };
          const messageString = JSON.stringify(messageData);
          console.log('[SendMessage] Sending message string:', messageString); // Log message being sent
          ws.current.send(messageString);
          console.log('[SendMessage] Message sent successfully.'); // Log success
          setInputValue('');
      } catch (error) {
           console.error("[SendMessage] Failed to send message:", error); // Log error
           setMessages((prev) => [...prev, { type: 'error', message: 'Failed to send message', timestamp: Date.now() / 1000 }]);
      }
    } else if (!isConnected) {
         console.warn('[SendMessage] WebSocket is not connected. Cannot send message.'); // Log warning
         setMessages((prev) => [...prev, { type: 'error', message: 'Connection closed', timestamp: Date.now() / 1000 }]);
    } else if (!inputValue.trim()) {
         console.warn('[SendMessage] Input value is empty. Cannot send message.'); // Log warning for empty input
    } else {
         console.warn('[SendMessage] Cannot send message. State:', { isConnected, wsReadyState: ws.current?.readyState }); // Log other reasons
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
  };

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      // Add a check to scroll only if near the bottom, useful if user scrolls up
      // const isScrolledToBottom = viewport.scrollHeight - viewport.clientHeight <= viewport.scrollTop + 1;
      // if (isScrolledToBottom) {
          setTimeout(() => { viewport.scrollTop = viewport.scrollHeight; }, 50); // Small delay
      // }
    }
  }, [messages]); // Scroll when messages change

  const formatTimestamp = (timestamp: number): string => {
      if (!timestamp) return '';
      try {
          const date = new Date(timestamp * 1000);
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      } catch (e) { return 'Invalid date'; }
  };

  const renderMessage = (msg: ChatMessage, index: number) => {
    // console.log(`[RenderMessage] Rendering message ${index}:`, msg); // Log message rendering
    const messageTime = msg.timestamp ? formatTimestamp(msg.timestamp) : '';
    const userColor = (id: string = 'system') => {
        if (!id) id = 'unknown';
        let hash = 0;
        for (let i = 0; i < id.length; i++) { hash = id.charCodeAt(i) + ((hash << 5) - hash); }
        return `hsl(${hash % 360}, 70%, 60%)`;
    };
    const msgUserId = msg.user || 'unknown';
    const userInitial = msgUserId.substring(0, 2).toUpperCase();
    const avatarColor = userColor(msgUserId);
    const isOwnMessage = msg.type === 'chat' && msg.user === assignedUserId;

    switch (msg.type) {
      case 'chat':
        return (
          <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className={`mb-3 flex items-start space-x-3 pr-2 ${isOwnMessage ? 'justify-end' : ''}`} >
            {!isOwnMessage && ( <Avatar className="w-8 h-8 border border-gray-700 flex-shrink-0"> <AvatarFallback style={{ backgroundColor: avatarColor }} className="text-white font-bold text-xs">{userInitial}</AvatarFallback> </Avatar> )}
            <div className={`flex flex-col max-w-[75%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
               <div className={`flex items-center space-x-2 mb-1 flex-wrap ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                 <span className="text-sm font-medium text-gray-200 break-all">{isOwnMessage ? 'Me' : (msg.user || 'Unknown')}</span>
                 <span className="text-xs text-gray-400 flex-shrink-0">{messageTime}</span>
               </div>
               <p className={`text-sm text-white p-2 rounded-lg max-w-full break-words shadow ${isOwnMessage ? 'bg-purple-700/80 rounded-tr-none' : 'bg-blue-900/80 rounded-tl-none'}`}> {msg.message} </p>
            </div>
          </motion.div>
        );
      case 'user_join':
        return <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="my-2 text-center text-xs text-green-400 italic"><span className="font-semibold">{msg.user || 'A user'}</span> joined - {messageTime}</motion.div>;
      case 'user_leave':
        return <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="my-2 text-center text-xs text-red-400 italic"><span className="font-semibold">{msg.user || 'A user'}</span> left - {messageTime}</motion.div>;
      case 'system':
        return <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="my-2 text-center text-xs text-purple-400 italic">{msg.message} - {messageTime}</motion.div>;
      case 'info':
         return <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="my-2 text-center text-xs text-sky-400 italic">{msg.message} - {messageTime}</motion.div>;
      case 'error':
         return <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="my-2 text-center text-xs text-orange-400 font-semibold italic">{msg.message} - {messageTime}</motion.div>;
      default: return null;
    }
  };

  // Log messages state whenever it changes for debugging
  // useEffect(() => {
  //    console.log('[State Update] Messages array changed:', messages);
  // }, [messages]);

  return (
      <Card className="w-full h-[60vh] md:h-[70vh] flex flex-col bg-black/70 border border-purple-800/50 shadow-lg shadow-purple-900/20 rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-purple-800/50 flex-shrink-0">
          <CardTitle className="text-lg font-bold text-purple-300">
             <h2 className="text-center text-xl font-bold tracking-tighter">
                Live <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Chat</span>
                {assignedUserId && <span className="text-sm font-normal text-gray-400"> (ID: {assignedUserId})</span>}
             </h2>
          </CardTitle>
          <Badge variant={isConnected ? 'default' : 'destructive'} className={`transition-colors duration-300 ${isConnected ? 'bg-green-600/80 border-green-500/50' : 'bg-red-600/80 border-red-500/50'}`}>
            {isConnected ? 'Connected' : 'Connecting...'}
          </Badge>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="p-4 space-y-1">
                <AnimatePresence initial={false}>
                  {messages.map(renderMessage)}
                </AnimatePresence>
             </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t border-purple-800/50 flex-shrink-0">
          <div className="flex w-full items-center space-x-2">
            <Input type="text" placeholder={isConnected ? "Enter message..." : "Connecting..."} value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} disabled={!isConnected || !assignedUserId}
              className="flex-grow bg-gray-800/50 border-purple-700/50 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
              aria-label="Chat message input" />
            <Button onClick={sendMessage} disabled={!isConnected || !assignedUserId || !inputValue.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg px-5 py-2 transition-opacity duration-300 disabled:opacity-50 hover:opacity-90 flex-shrink-0"
                aria-label="Send message" > Send </Button>
          </div>
        </CardFooter>
      </Card>
  );
}

export default ChatRoom;
