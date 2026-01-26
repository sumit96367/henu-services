'use client';

/**
 * Static gradient background component
 * Minimal, non-animated background for premium scroll experience
 */
export function StaticGradientBg({ variant = 'dark' }: { variant?: 'dark' | 'minimal' | 'grain' }) {
    const backgrounds = {
        dark: 'bg-gradient-to-b from-black via-gray-950 to-black',
        minimal: 'bg-gradient-to-b from-gray-950 to-gray-900',
        grain: 'bg-black'
    };

    return (
        <div className="fixed inset-0 -z-10">
            <div className={`absolute inset-0 ${backgrounds[variant]}`} />

            {variant === 'grain' && (
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '128px 128px'
                    }}
                />
            )}

            {/* Subtle vignette */}
            <div
                className="absolute inset-0 opacity-50"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
                }}
            />
        </div>
    );
}

export default StaticGradientBg;
