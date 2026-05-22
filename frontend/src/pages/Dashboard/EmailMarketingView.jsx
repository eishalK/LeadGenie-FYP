import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Mail, Percent, Eye, FileText, Plus } from "lucide-react";

const EmailMarketingView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Email Campaigns</h1>
            <p className="text-gray-400 text-xs mt-1">
              Manage transactional workflows and broadcast updates.
            </p>
          </div>
          <button className="bg-orange-600 hover:bg-orange-500 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-600/10">
            <Plus size={14} /> Create Template
          </button>
        </div>

        {/* Top Analytics Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
              <Mail size={18} />
            </div>
            <div>
              <span className="text-gray-400 text-xs">Emails Sent</span>
              <p className="text-2xl font-bold">479</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl">
              <Eye size={18} />
            </div>
            <div>
              <span className="text-gray-400 text-xs">Avg. Open Rate</span>
              <p className="text-2xl font-bold">76%</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
              <Percent size={18} />
            </div>
            <div>
              <span className="text-gray-400 text-xs">
                Active Automated Nodes
              </span>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>

        {/* Automated System List */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">
            Operational Workflow Templates
          </h3>
          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="p-2.5 bg-orange-500/10 text-orange-400 rounded-xl">
                <FileText size={16} />
              </div>
              <div>
                <h4 className="font-bold text-sm">
                  Welcome Email Automated Series{" "}
                </h4>
                <p className="text-xs text-gray-400">
                  Triggered instantly when user profile creation hits form
                  endpoints.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmailMarketingView;
