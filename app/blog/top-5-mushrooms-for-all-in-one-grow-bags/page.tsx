import Image from "next/image"

export const metadata = {
  title: "Top 5 Mushrooms for All-in-One Grow Bags | ZugzBag Blog",
  description:
    "Discover the best mushroom varieties to grow using all-in-one mushroom grow bags. Learn about oyster, shiitake, lion's mane, and more!",
}

export default function BlogPost() {
  return (
    <article className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">Top 5 Mushrooms for All-in-One Grow Bags</h1>

      <p className="text-gray-300 mb-6">
        All-in-one grow bags have revolutionized mushroom cultivation, making it easier than ever for both beginners and
        experienced growers. In this post, we'll explore the top 5 mushroom varieties that thrive in all-in-one grow
        bags.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-white">1. Oyster Mushrooms</h2>
        <Image
          src="/placeholder.svg?height=300&width=500"
          alt="Oyster Mushrooms in All-in-One Grow Bag"
          width={500}
          height={300}
          className="rounded-lg mb-4"
        />
        <p className="text-gray-300">
          Oyster mushrooms are a fantastic choice for all-in-one grow bags due to their rapid growth and high yields.
          They come in various colors and are known for their delicate flavor and texture.
        </p>
      </section>

      {/* Add similar sections for Shiitake, Lion's Mane, Reishi, and King Trumpet mushrooms */}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-white">Conclusion</h2>
        <p className="text-gray-300">
          All-in-one grow bags offer an excellent way to cultivate a variety of gourmet mushrooms. Whether you're a
          beginner or an experienced grower, these top 5 mushroom varieties are sure to provide a rewarding growing
          experience.
        </p>
      </section>
    </article>
  )
}

