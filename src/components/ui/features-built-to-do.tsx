import { Zap, MousePointer2, Sparkles, Gauge } from 'lucide-react'
import { motion } from 'framer-motion'

export function FeaturesBuiltToDo() {
    return (
        <section style={{ marginTop: '200px', paddingTop: '80px', paddingBottom: '80px' }} className="bg-transparent">
            <div className="mx-auto max-w-5xl space-y-12 px-6">
                {/* Header Row - Title left, Description right */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12"
                >
                    <h2 className="text-4xl font-semibold text-white">
                        What We're <span className="text-cyan-400">Built To Do</span>
                    </h2>
                    <p className="max-w-sm text-gray-400 sm:ml-auto">
                        Core capabilities, not services. Outcomes, not deliverables. We architect systems that drive real business value.
                    </p>
                </motion.div>

                {/* UI Mockup Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-3xl p-3 md:-mx-8"
                >
                    {/* Dashboard UI Mockup */}
                    <div className="aspect-[16/9] relative rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl">
                        {/* Gradient overlay */}
                        <div className="bg-gradient-to-t from-[#050505] via-transparent to-transparent absolute inset-0 z-30 pointer-events-none"></div>

                        {/* Simulated Dashboard UI */}
                        <div className="absolute inset-0 z-10 p-4 md:p-6 grid grid-cols-12 gap-3 md:gap-4">
                            {/* Sidebar */}
                            <div className="col-span-3 bg-white/5 rounded-xl p-3 md:p-4 border border-white/5 backdrop-blur-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600"></div>
                                    <span className="text-white text-sm font-medium hidden md:block">Henu OS</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
                                        <div className="w-4 h-4 rounded bg-cyan-500/30"></div>
                                        <span className="text-white/80 text-xs hidden md:block">Dashboard</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition">
                                        <div className="w-4 h-4 rounded bg-white/20"></div>
                                        <span className="text-white/50 text-xs hidden md:block">Projects</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition">
                                        <div className="w-4 h-4 rounded bg-white/20"></div>
                                        <span className="text-white/50 text-xs hidden md:block">Analytics</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition">
                                        <div className="w-4 h-4 rounded bg-white/20"></div>
                                        <span className="text-white/50 text-xs hidden md:block">Settings</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="col-span-9 space-y-4">
                                {/* Top Stats Row */}
                                <div className="grid grid-cols-3 gap-3 md:gap-4">
                                    <div className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/5">
                                        <div className="text-xs text-gray-500 mb-1">Performance</div>
                                        <div className="text-xl md:text-2xl font-bold text-white">98.2%</div>
                                        <div className="text-xs text-green-400 mt-1">↑ 12.5%</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/5">
                                        <div className="text-xs text-gray-500 mb-1">Uptime</div>
                                        <div className="text-xl md:text-2xl font-bold text-white">99.99%</div>
                                        <div className="text-xs text-cyan-400 mt-1">Last 30 days</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/5">
                                        <div className="text-xs text-gray-500 mb-1">Deployments</div>
                                        <div className="text-xl md:text-2xl font-bold text-white">247</div>
                                        <div className="text-xs text-amber-400 mt-1">This month</div>
                                    </div>
                                </div>

                                {/* Chart Area */}
                                <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/5 flex-1">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm text-white font-medium">System Activity</span>
                                        <span className="text-xs text-gray-500">Last 7 days</span>
                                    </div>
                                    {/* Fake Chart */}
                                    <div className="flex items-end gap-2 h-24 md:h-32">
                                        {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                                            <div key={i} className="flex-1 bg-gradient-to-t from-cyan-500/50 to-cyan-400/20 rounded-t" style={{ height: `${height}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 4-Column Feature Grid */}
                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="size-4 text-cyan-400" />
                            <h3 className="text-sm font-medium text-white">Product Engineering</h3>
                        </div>
                        <p className="text-sm text-gray-400">
                            Full-stack systems designed to scale with your ambition. Web, mobile, backend—architected as unified platforms.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                    >
                        <div className="flex items-center gap-2">
                            <MousePointer2 className="size-4 text-cyan-400" />
                            <h3 className="text-sm font-medium text-white">Experience Architecture</h3>
                        </div>
                        <p className="text-sm text-gray-400">
                            Interfaces built for precision and purpose. Every interaction is deliberate, every layout optimized for clarity.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                    >
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4 text-cyan-400" />
                            <h3 className="text-sm font-medium text-white">Applied AI & Automation</h3>
                        </div>
                        <p className="text-sm text-gray-400">
                            Intelligent systems that remove friction. From autonomous agents to workflow automation, we build AI that works.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                    >
                        <div className="flex items-center gap-2">
                            <Gauge className="size-4 text-cyan-400" />
                            <h3 className="text-sm font-medium text-white">Performance Optimization</h3>
                        </div>
                        <p className="text-sm text-gray-400">
                            Speed matters. Load times, response rates, database efficiency—we obsess over milliseconds because results matter.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
