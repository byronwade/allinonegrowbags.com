import { CheckCircle } from "lucide-react"

const benefits = [
  "Unmatched Quality: Our sterilized substrate and premium spawn ensure the best results.",
  "Beginner-Friendly: No experience needed – just follow the instructions!",
  "Fast and Reliable: Harvest your mushrooms in just 2-3 weeks.",
  "Grow Anywhere: Perfect for homes, apartments, or small spaces.",
]

export default function Benefits() {
  return (
    <section className="py-20 px-4 bg-blue-600 text-white">
      <h2 className="text-4xl font-bold text-center mb-12 font-exo">
        Why ZugzBag is the Best Choice for Mushroom Growers
      </h2>
      <div className="max-w-3xl mx-auto">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start mb-6">
            <CheckCircle className="w-6 h-6 text-neon-green mr-4 flex-shrink-0 mt-1" />
            <p className="text-xl font-montserrat">{benefit}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

