"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

const products = [
  { name: "Oyster Mushroom Kit", image: "/placeholder.svg?height=300&width=300", price: "$29.99" },
  { name: "Shiitake Mushroom Kit", image: "/placeholder.svg?height=300&width=300", price: "$34.99" },
  { name: "Lion's Mane Mushroom Kit", image: "/placeholder.svg?height=300&width=300", price: "$39.99" },
]

export default function ProductShowcase() {
  const [currentProduct, setCurrentProduct] = useState(0)

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length)
  }

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length)
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Premium Grow Kits</h2>
        <div className="flex items-center justify-between">
          <Button onClick={prevProduct} variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <Image
              src={products[currentProduct].image || "/placeholder.svg"}
              alt={products[currentProduct].name}
              width={300}
              height={300}
              className="mx-auto mb-4 rounded-lg shadow-md"
            />
            <h3 className="text-2xl font-semibold mb-2">{products[currentProduct].name}</h3>
            <p className="text-xl text-teal-600 font-bold mb-4">{products[currentProduct].price}</p>
            <Button className="bg-teal-500 text-white hover:bg-teal-600">Add to Cart</Button>
          </div>
          <Button onClick={nextProduct} variant="outline" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

