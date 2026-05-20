import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import MetricCard from "./components/MeritCard";
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
} from "lucide-react";

// Sample structural layout mock data
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

const Landing = () => {
  const selectedFeatures = useSelector(
    (state) => state.features.selectedFeatures,
  );
  const user = useSelector((state) => state.auth?.user) || { name: "John" };

  const hasAnyFeatures = selectedFeatures.length > 0;

  return (
    <div className="flex min-h-screen bg-[#0a051a]">
      {/* SaaS Navigation Panel */}
      <Sidebar />

      {/* Main App Workspace */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Good morning, {user.name} 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Here's what's happening with your business metrics today.
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
                You haven't activated any feature functional modules yet. Choose
                which toolsets you want enabled to configure graphs and visual
                tables.
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
          /* Conditional Metric Display Configurations rendering */
          <div className="space-y-8">
            {/* Row 1: Dashboard Analytics Metric Statistics Cards */}
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

            {/* Row 2: Comprehensive Tracking Layout Column Grids */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {selectedFeatures.includes("analytics") && (
                <div className="lg:col-span-2">
                  <AnalyticsView />
                </div>
              )}

              {(selectedFeatures.includes("crm") ||
                selectedFeatures.includes("funnels")) && (
                <div
                  className={
                    selectedFeatures.includes("analytics")
                      ? "lg:col-span-1"
                      : "lg:col-span-2"
                  }
                >
                  <RecentLeads leads={MOCK_LEADS} />
                </div>
              )}

              {selectedFeatures.includes("appointments") && (
                <div
                  className={
                    selectedFeatures.includes("analytics") &&
                    (selectedFeatures.includes("crm") ||
                      selectedFeatures.includes("funnels"))
                      ? "lg:col-span-3 grid grid-cols-1 lg:grid-cols-3"
                      : "lg:col-span-1"
                  }
                >
                  <div
                    className={
                      selectedFeatures.includes("analytics") &&
                      (selectedFeatures.includes("crm") ||
                        selectedFeatures.includes("funnels"))
                        ? "lg:col-span-1"
                        : "w-full"
                    }
                  >
                    <UpcomingAppointments appointments={MOCK_APPOINTMENTS} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
