// app/page.tsx (或者你的 Community 组件所在的文件)
'use client';

import React, { useState } from 'react'; // Removed unused useEffect, useRef, useCallback
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion } from 'framer-motion'; // Removed unused AnimatePresence

// --- Shadcn UI Imports ---
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Removed unused CardFooter
// import { ScrollArea } from '@/components/ui/scroll-area'; // No longer needed here
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // No longer needed here
// import { Badge } from '@/components/ui/badge'; // No longer needed here
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// --- Lucide Icons Imports ---
import { Code, Headphones, Paintbrush, Eye, CheckCircle } from 'lucide-react';

// --- Import the standalone ChatRoom component ---
import ChatRoom from './chatroom'; // Adjust the path as needed

// --- Community Component ---

// Zod schema for the optional form
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().optional(),
});

export default function Community() {
  // State for the dialog (if needed for the optional form)
  const [showDialog, setShowDialog] = useState(false);

  // React Hook Form setup (if needed for the optional form)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  // Form submission handler (if needed for the optional form)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
    setShowDialog(true);
    form.reset();
    setTimeout(() => {
      setShowDialog(false);
    }, 3000);
  }

  // Data for participants grid
  const participants = [
    { icon: <Headphones className="h-10 w-10 text-purple-400" />, title: "Music Creators", description: "Upload music and earn from AI-generated dance videos" },
    { icon: <Paintbrush className="h-10 w-10 text-blue-400" />, title: "Dance Enthusiasts", description: "Provide motion data or verify dance quality" },
    { icon: <Code className="h-10 w-10 text-indigo-400" />, title: "AI Developers", description: "Train models and sell algorithms as NFTs" },
    { icon: <Eye className="h-10 w-10 text-violet-400" />, title: "Audience", description: "Consume videos and fund creative projects" },
    { icon: <CheckCircle className="h-10 w-10 text-pink-400" />, title: "Validators", description: "Ensure quality and earn rewards" },
  ];

  // Data for developers list
  const developers = [
    { ghUser: "f", ghId: "196477" }, { ghUser: "iuzn", ghId: "25708048" }, { ghUser: "fengkiej", ghId: "14020439" },
    { ghUser: "JonathanDn", ghId: "19703819" }, { ghUser: "developer-acc", ghId: "96925396" }, { ghUser: "devisasari", ghId: "99514353" },
    { ghUser: "ersinyilmaz", ghId: "1352881" }, { ghUser: "burakcan", ghId: "3121257" }, { ghUser: "willfeldman", ghId: "13539982" },
  ];

  // --- Community Component JSX ---
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-blue-950/10 to-black py-20 text-white">
      {/* Background Glow Effects */}
       <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
       </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* --- Title Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
            Join the <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Movement</span>
          </h2>
          <p className="text-lg text-gray-300">
            Tempo is building a vibrant community of creators, developers, and enthusiasts. Find your place in our ecosystem.
          </p>
        </motion.div>

        {/* --- Participants Grid --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {participants.map((item, index) => (
              <Card key={index} className="border-purple-900/50 bg-black/60 backdrop-blur-sm transition-all duration-300 hover:border-purple-700 hover:shadow-purple-900/30 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-purple-950/50 p-4">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* --- ChatRoom and Developer List Grid --- */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* ChatRoom Section - Now uses the imported component */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}
            className="rounded-xl border border-purple-900/50 bg-black/60 p-0 backdrop-blur-sm overflow-hidden"
          >
             {/* Embed Imported ChatRoom Component */}
             <ChatRoom />
          </motion.div>

          {/* Developer List Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }}
            className="rounded-xl border border-purple-900/50 bg-black/60 p-6 backdrop-blur-sm flex flex-col justify-center"
          >
            <h3 className="text-center text-2xl font-bold mb-6">Core Contributors</h3>
            <ul className="flex flex-wrap justify-center items-center gap-4">
              {developers.map((dev) => (
                <li key={dev.ghId}>
                  <a href={`https://github.com/${dev.ghUser}`} target="_blank" rel="noopener noreferrer" title={`@${dev.ghUser}`}>
                    <img
                        src={`https://avatars.githubusercontent.com/u/${dev.ghId}?s=64&v=4`}
                        alt={`GitHub avatar for ${dev.ghUser}`}
                        className="rounded-full w-12 h-12 transition-transform duration-300 hover:scale-110 border-2 border-transparent hover:border-purple-500"
                        width="64"
                        height="64"
                        loading="lazy"
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

        {/* Optional: Form Section (if needed) */}
        {/*
        <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }} viewport={{ once: true }}
            className="mx-auto max-w-xl rounded-lg border border-purple-900/50 bg-black/60 p-8 backdrop-blur-sm"
        >
            <h3 className="text-center text-2xl font-bold mb-6">Stay Connected</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="you@example.com" {...field} className="bg-gray-800/50 border-purple-700/50 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 rounded-lg" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Your message..." {...field} className="bg-gray-800/50 border-purple-700/50 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 rounded-lg" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg px-5 py-2.5 transition-opacity duration-300 hover:opacity-90">
                        Send
                    </Button>
                </form>
            </Form>
        </motion.div>
        */}

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
