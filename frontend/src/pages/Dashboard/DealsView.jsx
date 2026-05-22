// src/pages/Dashboard/DealsView.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MOCK_DEALS = [
  {
    name: "Solo - Zylken Studio",
    amount: "$30,000.00",
    stage: "Closed Won",
    stageBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    account: "Zylken Studio",
    owner: "Anna Delilah",
    revenue: "$30,000.00",
  },
  {
    name: "Altair Enterprises",
    amount: "$400,000.00",
    stage: "Qualification",
    stageBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    account: "Altair Enterprises",
    owner: "Anna Delilah",
    revenue: "$40,000.00",
  },
  {
    name: "New Integration with Pangea",
    amount: "$82,587.00",
    stage: "Closed Won",
    stageBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    account: "Pangea Systems",
    owner: "Anna Delilah",
    revenue: "$82,587.00",
  },
  {
    name: "New Renewal with Orbis Inc",
    amount: "$18,952.00",
    stage: "Closed Won",
    stageBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    account: "Orbis Inc",
    owner: "Anna Delilah",
    revenue: "$18,952.00",
  },
  {
    name: "Expansion with Vertex Group",
    amount: "$32,848.00",
    stage: "Needs Analysis",
    stageBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    account: "Vertex Group",
    owner: "Anna Delilah",
    revenue: "$5,912.64",
  },
  {
    name: "Integration with Pinnacle",
    amount: "$29,586.00",
    stage: "Negotiation",
    stageBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    account: "Pinnacle Solutions",
    owner: "Anna Delilah",
    revenue: "$9,171.66",
  },
  {
    name: "New Renewal with Nova Systems",
    amount: "$49,267.00",
    stage: "Negotiation",
    stageBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    account: "Nova Systems",
    owner: "Anna Delilah",
    revenue: "$16,750.78",
  },
];

const DealsView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("All Deals");

  const tabs = [
    "All Locked Deals",
    "All Deals",
    "Closing Next Month",
    "Closing This Month",
    "My Deals",
  ];

  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white overflow-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Deals Pipeline
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Track conversions, financial values, and sales progression
              metrics.
            </p>
          </div>
          <button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-orange-600/10 self-start sm:self-auto cursor-pointer">
            <Plus size={16} /> Create Deal
          </button>
        </div>

        <div className="flex items-center gap-2 border-b border-white/5 pb-px mb-6 overflow-x-auto whitespace-nowrap scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? "border-orange-500 text-orange-400 font-semibold"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-300 hover:text-white cursor-pointer">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-300 hover:text-white cursor-pointer">
              <ArrowUpDown size={14} /> Sort
            </button>
          </div>
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search sales records..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs outline-none text-white focus:border-orange-500/50"
            />
          </div>
        </div>

        <div className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/10 text-gray-400 text-xs font-semibold tracking-wider">
                  <th className="py-4 px-5 w-4">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="py-4 px-5">Deal Name</th>
                  <th className="py-4 px-5">Amount</th>
                  <th className="py-4 px-5">Stage Status</th>
                  <th className="py-4 px-5">Account Name</th>
                  <th className="py-4 px-5">Deal Owner</th>
                  <th className="py-4 px-5 text-right">Expected Revenue</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-white/5 text-gray-300">
                {MOCK_DEALS.map((deal, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-4 px-5">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-4 px-5 font-semibold text-white group-hover:text-orange-400 transition-colors">
                      {deal.name}
                    </td>
                    <td className="py-4 px-5 font-mono">{deal.amount}</td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${deal.stageBg}`}
                      >
                        {deal.stage}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-gray-400">{deal.account}</td>
                    <td className="py-4 px-5 flex items-center gap-2 mt-1">
                      <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                        A
                      </div>
                      {deal.owner}
                    </td>
                    <td className="py-4 px-5 text-right font-mono text-white font-semibold">
                      {deal.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white/[0.01] border-t border-white/5 px-6 py-4 flex items-center justify-between text-xs text-gray-400">
            <span>
              Total Records: <strong className="text-white">332</strong>
            </span>
            <div className="flex items-center gap-4">
              <span>1 to 7 of 20</span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded bg-white/5 border border-white/10 hover:text-white cursor-pointer">
                  <ChevronLeft size={14} />
                </button>
                <button className="p-1 rounded bg-white/5 border border-white/10 hover:text-white cursor-pointer">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsView;
