import React from 'react';

const Stats = () => {
  const statItems = [
    { label: "Active Businesses", value: "50K+" },
    { label: "Leads Generated", value: "2M+" },
    { label: "Customer Satisfaction", value: "95%" },
    { label: "Customer Support", value: "24/7" },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-gradient-to-r from-white/5 to-purple-500/5 backdrop-blur-md border border-white/10 rounded-[40px] p-10 md:p-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {statItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-300 to-pink-500">
                {item.value}
              </div>
              <div className="text-gray-400 text-sm md:text-base font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;