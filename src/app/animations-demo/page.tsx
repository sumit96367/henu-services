import FundingHeroAnimation from '@/components/animations/FundingHeroAnimation';
import LegalHeroAnimation from '@/components/animations/LegalHeroAnimation';
import AIHeroAnimation from '@/components/animations/AIHeroAnimation';

export default function AnimationsDemo() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Funding Solutions */}
            <section className="min-h-screen flex items-center px-12 py-20 border-b border-white/10">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="max-w-xl">
                        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                            Funding Solutions
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Transform your startup vision into reality with strategic funding guidance.
                            From seed to Series A and beyond, we connect you with the right investors
                            at the right time.
                        </p>
                        <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl font-bold text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all">
                            Get Funded
                        </button>
                    </div>

                    {/* Right: Animation */}
                    <div className="h-[500px]">
                        <FundingHeroAnimation />
                    </div>
                </div>
            </section>

            {/* Legal Documentation */}
            <section className="min-h-screen flex items-center px-12 py-20 border-b border-white/10">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="max-w-xl">
                        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                            Legal Documentation
                            <br />& Compliance
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Navigate regulatory requirements with confidence. Our expert team ensures
                            your business stays compliant while you focus on growth. Full legal
                            documentation and entity formation support.
                        </p>
                        <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl font-bold text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all">
                            Stay Compliant
                        </button>
                    </div>

                    {/* Right: Animation */}
                    <div className="h-[500px]">
                        <LegalHeroAnimation />
                    </div>
                </div>
            </section>

            {/* AI Automations */}
            <section className="min-h-screen flex items-center px-12 py-20">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="max-w-xl">
                        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            AI Automations
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Scale your operations with intelligent automation. From data processing
                            to customer service, our AI solutions handle repetitive tasks so your
                            team can focus on innovation.
                        </p>
                        <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all">
                            Automate Now
                        </button>
                    </div>

                    {/* Right: Animation */}
                    <div className="h-[500px]">
                        <AIHeroAnimation />
                    </div>
                </div>
            </section>
        </div>
    );
}
