"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ShareSuccess() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [story, setStory] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ name, email, story })
    toast({
      title: "Success story submitted!",
      description: "Thank you for sharing your ZugzBag experience. We'll review and post it soon!",
    })
    setName("")
    setEmail("")
    setStory("")
  }

  return (
    <section className="py-20 px-4 bg-secondary/50" id="share-success">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Share Your ZugzBag Success Story</h2>
        <p className="text-center mb-8 text-gray-300">
          Tell us about your experience with ZugzBag all-in-one grow bags and get featured on our website!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Textarea
            placeholder="Tell us your success story with ZugzBag all-in-one grow bags"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            required
            rows={5}
          />
          <Button type="submit" className="w-full">
            Submit Your Story
          </Button>
        </form>
      </div>
    </section>
  )
}

