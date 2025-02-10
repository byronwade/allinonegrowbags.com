"use client"

import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function Footer() {
  useEffect(() => {
    const smoothScroll = (e: MouseEvent) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const targetId = target.getAttribute("href")?.slice(1)
      if (targetId) {
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", smoothScroll as EventListener)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", smoothScroll as EventListener)
      })
    }
  }, [])

  return (
    <footer className="bg-background border-t border-primary/20">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">ZugzBag</h3>
            <p className="text-gray-400">Premium all-in-one mushroom grow bags for cultivation enthusiasts.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-purple transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-purple transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#bulk-orders" className="text-gray-400 hover:text-purple transition-colors">
                  Bulk Orders
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-purple transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <p className="text-gray-400">Email: support@zugzbag.com</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary/20 text-center text-gray-400">
          <p>&copy; 2024 ZugzBag. All rights reserved.</p>
          <Link href="https://zugzology.com" className="text-purple hover:text-purple-dark transition-colors">
            Back to Zugzology
          </Link>
        </div>
      </div>
    </footer>
  )
}

