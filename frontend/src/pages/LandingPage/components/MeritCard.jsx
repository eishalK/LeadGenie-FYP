import React from 'react';

const MetricCard = ({ title, value, change, changeType, icon: Icon, iconBg }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex justify-between items-start transition-all hover:border-white/20">
      <div>
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <p className="text-3xl font-bold mt-2 text-white">{value}</p>
        <span className={`text-xs font-semibold mt-1 block ${
          changeType === 'positive' ? 'text-emerald-400' : 'text-gray-400'
        }`}>
          {change}
        </span>
      </div>
      <div className={`p-3 rounded-xl text-white ${iconBg}`}>
        <Icon size={20} />
      </div>
    </div>
  );
};

export default MetricCard;