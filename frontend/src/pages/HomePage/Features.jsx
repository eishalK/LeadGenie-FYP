
import React from 'react';
import { 
  Users, 
  Layout, 
  Calendar, 
  Mail, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  Beaker 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Customer Relationship Management",
      description: "Centralize customer data, track interactions, and manage leads effortlessly from one unified dashboard.",
      icon: <Users className="text-purple-400" size={24} />,
      iconBg: "bg-purple-500/10"
    },
    {
      title: "Landing Page & Funnel Builder",
      description: "Create high-converting landing pages with drag-and-drop simplicity. Capture leads automatically into your CRM.",
      icon: <Layout className="text-orange-400" size={24} />,
      iconBg: "bg-orange-500/10"
    },
    {
      title: "Appointment Scheduling",
      description: "Let customers book time slots seamlessly with automatic calendar syncing and conflict prevention.",
      icon: <Calendar className="text-pink-400" size={24} />,
      iconBg: "bg-pink-500/10"
    },
    {
      title: "Email Automation",
      description: "Send personalized campaigns, promotional emails, and automated follow-ups to engage your audience.",
      icon: <Mail className="text-purple-400" size={24} />,
      iconBg: "bg-purple-500/10"
    },
    {
      title: "AI Content Generator",
      description: "Generate compelling marketing copy, email content, and social media posts powered by artificial intelligence.",
      icon: <Zap className="text-orange-400" size={24} />,
      iconBg: "bg-orange-500/10"
    },
    {
      title: "Smart Funnel Analytics",
      description: "Track visitor behavior, conversion rates, and campaign performance with intelligent insights.",
      icon: <BarChart3 className="text-purple-400" size={24} />,
      iconBg: "bg-purple-500/10"
    },
    {
      title: "Campaign Optimization",
      description: "Get AI-driven recommendations to improve your marketing campaigns based on real-time performance data.",
      icon: <CheckCircle2 className="text-pink-400" size={24} />,
      iconBg: "bg-pink-500/10"
    },
    {
      title: "Market Intelligence",
      description: "Automatically gather competitor insights and market trends to stay ahead of the competition.",
      icon: <Beaker className="text-purple-400" size={24} />,
      iconBg: "bg-purple-500/10"
    }
  ];

  return (
    <section className="bg-[#0a051a] py-24 px-6">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Powerful Features for Your Marketing Success
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to manage, automate, and optimize your marketing campaigns
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div className={`w-12 h-12 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;