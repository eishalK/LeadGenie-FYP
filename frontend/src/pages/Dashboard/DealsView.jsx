// src/pages/Dashboard/DealsView.jsx
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

// Initial mock data with structural configurations matching your MongoDB models
const INITIAL_DEALS = [
  {
    id: "d1",
    name: "Solo - Zylken Studio",
    amount: "$30,000.00",
    stage: "Closed Won",
    account: "Zylken Studio",
    owner: "Anna Delilah",
    revenue: "$30,000.00",
  },
  {
    id: "d2",
    name: "Altair Enterprises",
    amount: "$400,000.00",
    stage: "Qualification",
    account: "Altair Enterprises",
    owner: "Anna Delilah",
    revenue: "$40,000.00",
  },
  {
    id: "d3",
    name: "New Integration with Pangea",
    amount: "$82,587.00",
    stage: "Closed Won",
    account: "Pangea Systems",
    owner: "Ali", // Matches user avatar context at bottom left
    revenue: "$82,587.00",
  },
  {
    id: "d4",
    name: "New Renewal with Orbis Inc",
    amount: "$18,952.00",
    stage: "Closed Won",
    account: "Orbis Inc",
    owner: "Anna Delilah",
    revenue: "$18,952.00",
  },
  {
    id: "d5",
    name: "Expansion with Vertex Group",
    amount: "$32,848.00",
    stage: "Needs Analysis",
    account: "Vertex Group",
    owner: "Ali",
    revenue: "$5,912.64",
  },
  {
    id: "d6",
    name: "Integration with Pinnacle",
    amount: "$29,586.00",
    stage: "Negotiation",
    account: "Pinnacle Solutions",
    owner: "Anna Delilah",
    revenue: "$9,171.66",
  },
  {
    id: "d7",
    name: "New Renewal with Nova Systems",
    amount: "$49,267.00",
    stage: "Negotiation",
    account: "Nova Systems",
    owner: "Anna Delilah",
    revenue: "$16,750.78",
  },
];

// Stylings mapped strictly to your schema options
const STAGE_CONFIGS = {
  Qualification: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Needs Analysis": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Negotiation: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Closed Won": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Closed Lost": "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const DealsView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("All Deals");
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const dropdownRef = useRef(null);

  const tabs = [
    "All Locked Deals",
    "All Deals",
    "Closing Next Month",
    "Closing This Month",
    "My Deals",
  ];

  // Close dropdown when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update dynamic Stage statuses instantly inline
  const handleStageChange = (dealId, newStage) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: newStage } : deal,
      ),
    );
    setActiveDropdownId(null);
  };

  // Logic pipeline processing what records to display based on your selected tab
  const filteredDeals = deals.filter((deal) => {
    // 1. First parse text searches
    const matchesSearch =
      deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.account.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // 2. Tab logic filters
    switch (activeTab) {
      case "All Locked Deals":
        return deal.stage === "Closed Won" || deal.stage === "Closed Lost";
      case "My Deals":
        return deal.owner === "Ali"; // Dynamically tracks local authenticated manager account
      case "Closing This Month":
        return deal.id === "d2" || deal.id === "d6"; // Mock situational date-flag mappings
      case "Closing Next Month":
        return deal.id === "d5" || deal.id === "d7";
      case "All Deals":
      default:
        return true;
    }
  });

  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white overflow-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header Title Space */}
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

        {/* Dynamic Functional Filter Nav Tabs */}
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

        {/* Toolbar Intersections */}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sales records..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs outline-none text-white focus:border-orange-500/50"
            />
          </div>
        </div>

        {/* Pipeline Data Workspace Table Layout */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-visible shadow-2xl">
          <div className="overflow-x-auto overflow-y-visible">
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
                {filteredDeals.length > 0 ? (
                  filteredDeals.map((deal) => (
                    <tr
                      key={deal.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-4 px-5">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="py-4 px-5 font-semibold text-white group-hover:text-orange-400 transition-colors">
                        {deal.name}
                      </td>
                      <td className="py-4 px-5 font-mono">{deal.amount}</td>

                      {/* Active Status Interaction Cell */}
                      <td className="py-4 px-5 relative overflow-visible">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(
                              activeDropdownId === deal.id ? null : deal.id,
                            );
                          }}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95 ${STAGE_CONFIGS[deal.stage] || "bg-white/5 text-white border-white/10"}`}
                        >
                          {deal.stage}
                          <ChevronDown size={10} className="opacity-60" />
                        </button>

                        {/* Pop-up Absolute Menu Container */}
                        {activeDropdownId === deal.id && (
                          <div
                            ref={dropdownRef}
                            className="absolute z-50 left-5 mt-2 w-44 bg-[#130d2a] border border-white/10 rounded-xl shadow-2xl p-1.5"
                          >
                            {Object.keys(STAGE_CONFIGS).map((stageOption) => (
                              <button
                                key={stageOption}
                                onClick={() =>
                                  handleStageChange(deal.id, stageOption)
                                }
                                className={`w-full text-left px-3 py-2 text-[11px] rounded-lg transition-colors hover:bg-white/5 cursor-pointer ${deal.stage === stageOption ? "text-orange-400 font-semibold bg-orange-500/5" : "text-gray-300"}`}
                              >
                                {stageOption}
                              </button>
                            ))}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-5 text-gray-400">
                        {deal.account}
                      </td>
                      <td className="py-4 px-5 flex items-center gap-2 mt-1">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-gradient-to-r ${deal.owner === "Ali" ? "from-orange-500 to-amber-500" : "from-purple-500 to-pink-500"}`}
                        >
                          {deal.owner.charAt(0).toUpperCase()}
                        </div>
                        {deal.owner}
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-white font-semibold">
                        {deal.revenue}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-8 text-center text-gray-500 font-medium"
                    >
                      No pipelines matching active tab filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Metrics Panel */}
          <div className="bg-white/[0.01] border-t border-white/5 px-6 py-4 flex items-center justify-between text-xs text-gray-400">
            <span>
              Total Visible Records:{" "}
              <strong className="text-white">{filteredDeals.length}</strong>
            </span>
            <div className="flex items-center gap-4">
              <span>
                1 to {filteredDeals.length} of {filteredDeals.length}
              </span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded bg-white/5 border border-white/10 hover:text-white cursor-not-allowed opacity-50">
                  <ChevronLeft size={14} />
                </button>
                <button className="p-1 rounded bg-white/5 border border-white/10 hover:text-white cursor-not-allowed opacity-50">
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
