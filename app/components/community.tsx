"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Headphones, Paintbrush, Eye, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Community() {
  const [showDialog, setShowDialog] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setShowDialog(true)
    // 重置表单
    form.reset()
    // 3秒后自动关闭对话框
    setTimeout(() => {
      setShowDialog(false)
    }, 3000)
  }

  const participants = [
    {
      icon: <Headphones className="h-10 w-10 text-purple-400" />,
      title: "Music Creators",
      description: "Upload music and earn from AI-generated dance videos",
    },
    {
      icon: <Paintbrush className="h-10 w-10 text-blue-400" />,
      title: "Dance Enthusiasts",
      description: "Provide motion data or verify dance quality",
    },
    {
      icon: <Code className="h-10 w-10 text-indigo-400" />,
      title: "AI Developers",
      description: "Train models and sell algorithms as NFTs",
    },
    {
      icon: <Eye className="h-10 w-10 text-violet-400" />,
      title: "Audience",
      description: "Consume videos and fund creative projects",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-pink-400" />,
      title: "Validators",
      description: "Ensure quality and earn rewards",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-blue-950/10 to-black py-20">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
            Join the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Movement</span>
          </h2>
          <p className="mb-12 text-gray-400">
            Tempo is building a vibrant community of creators, developers, and enthusiasts. Find your place in our
            ecosystem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {participants.map((item, index) => (
              <Card key={index} className="border-purple-900/50 bg-black/60 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-purple-950/50 p-4">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-lg border border-purple-900/50 bg-black/60 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-6 text-2xl font-semibold">Stay Updated</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} className="border-purple-900/50 bg-black/60" />
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
                        <Textarea
                          placeholder="Tell us how you'd like to contribute..."
                          className="min-h-[120px] border-purple-900/50 bg-black/60"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                  Join the Community
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-lg border border-purple-900/50 bg-black/60 p-6 backdrop-blur-sm"
          >


      {/* 开发人员列表 */}
      <div className="container relative z-10 mx-auto px-4 mt-10">
        <h3 className="text-center text-2xl font-bold mb-4">Developer List</h3>
        <ul className="flex flex-wrap justify-center gap-4">
          <li>
            <a href="https://github.com/f" target="_blank" rel="noopener noreferrer">
              <img src="https://avatars.githubusercontent.com/u/196477?s=64&v=4" alt="@f" className="rounded-full" />
            </a>
          </li>
          <li>
            <a href="https://github.com/iuzn" target="_blank" rel="noopener noreferrer">
              <img src="https://avatars.githubusercontent.com/u/25708048?s=64&v=4" alt="@iuzn" className="rounded-full" />
            </a>
          </li>
          <li>
            <a href="https://github.com/fengkiej" target="_blank" rel="noopener noreferrer">
              <img src="https://avatars.githubusercontent.com/u/14020439?s=64&v=4" alt="@fengkiej" className="rounded-full" />
            </a>
          </li>
          <li>
            <a href="https://github.com/JonathanDn" target="_blank" rel="noopener noreferrer">
              <img src="https://avatars.githubusercontent.com/u/19703819?s=64&v=4" alt="@JonathanDn" className="rounded-full" />
            </a>
          </li>
          <li>
            <a href="https://github.com/developer-acc" target="_blank" rel="noopener noreferrer">
              <img src="https://avatars.githubusercontent.com/u/96925396?s=64&v=4" alt="@developer-acc" className="rounded-full" />
            </a>
          </li>
          <li>
            <a href="https://github.com/devisasari" target="_blank" rel="noopener noreferrer">
              <img src="https://avatars.githubusercontent.com/u/99514353?s=64&v=4" alt="@devisasari" className="rounded-full" />
            </a>
          </li>
          <li>
            <a href="https://github.com/ersinyilmaz" target="_blank" rel="noopener noreferrer">
              <img src="https://avatars.githubusercontent.com/u/1352881?s=64&v=4" alt="@ersinyilmaz" className="rounded-full" />
            </a>
          </li>
          <li>
            <a href="https://github.com/burakcan" target="_blank" rel="noopener noreferrer">
              <img src="https://avatars.githubusercontent.com/u/3121257?s=64&v=4" alt="@burakcan" className="rounded-full" />
            </a>
          </li>
          <li>
            <a href="https://github.com/willfeldman" target="_blank" rel="noopener noreferrer">
              <img src="https://avatars.githubusercontent.com/u/13539982?s=64&v=4" alt="@willfeldman" className="rounded-full" />
            </a>
          </li>
        </ul>
      </div>
          </motion.div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-zinc-900/90 border-purple-900/50 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-center">thanks for your message</DialogTitle>
            <p className="text-center text-gray-400 mt-2">
            We will contact you as soon as possible
            </p>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  )
}

