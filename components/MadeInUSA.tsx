import Image from "next/image"

export default function MadeInUSA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Proudly Made in the USA</h2>
            <p className="text-xl mb-6 text-gray-300">
              Every ZugzBag all-in-one mushroom grow bag is crafted with care in Santa Cruz, California. We're committed
              to supporting local economies and ensuring the highest quality standards for our products.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Locally sourced materials</li>
              <li>Stringent quality control</li>
              <li>Supporting American jobs</li>
              <li>Reduced carbon footprint</li>
            </ul>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-10%20082335-hpq2N9IsTJy5F8eU5O22WgDRd11VoS.png"
                alt="Made in Santa Cruz, California"
                width={600}
                height={450}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%201-mwIEXqZgwGiJ5fWOn6LaVyeH8i3ds1.png"
                  alt="American Flag"
                  width={100}
                  height={60}
                  className="rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

