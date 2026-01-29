import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

function Feature() {
    const items = [
        { title: "Chase Trends", desc: "We don't rebuild your app because a new framework launched. Technology serves the product—not the other way around." },
        { title: "Ship Rushed Work", desc: "Fast doesn't mean reckless. We optimize for speed without compromising quality, testing, or long-term maintainability." },
        { title: "Build Bloated Interfaces", desc: "If a feature doesn't serve a clear purpose, it doesn't ship. Clean systems beat feature lists." },
        { title: "Sell You What You Don't Need", desc: "We'll tell you when a simple solution beats a complex one. Honest guidance over maximizing billable hours." },
        { title: "Work Without Strategy", desc: "Code without context is just noise. Every build aligns with your business goals and product vision." },
        { title: "Ignore Performance", desc: "Slow products lose users. We don't ship anything that compromises speed, responsiveness, or reliability." }
    ];

    return (
        <div style={{ marginTop: '200px', paddingTop: '80px', paddingBottom: '80px' }} className="w-full bg-transparent">
            <div className="container mx-auto px-6">
                <div className="flex gap-6 flex-col items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >

                    </motion.div>
                    <div className="flex gap-4 flex-col">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-bold text-white mb-2"
                        >
                            What We <span className="text-red-400">Don't Do</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-gray-400"
                        >
                            Honesty over opportunity. These are the lines we draw to ensure we deliver high-quality, high-performance systems.
                        </motion.p>
                    </div>
                    <div className="flex gap-8 pt-8 flex-col w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-12">
                            {items.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    className="flex flex-row gap-4 w-full items-start group"
                                >
                                    <X className="w-4 h-4 mt-2 text-red-400 shrink-0" />
                                    <div className="flex flex-col gap-0.5">
                                        <p className="font-bold text-white text-lg">{item.title}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Feature };
