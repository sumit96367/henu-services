import { PhoneCall } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    faqs: FAQItem[];
    title?: string;
    description?: string;
}

function FAQ({ faqs, title, description }: FAQProps) {
    if (!faqs || faqs.length === 0) return null;

    return (
        <div className="w-full py-20 lg:py-40 bg-transparent">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
                    <div className="flex gap-10 flex-col">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex gap-6 flex-col"
                        >
                            <div className="flex gap-4 flex-col">
                                <h4 className="text-4xl md:text-6xl tracking-tighter max-w-xl text-left font-bold text-white leading-tight">
                                    {title || "Got Questions? We Have Answers."}
                                </h4>
                                <p className="text-xl max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-gray-400 text-left">
                                    {description || "Everything you need to know about our process, technology, and commitment to your project's success."}
                                </p>
                            </div>
                            <div className="pt-4">
                                <Button asChild className="gap-4 btn-secondary !h-14 !px-8 text-base border-white/10 hover:border-cyan-500/50 group" variant="outline">
                                    <Link href="/contact" className="flex items-center gap-3">
                                        Any questions? Reach out <PhoneCall className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full"
                    >
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={"index-" + index} className="border-white/10">
                                    <AccordionTrigger className="hover:text-cyan-400 transition-colors py-6">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-400 text-lg leading-relaxed pb-8">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export { FAQ };
