import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Sparkles,
  DollarSign,
  Target,
  Briefcase,
  Search,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

const CampaignView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  // Form States
  const [productType, setProductType] = useState("");
  const [targetAge, setTargetAge] = useState("25-34");
  const [audienceType, setAudienceType] = useState("");
  const [budget, setBudget] = useState("");

  const handleRunScraperCampaign = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Dynamic timeout layout mimic payload routing via Tavily Engine
    setTimeout(() => {
      setSuggestions({
        summary: `Market signals successfully extracted via structural crawling endpoints. Competitors are heavily capturing the ${targetAge} tier using continuous social media ads.`,
        competitorPricing:
          "Average pricing: Rs. 2,400 - Rs. 3,500 for matching items.",
        channelAdvice:
          "Recommended Channel: Meta Network Ads combined with high-converting landing opt-in templates.",
        actionPlan:
          "Action Plan: Implement a 10% lower introductory trial or provide a fast, single-click appointment scheduler link to maximize ROI conversions.",
      });
      setLoading(false);
      toast.success("Tavily API Market Insights Generated!");
    }, 2500);
  };

  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white overflow-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Market Campaign Insights
          </h1>
          <p className="text-gray-400 text-xs mt-1">
            Configure target constraints to dynamically extract public
            competitor data using the Tavily API engine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Side */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 h-fit backdrop-blur-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
              <Target size={18} className="text-orange-500" /> Campaign
              Parameters
            </h3>

            <form onSubmit={handleRunScraperCampaign} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5 pl-1">
                  Product or Service Type
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <Briefcase size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    placeholder="e.g. Organic Skincare"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs outline-none focus:border-orange-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5 pl-1">
                  Target Age Demographics
                </label>
                <select
                  value={targetAge}
                  onChange={(e) => setTargetAge(e.target.value)}
                  className="w-full bg-[#110a2c] border border-white/10 rounded-xl py-3 px-4 text-xs outline-none focus:border-orange-500 transition-all text-white"
                >
                  <option value="18-24">18 - 24 (Gen Z Focus)</option>
                  <option value="25-34">25 - 34 (Young Professionals)</option>
                  <option value="35-50">35 - 50 (Established Audience)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5 pl-1">
                  Target Persona Description
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    value={audienceType}
                    onChange={(e) => setAudienceType(e.target.value)}
                    placeholder="e.g. Small local boutique gym owners"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs outline-none focus:border-orange-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5 pl-1">
                  Target Monthly Budget Limits
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                    <DollarSign size={16} />
                  </span>
                  <input
                    type="number"
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 15000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs outline-none focus:border-orange-500 transition-all font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 text-white font-bold py-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-lg shadow-orange-600/10"
              >
                {loading
                  ? "Crawling Web Records..."
                  : "Generate AI Suggestions Plan"}
                <Sparkles size={16} />
              </button>
            </form>
          </div>

          {/* AI Result Side */}
          <div className="lg:col-span-3 space-y-6">
            {!suggestions ? (
              <div className="h-full min-h-[350px] border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-white/[0.01]">
                <div className="w-12 h-12 bg-white/5 text-gray-500 rounded-full flex items-center justify-center mb-3">
                  <Search size={22} />
                </div>
                <h4 className="text-sm font-bold text-white">
                  Awaiting Engine Submission
                </h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Fill out the audience criteria to execute structural public
                  scans.
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-b from-purple-900/20 to-transparent border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl animate-fadeIn">
                <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                  <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Optimization Strategy Matrix
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Tavily data parsing node complete.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs leading-relaxed">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-orange-400 font-semibold block uppercase tracking-wider text-[10px]">
                      Market Observation{" "}
                    </span>
                    <p className="text-gray-200">{suggestions.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-teal-400 font-semibold block uppercase tracking-wider text-[10px]">
                        Scraped Pricing{" "}
                      </span>
                      <p className="text-gray-200">
                        {suggestions.competitorPricing}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-blue-400 font-semibold block uppercase tracking-wider text-[10px]">
                        Optimal Channel{" "}
                      </span>
                      <p className="text-gray-200">
                        {suggestions.channelAdvice}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-1">
                    <span className="text-emerald-400 font-semibold block uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <CheckCircle2 size={12} /> Strategic Execution Steps
                    </span>
                    <p className="text-gray-200">{suggestions.actionPlan}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignView;
