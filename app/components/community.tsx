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
            <h3 className="mb-6 text-2xl font-semibold">Connect With Us</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg border border-purple-900/50 bg-black/40 p-4 transition-colors hover:border-purple-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-950">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Discord</h4>
                  <p className="text-sm text-gray-400">Join our server</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg border border-purple-900/50 bg-black/40 p-4 transition-colors hover:border-purple-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-950">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Twitter</h4>
                  <p className="text-sm text-gray-400">Follow updates</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg border border-purple-900/50 bg-black/40 p-4 transition-colors hover:border-purple-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-950">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <p className="text-sm text-gray-400">View our code</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg border border-purple-900/50 bg-black/40 p-4 transition-colors hover:border-purple-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-950">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Reddit</h4>
                  <p className="text-sm text-gray-400">Join discussions</p>
                </div>
              </a>
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

