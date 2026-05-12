import React from 'react';

const CTA = () => {
  return (
    <section className="bg-[#0a051a] py-12 px-6"> {/* Reduced outer padding */}
      <div className="container mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 p-10 md:p-14 text-center shadow-2xl"> {/* Reduced inner padding */}
          
          {/* Subtle background pattern/glow */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 space-y-6"> {/* Reduced space between elements */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight"> {/* Slightly smaller text for balance */}
              Ready to Transform Your Marketing?
            </h2>
            
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses already growing with LeadGenie. 
              Start your free trial today.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3.5 px-8 rounded-2xl transition-all active:scale-95 shadow-xl">
                Start Free Trial
              </button>
              
              <button className="bg-white/20 hover:bg-white/30 text-white border border-white/40 backdrop-blur-md font-bold py-3.5 px-8 rounded-2xl transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;