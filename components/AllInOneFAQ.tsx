import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is an all-in-one mushroom grow bag?",
    answer:
      "An all-in-one mushroom grow bag is a complete cultivation system that contains sterilized substrate and all necessary nutrients for mushroom growth. It's designed to simplify the growing process, making it ideal for both beginners and experienced growers.",
  },
  {
    question: "How does ZugzBag's all-in-one grow bag differ from others?",
    answer:
      "ZugzBag's all-in-one grow bags contain 4 lbs of premium, pre-sterilized substrate, which is more than many competitors offer. Our bags are made in the USA, feature a high-quality filter patch for optimal air exchange, and come with a self-healing injection port for easy inoculation.",
  },
  {
    question: "What types of mushrooms can I grow with ZugzBag's all-in-one grow bags?",
    answer:
      "ZugzBag's all-in-one grow bags are versatile and can be used to cultivate a wide variety of gourmet mushrooms, including oyster mushrooms, shiitake, lion's mane, reishi, and more. The nutrient-rich substrate is optimized for robust mycelium growth and fruiting.",
  },
  {
    question: "Are ZugzBag's all-in-one grow bags suitable for commercial mushroom production?",
    answer:
      "ZugzBag's all-in-one grow bags are perfect for commercial mushroom production. We offer bulk discounts for larger orders, making it cost-effective for commercial growers. The consistency and quality of our bags ensure reliable yields for professional cultivators.",
  },
  {
    question: "How long does it take to grow mushrooms using ZugzBag's all-in-one grow bags?",
    answer:
      "The growth cycle varies depending on the mushroom species, but typically, you can expect to see your first harvest in 4-6 weeks after inoculation. This includes about 2-3 weeks for colonization and 1-2 weeks for fruiting. Our all-in-one bags are designed to optimize this process for faster, more reliable results.",
  },
]

export default function AllInOneFAQ() {
  return (
    <section
      className="py-20 px-4 bg-gradient-to-b from-background/50 to-background"
      aria-labelledby="all-in-one-faq-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 id="all-in-one-faq-heading" className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
          All-in-One Grow Bag FAQs
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-primary/20">
              <AccordionTrigger className="text-lg text-white hover:text-purple">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

