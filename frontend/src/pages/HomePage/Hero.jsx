import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-[#0a051a] min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-500 text-sm font-medium">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            AI-Powered Marketing Platform
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
            One Platform for All Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
              Marketing Needs
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
            Streamline your customer management, automate marketing campaigns, and grow 
            your business with AI-assisted insights—all in one affordable platform 
            designed for small businesses.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-orange-600/20">
              Start Free Trial <ArrowRight size={20} />
            </button>
            
            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 px-8 rounded-xl flex items-center gap-3 transition-all">
              Watch Demo <Play size={18} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Right Content: Image with Glass Frame */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#0d071f] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="/marketing-team.png" 
              alt="Marketing Dashboard" 
              className="w-full h-auto grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
            {/* Subtle Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a051a] via-transparent to-transparent"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;