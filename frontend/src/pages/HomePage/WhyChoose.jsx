import React from 'react';
import { Check } from 'lucide-react';

const WhyChoose = () => {
  const benefits = [
    {
      title: "All-in-One Solution",
      description: "No need for multiple tools. Everything you need in one affordable platform.",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      title: "AI-Powered Intelligence",
      description: "Leverage cutting-edge AI to optimize campaigns and generate high-converting content.",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Easy to Use",
      description: "Intuitive interface designed for small business owners, not tech experts.",
      iconColor: "text-pink-500",
      bgColor: "bg-pink-500/10"
    },
    {
      title: "Affordable Pricing",
      description: "Enterprise features at small business prices. Start free, scale as you grow.",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  return (
    <section className="bg-[#0a051a] py-24 px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="space-y-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why Choose LeadGenie?
          </h2>

          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-5 group">
                {/* Check Icon Box */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${benefit.bgColor} border border-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  <Check className={benefit.iconColor} size={24} strokeWidth={3} />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-w-md">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image with Reflection Effect */}
        <div className="relative">
          {/* Subtle Glow behind image */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 blur-3xl rounded-full"></div>
          
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="/dashboard-preview.png" 
              alt="LeadGenie Dashboard" 
              className="w-full h-auto object-cover scale-105"
            />
            {/* Dark overlay to match the moody aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a051a]/40 to-transparent"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;