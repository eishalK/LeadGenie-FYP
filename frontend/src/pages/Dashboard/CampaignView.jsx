
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  Sparkles,
  DollarSign,
  Target,
  Briefcase,
  Search,
  CheckCircle2,
  Layers,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Cpu,
  ExternalLink,
  CalendarDays,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { generateCampaignInsightsService } from "../../services/authService";

// Safely format simple values and legacy AI responses.
const formatInsight = (value) => {
  if (value == null || value === "") return "N/A";

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "object" && item !== null
          ? JSON.stringify(item, null, 2)
          : String(item ?? "")
      )
      .filter(Boolean)
      .join("\n");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, item]) => `${key}: ${formatInsight(item)}`)
      .join("\n");
  }

  return String(value);
};

const CampaignView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [sources, setSources] = useState([]);

  const [productType, setProductType] = useState("");
  const [targetAge, setTargetAge] = useState(
    "25 - 34 (Young Professionals)"
  );
  const [audienceType, setAudienceType] = useState("");
  const [budget, setBudget] = useState("");

  const handleRunScraperCampaign = async (e) => {
    e.preventDefault();

    if (!productType.trim() || !audienceType.trim() || !budget) {
      toast.error("Please fill in all campaign parameters.");
      return;
    }

    if (!Number.isFinite(Number(budget)) || Number(budget) <= 0) {
      toast.error("Please enter a valid budget greater than zero.");
      return;
    }

    setLoading(true);
    setSuggestions(null);
    setSources([]);

    try {
      const response = await generateCampaignInsightsService({
        productType: productType.trim(),
        ageDemographics: targetAge,
        personaDescription: audienceType.trim(),
        budget,
      });

      // Axios normally exposes the server response through response.data.
      const result = response?.data;

      if (result?.success === false || result?.error) {
        throw new Error(
          result?.error || "Campaign generation failed."
        );
      }

      // Supports both the Python response and common Express wrappers.
      const campaignData =
        result?.data?.data ??
        result?.data ??
        (result?.success ? result : null);

      if (
        !campaignData ||
        typeof campaignData !== "object" ||
        Array.isArray(campaignData)
      ) {
        console.error("Unexpected campaign response:", result);
        throw new Error(
          "Received an unexpected response from the AI engine."
        );
      }

      setSuggestions(campaignData);

      const responseSources =
        result?.sources ??
        result?.data?.sources ??
        result?.data?.data?.sources ??
        [];

      setSources(
        Array.isArray(responseSources) ? responseSources : []
      );

      toast.success("Campaign strategy generated successfully!");
    } catch (error) {
      console.error("Campaign API Error:", error);

      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Unable to generate the campaign strategy."
      );
    } finally {
      setLoading(false);
    }
  };

  const kpiSection = suggestions?.kpisAndActionPlan;

  const kpis = Array.isArray(kpiSection?.kpis)
    ? kpiSection.kpis
    : [];

  const actionPlan = Array.isArray(kpiSection?.actionPlan)
    ? kpiSection.actionPlan
    : [];

  const legacyKpiSummary =
    typeof kpiSection === "string"
      ? kpiSection
      : kpiSection?.summary;

  const hasKpiContent =
    kpis.length > 0 ||
    actionPlan.length > 0 ||
    Boolean(legacyKpiSummary);

  return (
    <div className="flex min-h-screen xl:h-screen xl:min-h-0 bg-[#070314] text-white overflow-hidden font-sans">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <main className="flex-1 min-w-0 p-5 md:p-8 lg:p-10 overflow-y-auto xl:overflow-hidden xl:flex xl:flex-col">
        {/* Page Header */}
        <div className="mb-8 flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Market Campaign Insights
            </h1>

            <p className="text-gray-400 text-xs mt-2 max-w-xl leading-relaxed">
              Discover market trends, analyze your target audience,
              and generate a customized 90-day growth strategy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 xl:flex-1 xl:min-h-0">
          {/* Campaign Form */}
          <section className="xl:col-span-4">
            <div className="bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-5 md:p-7 h-fit shadow-xl">
              <h2 className="text-base font-bold mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                <span className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
                  <Target size={18} />
                </span>
                Campaign Parameters
              </h2>

              <form
                onSubmit={handleRunScraperCampaign}
                className="space-y-5"
              >
                {/* Product */}
                <div>
                  <label
                    htmlFor="productType"
                    className="block text-xs text-gray-300 font-medium mb-2"
                  >
                    Product or Service Type
                  </label>

                  <div className="relative">
                    <Briefcase
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="productType"
                      name="productType"
                      type="text"
                      required
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                      placeholder="e.g. AI CRM & Lead Automation"
                      disabled={loading}
                      className="w-full bg-[#12092b]/80 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-xs outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-white placeholder-gray-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Age Group */}
                <div>
                  <label
                    htmlFor="targetAge"
                    className="block text-xs text-gray-300 font-medium mb-2"
                  >
                    Target Age Demographics
                  </label>

                  <select
                    id="targetAge"
                    name="targetAge"
                    value={targetAge}
                    onChange={(e) => setTargetAge(e.target.value)}
                    disabled={loading}
                    className="w-full bg-[#12092b] border border-white/10 rounded-xl py-3.5 px-4 text-xs outline-none focus:border-orange-500 text-white cursor-pointer disabled:opacity-50"
                  >
                    <option value="18 - 24 (Gen Z Focus)">
                      18 - 24 (Gen Z Focus)
                    </option>
                    <option value="25 - 34 (Young Professionals)">
                      25 - 34 (Young Professionals)
                    </option>
                    <option value="35 - 50 (Established Audience)">
                      35 - 50 (Established Audience)
                    </option>
                  </select>
                </div>

                {/* Persona */}
                <div>
                  <label
                    htmlFor="audienceType"
                    className="block text-xs text-gray-300 font-medium mb-2"
                  >
                    Target Persona Description
                  </label>

                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="audienceType"
                      name="audienceType"
                      type="text"
                      required
                      value={audienceType}
                      onChange={(e) => setAudienceType(e.target.value)}
                      placeholder="e.g. Small real estate agency owners"
                      disabled={loading}
                      className="w-full bg-[#12092b]/80 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-xs outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-white placeholder-gray-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs text-gray-300 font-medium mb-2"
                  >
                    Target Monthly Budget (USD)
                  </label>

                  <div className="relative">
                    <DollarSign
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      id="budget"
                      name="budget"
                      type="number"
                      min="1"
                      step="any"
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. 10000"
                      disabled={loading}
                      className="w-full bg-[#12092b]/80 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-xs outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono text-white placeholder-gray-500 disabled:opacity-50"
                    />
                  </div>

                  <p className="text-[10px] text-gray-500 mt-2">
                    Enter the total monthly advertising budget in USD.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 mt-5 shadow-lg shadow-orange-600/20 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      Generating Strategy...
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                    </>
                  ) : (
                    <>
                      Generate Campaign Strategy
                      <Sparkles size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* Results */}
          <section className="xl:col-span-8 min-w-0 space-y-5 xl:h-full xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain xl:pr-2">
            {/* Empty State */}
            {!suggestions && !loading && (
              <div className="min-h-[480px] border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-white/[0.01]">
                <div className="w-16 h-16 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-orange-500 rounded-2xl flex items-center justify-center mb-5">
                  <Search size={27} />
                </div>

                <h3 className="text-sm font-bold text-white">
                  Ready to Build Your Campaign?
                </h3>

                <p className="text-xs text-gray-400 mt-2 max-w-sm leading-relaxed">
                  Enter your product, target audience, and budget.
                  LeadGenie will generate a strategic plan with
                  channel recommendations, KPIs, and action steps.
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="min-h-[480px] border border-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-white/[0.02]">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse" />
                  <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin relative" />
                </div>

                <h3 className="text-sm font-bold text-white animate-pulse">
                  Analyzing Market Signals...
                </h3>

                <p className="text-xs text-gray-400 mt-3 max-w-sm leading-relaxed">
                  Searching available market information and preparing
                  your campaign recommendations with Tavily and Gemini.
                </p>
              </div>
            )}

            {/* Generated Strategy */}
            {suggestions && !loading && (
              <div className="space-y-5 animate-fadeIn">
                {/* Results Header */}
                <div className="bg-gradient-to-r from-[#1b1037] to-[#100a24] border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400">
                      <Sparkles size={22} />
                    </div>

                    <div>
                      <h2 className="text-base md:text-lg font-extrabold">
                        90-Day Campaign Strategy
                      </h2>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Personalized recommendations for your campaign
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRunScraperCampaign.bind(null, {
                      preventDefault: () => {},
                    })}
                    disabled={loading}
                    className="hidden"
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>

                {/* 1. Executive Summary */}
                <article className="rounded-2xl bg-[#100d20] border border-white/10 p-5 md:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-orange-400">
                    <Layers size={17} />
                    <h3 className="text-xs font-bold uppercase tracking-wider">
                      1. Executive Summary & Objective
                    </h3>
                  </div>

                  <p className="text-gray-300 text-xs leading-7 whitespace-pre-line border-l-2 border-orange-500/40 pl-4">
                    {formatInsight(suggestions.executiveSummary)}
                  </p>
                </article>

                {/* 2. Target Audience */}
                <article className="rounded-2xl bg-[#100d20] border border-white/10 p-5 md:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-teal-400">
                    <Target size={17} />
                    <h3 className="text-xs font-bold uppercase tracking-wider">
                      2. Target Audience & Core Pain Points
                    </h3>
                  </div>

                  <p className="text-gray-300 text-xs leading-7 whitespace-pre-line border-l-2 border-teal-500/40 pl-4">
                    {formatInsight(suggestions.targetAudience)}
                  </p>
                </article>

                {/* 3. Channel Budget */}
                <article className="rounded-2xl bg-[#100d20] border border-white/10 p-5 md:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-blue-400">
                    <DollarSign size={17} />
                    <h3 className="text-xs font-bold uppercase tracking-wider">
                      3. Channel Strategy & Budget Allocation
                    </h3>
                  </div>

                  <p className="text-gray-300 text-xs leading-7 whitespace-pre-line border-l-2 border-blue-500/40 pl-4">
                    {formatInsight(suggestions.channelBudget)}
                  </p>
                </article>

                {/* 4. Roadmap */}
                <article className="rounded-2xl bg-[#100d20] border border-white/10 p-5 md:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400">
                    <CalendarDays size={17} />
                    <h3 className="text-xs font-bold uppercase tracking-wider">
                      4. Phased 90-Day Execution Roadmap
                    </h3>
                  </div>

                  <p className="text-gray-300 text-xs leading-7 whitespace-pre-line border-l-2 border-purple-500/40 pl-4">
                    {formatInsight(suggestions.roadmap)}
                  </p>
                </article>

                {/* 5. KPIs & Action Plan */}
                <article className="rounded-2xl bg-gradient-to-b from-[#11182a] to-[#100d20] border border-emerald-500/20 overflow-hidden shadow-xl">
                  {/* Section Heading */}
                  <div className="p-5 md:p-6 border-b border-white/10 bg-emerald-500/[0.05]">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <CheckCircle2 size={20} />
                      </div>

                      <div>
                        <h3 className="text-sm font-extrabold text-white">
                          5. KPIs & Action Plan
                        </h3>
                        <p className="text-[11px] text-gray-400 mt-1">
                          Performance targets and recommended next steps
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-6 space-y-7">
                    {/* KPI Table */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp
                          size={16}
                          className="text-emerald-400"
                        />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          Key Performance Indicators
                        </h4>
                      </div>

                      {kpis.length > 0 ? (
                        <div className="overflow-x-auto rounded-xl border border-white/10">
                          <table className="w-full min-w-[540px] text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-white/[0.05] text-gray-400">
                                <th className="px-4 py-4 font-semibold">
                                  KPI Metric
                                </th>
                                <th className="px-4 py-4 font-semibold">
                                  Recommended Target
                                </th>
                                <th className="px-4 py-4 font-semibold">
                                  Measurement Method
                                </th>
                              </tr>
                            </thead>

                            <tbody className="divide-y divide-white/[0.08]">
                              {kpis.map((kpi, index) => (
                                <tr
                                  key={`${kpi.name || "kpi"}-${index}`}
                                  className="hover:bg-emerald-500/[0.035] transition-colors"
                                >
                                  <td className="px-4 py-4 align-top">
                                    <div className="font-semibold text-white leading-5">
                                      {formatInsight(kpi.name)}
                                    </div>
                                  </td>

                                  <td className="px-4 py-4 align-top">
                                    <span className="inline-block rounded-lg bg-emerald-500/10 border border-emerald-500/15 px-2.5 py-2 text-emerald-300 leading-5">
                                      {formatInsight(kpi.target)}
                                    </span>
                                  </td>

                                  <td className="px-4 py-4 align-top text-gray-400 leading-6">
                                    {formatInsight(kpi.measurement)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : legacyKpiSummary ? (
                        <div className="rounded-xl bg-white/[0.025] border border-white/10 p-4">
                          <p className="text-xs text-gray-300 leading-7 whitespace-pre-line">
                            {formatInsight(legacyKpiSummary)}
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-xl bg-white/[0.025] border border-white/10 p-4">
                          <p className="text-xs text-gray-400">
                            No structured KPI data was returned. Generate
                            the strategy again to receive KPI recommendations.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Plan */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2
                          size={16}
                          className="text-emerald-400"
                        />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          Immediate Execution Steps
                        </h4>
                      </div>

                      {actionPlan.length > 0 ? (
                        <div className="space-y-3">
                          {actionPlan.map((action, index) => (
                            <div
                              key={`${action.phase || "step"}-${index}`}
                              className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.025] border border-white/[0.08] hover:border-emerald-500/30 transition-colors"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300 text-xs font-bold">
                                {String(index + 1).padStart(2, "0")}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                                  {formatInsight(
                                    action.phase || `Step ${index + 1}`
                                  )}
                                </p>

                                <p className="text-gray-300 text-xs leading-6 whitespace-pre-line">
                                  {formatInsight(action.task)}
                                </p>
                              </div>

                              <ArrowRight
                                size={15}
                                className="text-gray-600 flex-shrink-0 mt-1"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        !legacyKpiSummary && (
                          <p className="text-xs text-gray-400 rounded-xl border border-white/10 p-4">
                            No action steps were returned.
                          </p>
                        )
                      )}
                    </div>

                    {!hasKpiContent && (
                      <p className="text-[11px] text-gray-500">
                        Try generating the strategy again if you need
                        structured KPIs and action steps.
                      </p>
                    )}
                  </div>
                </article>

                {/* Research Sources */}
                {sources.length > 0 && (
                  <article className="rounded-2xl bg-[#100d20] border border-white/10 p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Search size={16} className="text-orange-400" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        Market Research Sources
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {sources.map((source, index) => (
                        <a
                          key={`${source.url}-${index}`}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] p-3 hover:bg-white/[0.04] hover:border-orange-500/30 transition-colors"
                        >
                          <span className="text-xs text-gray-300 leading-5">
                            {source.title || "Market research source"}
                          </span>

                          <ExternalLink
                            size={14}
                            className="text-orange-400 flex-shrink-0"
                          />
                        </a>
                      ))}
                    </div>
                  </article>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default CampaignView;
