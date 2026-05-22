import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import MetricCard from "./components/MeritCard"; // Verify spelling matches your file layout
import RecentLeads from "./components/RecentLeads";
import UpcomingAppointments from "./components/UpcomingAppointments";
import AnalyticsView from "./components/AnalyticsView";
import {
  Users,
  Calendar,
  Mail,
  BarChart3,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Globe,
  Layers,
  DollarSign,
} from "lucide-react";

// Sample structural dummy dataset values
const MOCK_LEADS = [
  { name: "Sarah Johnson", email: "sarah@example.com", source: "Landing Page" },
  { name: "Mike Chen", email: "mike@studio.com", source: "Referral" },
  { name: "Emma Wilson", email: "emma@design.co", source: "Facebook Ad" },
];

const MOCK_APPOINTMENTS = [
  {
    name: "Lisa Park",
    type: "Strategy Call",
    time: "Today, 2:00 PM",
    status: "confirmed",
  },
  {
    name: "Tom Davis",
    type: "Consultation",
    time: "Today, 4:30 PM",
    status: "pending",
  },
];

const MOCK_DEALS = [
  {
    name: "Solo - Zylken Studio",
    amount: "$30,000.00",
    stage: "Closed Won",
    color: "text-emerald-400",
  },
  {
    name: "Altair Enterprises",
    amount: "$400,000.00",
    stage: "Qualification",
    color: "text-blue-400",
  },
];

const Landing = () => {
  // FIXED: Added local layout state toggle parameter for the collapsible sidebar option
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const selectedFeatures =
    useSelector((state) => state.features?.selectedFeatures) || [];
  const user = useSelector((state) => state.auth?.user) || { name: "User" };

  const hasAnyFeatures = selectedFeatures.length > 0;

  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white overflow-hidden">
      {/* SIDEBAR COMPONENT LINKED WITH STATE TOGGLE PROPS */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main App Dashboard Content Space */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto transition-all duration-300">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Good morning, {user.name} 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Here's what's happening across your active business nodes today.
          </p>
        </div>

        {!hasAnyFeatures ? (
          /* Empty Workspace Safe Guard Fallback State */
          <div className="border border-dashed border-white/10 rounded-3xl p-12 text-center bg-white/[0.01] max-w-2xl mx-auto mt-12 space-y-6 shadow-xl">
            <div className="w-16 h-16 bg-orange-600/10 text-orange-500 rounded-full flex items-center justify-center mx-auto">
              <HelpCircle size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Your Workspace is Empty
              </h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                You haven't activated any feature functionalities yet. Select
                toolsets to populate metrics dashboards.
              </p>
            </div>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-600/10 mx-auto"
            >
              Select Core Features <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          /* Dynamic Metrics Workspaces Blocks Grid Render */
          <div className="space-y-8">
            {/* ROW 1: UPPER STATS METRIC CARDS TRACKER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {selectedFeatures.includes("crm") && (
                <MetricCard
                  title="New Leads"
                  value="24"
                  change="+12% this week"
                  changeType="positive"
                  icon={Users}
                  iconBg="bg-teal-500/20 text-teal-400"
                />
              )}
              {selectedFeatures.includes("appointments") && (
                <MetricCard
                  title="Appointments"
                  value="8"
                  change="3 today"
                  changeType="neutral"
                  icon={Calendar}
                  iconBg="bg-blue-500/20 text-blue-400"
                />
              )}
              {selectedFeatures.includes("email_marketing") && (
                <MetricCard
                  title="Emails Sent"
                  value="156"
                  change="+8% vs last week"
                  changeType="positive"
                  icon={Mail}
                  iconBg="bg-orange-500/20 text-orange-400"
                />
              )}
              {selectedFeatures.includes("analytics") && (
                <MetricCard
                  title="Conversion"
                  value="32%"
                  change="+5% improvement"
                  changeType="positive"
                  icon={BarChart3}
                  iconBg="bg-emerald-500/20 text-emerald-400"
                />
              )}
            </div>

            {/* ROW 2: INTEGRATED ANALYTICS VISUALIZER AND DATA SCAPING LOGS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {selectedFeatures.includes("analytics") && (
                <div className="lg:col-span-2">
                  <AnalyticsView />
                </div>
              )}

              {/* FEATURE 8: Autonomous External Data Scraping Micro-widget card */}
              {selectedFeatures.includes("scraping") && (
                <div
                  className={
                    selectedFeatures.includes("analytics")
                      ? "lg:col-span-1"
                      : "lg:col-span-3"
                  }
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md h-full space-y-4">
                    <div className="flex items-center gap-2 text-gray-400 border-b border-white/5 pb-3">
                      <Globe size={18} className="text-blue-400" />
                      <h3 className="font-bold text-sm text-white">
                        Competitor Scraping Signals
                      </h3>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <span className="text-blue-400 font-semibold block text-[10px] uppercase">
                          Scraped Target: Altair-Estates
                        </span>
                        <p className="text-gray-300 mt-1">
                          Identified pricing change drop to $299.00/mo package
                          tier structural index.
                        </p>
                      </div>
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <span className="text-purple-400 font-semibold block text-[10px] uppercase">
                          Scraped Target: Pangea-Systems
                        </span>
                        <p className="text-gray-300 mt-1">
                          Active promotional code active tag matched: "SUMMER10"
                          discount links.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 3: RECENT LEADS, ACTIVE DEALS PIPELINE, & SCHEDULE BREAKDOWNS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedFeatures.includes("crm") ||
                selectedFeatures.includes("funnels")) && (
                <RecentLeads leads={MOCK_LEADS} />
              )}

              {/* NEW MODULE ADDED: Zoho CRM Style Financial Deal Tracker Pipeline Widget */}
              {selectedFeatures.includes("crm") && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                      <DollarSign size={18} className="text-emerald-500" />{" "}
                      Active Deals
                    </h3>
                    <Link
                      to="/deals"
                      className="text-orange-500 hover:text-orange-400 text-xs font-semibold"
                    >
                      View Pipeline →
                    </Link>
                  </div>
                  <div className="space-y-3.5">
                    {MOCK_DEALS.map((deal, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">
                            {deal.name}
                          </p>
                          <span
                            className={`text-[10px] font-medium block mt-0.5 ${deal.color}`}
                          >
                            {deal.stage}
                          </span>
                        </div>
                        <span className="font-mono text-sm font-semibold text-gray-300">
                          {deal.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedFeatures.includes("appointments") && (
                <UpcomingAppointments appointments={MOCK_APPOINTMENTS} />
              )}
            </div>

            {/* ROW 4: FEATURE 7: Self-Optimizing Campaign Suggestions Optimization Alert banner widget */}
            {selectedFeatures.includes("suggestions") && (
              <div className="bg-gradient-to-r from-purple-900/30 via-orange-950/20 to-transparent border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-orange-600/10 text-orange-400 rounded-xl">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      Campaign Suggestion Flag Generated
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Email Engine conversion is performing 14.5% higher than
                      Landing Pages traffic routing. Shift budget
                      configurations.
                    </p>
                  </div>
                </div>
                <Link
                  to="/campaign-suggestions"
                  className="bg-white/5 hover:bg-orange-600 hover:text-white text-orange-400 font-semibold px-4 py-2 rounded-xl text-xs border border-white/10 hover:border-transparent transition-all whitespace-nowrap self-end sm:self-auto"
                >
                  Run Tavily Search Analysis
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
