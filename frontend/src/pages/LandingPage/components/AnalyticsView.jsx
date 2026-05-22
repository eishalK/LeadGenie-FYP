import React from 'react';
import { TrendingUp, ArrowUpRight, MousePointer, Eye, Landmark } from 'lucide-react';

const AnalyticsView = () => {
  // Static dataset mapping out funnel performance for a clean SaaS experience
  const funnelSteps = [
    { stage: 'Total Page Visits', count: '1,240', percentage: '100%', color: 'bg-indigo-500' },
    { stage: 'Form Submissions', count: '396', percentage: '32%', color: 'bg-purple-500' },
    { stage: 'Qualified Leads', count: '180', percentage: '14.5%', color: 'bg-pink-500' },
    { stage: 'Converted Clients', count: '45', percentage: '3.6%', color: 'bg-orange-500' },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-6">
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-white/5">
        <div>
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-orange-500" /> Smart Funnel Analyzer
          </h3>
          <p className="text-gray-400 text-xs mt-0.5">Real-time breakdown of page metrics and form submissions.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-semibold self-start sm:self-auto">
          Avg. Conversion Rate: 32% <ArrowUpRight size={14} />
        </div>
      </div>

      {/* Grid: Quick Mini Analytics Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400"><Eye size={16} /></div>
          <div>
            <p className="text-xs text-gray-400">Unique Traffic</p>
            <p className="text-base font-bold text-white">4,812</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400"><MousePointer size={16} /></div>
          <div>
            <p className="text-xs text-gray-400">Form Click-Through</p>
            <p className="text-base font-bold text-white">24.8%</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400"><Landmark size={16} /></div>
          <div>
            <p className="text-xs text-gray-400">Estimated ROI</p>
            <p className="text-base font-bold text-white">+18.4%</p>
          </div>
        </div>
      </div>

      {/* Funnel Progress Chart Bars */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Conversion Funnel Visualizer</h4>
        <div className="space-y-3.5">
          {funnelSteps.map((step, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between text-sm text-gray-300 font-medium px-1">
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${step.color}`} />
                  {step.stage}
                </span>
                <span className="text-white font-semibold">
                  {step.count} <span className="text-gray-500 text-xs font-normal">({step.percentage})</span>
                </span>
              </div>
              {/* Outer structural bar track */}
              <div className="w-full h-2.5 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                {/* Colored progress node filling up layout dynamically */}
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${step.color}`} 
                  style={{ width: step.percentage }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;