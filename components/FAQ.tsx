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
    question: "What's included in the ZugzBag all-in-one grow bag kit?",
    answer:
      "The ZugzBag all-in-one grow bag kit includes a pre-sterilized substrate bag with 4 lbs of organic ingredients, a high-quality spawn, a .2 micron air filter for proper gas exchange, a self-healing injection port, and detailed step-by-step instructions for mushroom cultivation.",
  },
  {
    question: "What types of mushrooms can I grow with ZugzBag all-in-one grow bags?",
    answer:
      "ZugzBag all-in-one grow bags are versatile and can be used to grow various gourmet mushroom species, including oyster mushrooms, shiitake, lion's mane, reishi, and more. The specific type depends on the spores or liquid culture you use in your all-in-one bag.",
  },
  {
    question: "How long does it take to grow mushrooms with ZugzBag all-in-one grow bags?",
    answer:
      "With ZugzBag all-in-one grow bags, you can expect to see your first mushroom harvest in about 4-6 weeks after inoculation. This includes 2-3 weeks for colonization and 1-2 weeks for fruiting.",
  },
  {
    question: "Are ZugzBag all-in-one grow bags suitable for beginners?",
    answer:
      "Yes, ZugzBag all-in-one grow bags are designed to be user-friendly, making them perfect for beginners with no prior mushroom growing experience. Our detailed instructions guide you through every step of the mushroom cultivation process.",
  },
  {
    question: "How many harvests can I get from one ZugzBag all-in-one grow bag?",
    answer:
      "Typically, you can expect 2-3 flushes (harvests) from a single ZugzBag all-in-one grow bag, depending on the mushroom variety and care. Some growers have reported up to 4-5 flushes with proper maintenance of their all-in-one bags.",
  },
  {
    question: "Do you offer a growth guarantee for your all-in-one grow bags?",
    answer:
      "Yes, we do! If your ZugzBag all-in-one grow bag doesn't produce mushrooms for any reason, we'll replace it free of charge. We're confident in our all-in-one product and want you to have a successful mushroom growing experience.",
  },
  {
    question: "Are ZugzBag's all-in-one grow bags suitable for commercial mushroom production?",
    answer:
      "ZugzBag's all-in-one grow bags are perfect for commercial mushroom production. We offer bulk discounts for larger orders, making it cost-effective for commercial growers. The consistency and quality of our bags ensure reliable yields for professional cultivators.",
  },
  {
    question: "Do you offer bulk discounts on all-in-one grow bags?",
    answer:
      "Yes! We offer incremental discounts starting from 2+ all-in-one grow bags. The more ZugzBag all-in-one grow bags you order, the more you save per unit. This is perfect for gifts or if you're thinking of starting your own gourmet mushroom business using our all-in-one cultivation solution.",
  },
]

export default function FAQ() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background/50 to-background" id="faq">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
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

