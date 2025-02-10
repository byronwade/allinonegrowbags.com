import Image from "next/image"
import { CheckCircle, Leaf, Package } from "lucide-react"
import ShopifyCheckout from "./ShopifyCheckout"

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 text-white">Bulk Orders Welcome!</h2>
            <p className="text-xl mb-8 text-gray-300">
              Perfect for commercial growers and cultivation enthusiasts. The more you order, the more you save!
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                <span className="text-gray-300">Free shipping on all orders</span>
              </li>
              <li className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-primary" />
                <span className="text-gray-300">Bulk order fulfillment within 24 hours</span>
              </li>
              <li className="flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-primary" />
                <span className="text-gray-300">Premium sterile substrate</span>
              </li>
            </ul>
            <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6">
              <ShopifyCheckout />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sterile-all-in-one-mushroom-grow-bag-4-lbs-substrate-and-grain-filter-patch-112491-Hkoucg5alJXunr83eIolGhCMiHCxR3.webp"
              alt="ZugzBag Mushroom Grow Bag"
              width={500}
              height={500}
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

