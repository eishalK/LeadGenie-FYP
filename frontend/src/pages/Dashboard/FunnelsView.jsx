import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Plus, Layout, ArrowUpRight } from 'lucide-react';

const FunnelsView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Funnels & Pages</h1>
            <p className="text-gray-400 text-xs mt-1">Review landing metrics that optimize traffic conversions into leads.</p>
          </div>
          <button className="bg-orange-600 hover:bg-orange-500 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-600/10"><Plus size={14} /> Create New</button>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl"><Layout size={18} /></div>
              <div>
                <h4 className="font-bold text-sm">Summer Sale Opt-In Lead Page </h4>
                <p className="text-xs text-gray-400 font-mono">Template: Modern Hero Matrix Layout</p>
              </div>
            </div>
            <div className="flex gap-8 items-center text-xs text-right">
              <div><span className="text-gray-400 text-[10px] block">Visits</span><strong className="text-white">1,234</strong></div>
              <div><span className="text-gray-400 text-[10px] block">Conversions</span><strong className="text-emerald-400">89 Leads </strong></div>
              <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white cursor-pointer"><ArrowUpRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FunnelsView;