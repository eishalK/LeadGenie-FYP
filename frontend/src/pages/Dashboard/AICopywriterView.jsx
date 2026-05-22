import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Sparkles, MessageSquare } from "lucide-react";

const AICopywriterView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Content Copywriter</h1>
          <p className="text-gray-400 text-xs mt-1">
            Generate marketing messages for emails, ads, or social posts
            instantly.
          </p>
        </div>

        <div className="max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-5">
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-2 pl-1">
              Describe your business parameters
            </label>
            <textarea
              placeholder="e.g., We run a local boutique gym offering high-tier functional strength training, yoga circles, and specialized nutritional tracks."
              className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white outline-none focus:border-orange-500 transition-all resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 font-medium mb-2 pl-1">
              Target Content Output Format
            </label>
            <select className="w-full bg-[#110a2c] border border-white/10 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-orange-500 transition-all">
              <option>Email Marketing Campaign Text </option>
              <option>
                High-Converting Facebook / Instagram Advertisement Copy{" "}
              </option>
              <option>Welcome Newsletter Notification Template </option>
            </select>
          </div>

          <button className="w-full bg-orange-600 hover:bg-orange-500 py-3.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer">
            Generate Content <Sparkles size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AICopywriterView;
