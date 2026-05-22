import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Eye, TrendingUp, Users, ArrowUpRight } from "lucide-react";

const FullAnalyticsView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analytics Engine</h1>
          <p className="text-gray-400 text-xs mt-1">
            Granular breakdown tracking traffic acquisition flows and customer
            conversion velocity.
          </p>
        </div>

        {/* Upper Row Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <span className="text-gray-400 text-[11px] font-medium block">
              Total Traffic Visitors
            </span>
            <p className="text-2xl font-bold mt-1">1,000</p>
            <span className="text-[10px] text-emerald-400 font-semibold">
              +18% this month
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <span className="text-gray-400 text-[11px] font-medium block">
              Leads Collected Records
            </span>
            <p className="text-2xl font-bold mt-1">123</p>
            <span className="text-[10px] text-emerald-400 font-semibold">
              +12% this month{" "}
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <span className="text-gray-400 text-[11px] font-medium block">
              Conversion Velocity
            </span>
            <p className="text-2xl font-bold mt-1">12.3%</p>
            <span className="text-[10px] text-emerald-400 font-semibold">
              +2.1% improvement{" "}
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <span className="text-gray-400 text-[11px] font-medium block">
              Raw Page Impressions
            </span>
            <p className="text-2xl font-bold mt-1">2,340</p>
            <span className="text-[10px] text-emerald-400 font-semibold">
              +8% this month
            </span>
          </div>
        </div>

        {/* Double Dashboard Chart Segment Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6">
            <h4 className="text-sm font-bold text-white mb-4">
              Traffic Performance Distribution
            </h4>
            <div className="h-48 border border-dashed border-white/10 rounded-2xl bg-white/[0.01] flex items-center justify-center text-xs text-gray-500">
              [ Dynamic BarChart: Mon - Sun Interaction Tracker Line Node ]
            </div>
          </div>
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-6">
            <h4 className="text-sm font-bold text-white mb-4">
              Conversion Channels Source
            </h4>
            <div className="h-48 border border-dashed border-white/10 rounded-2xl bg-white/[0.01] flex items-center justify-center text-xs text-gray-500">
              [ Doughnut Conversion Chart Node ]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FullAnalyticsView;
