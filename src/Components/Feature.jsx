import { useEffect, useState } from "react";
import FeatureDetails from "./FeatureDetails";

const Feature = () => {
    const [features, setFeatures] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        fetch('./feature.json')
            .then(res => res.json())
            .then(data => setFeatures(data))
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const section = document.getElementById('features-section');
        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div 
            id="features-section"
            className="relative min-h-[400px]  bg-[#0f1f60]   overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating geometric shapes */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 opacity-10 rounded-lg blur-xl animate-pulse transform rotate-45"></div>
                <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-400 opacity-10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-purple-400 opacity-10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-pink-400 opacity-10 rounded-lg blur-xl animate-pulse transform rotate-12"></div>
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                    }}></div>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-16">
                
                {/* Header Section with Enhanced Styling */}
                <div className={`text-center mb-10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-yellow-400 bg-opacity-20 backdrop-blur-sm border border-yellow-400 border-opacity-30 rounded-full px-6 py-2 mb-6 text-yellow-400 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Premium Features
                    </div>

                    {/* Main Title */}
                    <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-400 bg-clip-text text-transparent block">
                            The Best Beneficial
                        </span>
                        <span className="bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block">
                            Features For You
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Discover powerful AI-driven features designed to transform your fitness journey and help you achieve your goals faster than ever before.
                    </p>

                    {/* Decorative line */}
                    <div className="flex items-center justify-center mt-8 mb-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-32"></div>
                        <div className="mx-4 w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-32"></div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {features.map((feature, index) => (
                        <div 
                            key={feature.featureId}
                            className="transform transition-all duration-500 hover:scale-105"
                            style={{ 
                                animationDelay: `${index * 100}ms`,
                                animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                            }}
                        >
                            <FeatureDetails feature={feature} />
                        </div>
                    ))}
                </div>


            </div>



            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Feature;