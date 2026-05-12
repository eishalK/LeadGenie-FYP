import React from 'react';

const Process = () => {
  const steps = [
    {
      number: "1",
      title: "Sign Up & Setup",
      description: "Create your account and customize your platform settings. Import your existing customer data in minutes.",
      color: "from-orange-500 to-pink-500",
      lineColor: "bg-orange-500/50"
    },
    {
      number: "2",
      title: "Build & Automate",
      description: "Create landing pages, set up email campaigns, and configure AI-powered automation workflows.",
      color: "from-purple-500 to-indigo-500",
      lineColor: "bg-purple-500/50"
    },
    {
      number: "3",
      title: "Grow & Optimize",
      description: "Watch your business grow with AI-driven insights and continuous campaign optimization.",
      color: "from-pink-500 to-purple-500",
      lineColor: "hidden" 
    }
  ];

  return (
    <section className="bg-[#0a051a] py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How LeadGenie Works</h2>
          <p className="text-gray-400 text-lg">Get started in minutes with our simple 3-step process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              
              {/* Connector Line - Centered between boxes */}
              {index !== 2 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-12 h-[2px] translate-x-1/2 -translate-y-1/2 z-0">
                   <div className={`w-full h-full ${step.lineColor} rounded-full`}></div>
                </div>
              )}
              
              {/* Step Card with Pop Effect */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 h-full relative z-10 
                            transition-all duration-500 ease-out
                            hover:bg-white/[0.08] hover:-translate-y-3 hover:border-white/20
                            hover:shadow-[0_20px_50px_rgba(139,92,246,0.1)] cursor-default">
                
                {/* Number Circle */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${step.color} 
                                flex items-center justify-center text-white font-bold text-xl mb-8 
                                shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {step.number}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-500">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;