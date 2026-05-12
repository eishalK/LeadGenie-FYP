import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "29",
      features: ["Up to 1,000 contacts", "5 landing pages", "Email automation", "Basic analytics"],
      buttonText: "Get Started",
      isPopular: false,
    },
    {
      name: "Professional",
      price: "79",
      features: ["Up to 10,000 contacts", "Unlimited landing pages", "AI content generator", "Advanced analytics", "Priority support"],
      buttonText: "Get Started",
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Unlimited contacts", "All features included", "Custom integrations", "Dedicated account manager", "24/7 phone support"],
      buttonText: "Contact Sales",
      isPopular: false,
    }
  ];

  return (
    <section className="bg-[#0a051a] py-24 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 text-lg">Choose the perfect plan for your business needs</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-3xl p-8 border transition-all duration-500 flex flex-col ${
                plan.isPopular 
                ? "bg-gradient-to-b from-white/10 to-purple-500/10 border-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.15)] scale-105 z-10" 
                : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price !== "Custom" ? `$${plan.price}` : plan.price}
                  </span>
                  {plan.price !== "Custom" && <span className="text-gray-400">/month</span>}
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Check className={plan.isPopular ? "text-orange-500" : "text-purple-500"} size={18} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button 
                className={`w-full py-4 rounded-xl font-bold transition-all active:scale-[0.98] ${
                  plan.isPopular 
                  ? "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/20" 
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;