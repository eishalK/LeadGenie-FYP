// src/pages/Dashboard/DealsView.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Loader2,
  UserCheck,
} from "lucide-react";

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
  const [deals, setDeals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    name: "",
    amount: "",
    stage: "Qualification",
    account: "",
    revenue: "",
  });

  const user = useSelector((state) => state.auth?.user) || { name: "Owner" };
  const dropdownRef = useRef(null);

  // Stage classification tabs
  const tabs = [
    "All Deals",
    "In Pipeline",
    "Qualification",
    "Needs Analysis",
    "Negotiation",
    "Closed Won",
    "Closed Lost",
  ];

  // Fetch Deals & Customer Contacts
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const [dealsRes, customersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/deals", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/customers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setDeals(dealsRes.data);
      setCustomers(customersRes.data);
    } catch (err) {
      console.error("Error loading deals/customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // When a user selects a customer from the dropdown, autofill name & account
  const handleCustomerSelect = (customerId) => {
    const selected = customers.find((c) => c._id === customerId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        customerId: selected._id,
        account: selected.company || selected.name,
        name: prev.name || `${selected.name} - Deal`,
      }));
    } else {
      setFormData((prev) => ({ ...prev, customerId: "" }));
    }
  };

  // Inline Stage Update
  const handleStageChange = async (dealId, newStage) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/deals/${dealId}/stage`,
        { stage: newStage },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setDeals((prev) => prev.map((d) => (d._id === dealId ? res.data : d)));
      setActiveDropdownId(null);
    } catch (err) {
      console.error("Failed to update stage:", err);
    }
  };

  // Submit Deal
  const handleCreateDeal = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      setSubmitting(true);
      const res = await axios.post(
        "http://localhost:5000/api/deals",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setDeals((prev) => [res.data, ...prev]);
      setIsModalOpen(false);
      setFormData({
        customerId: "",
        name: "",
        amount: "",
        stage: "Qualification",
        account: "",
        revenue: "",
      });
    } catch (err) {
      console.error("Failed to create deal:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Stage classification filtering
  const filteredDeals = deals.filter((deal) => {
    const dealName = deal.name || "";
    const customerName = deal.customerId?.name || "";
    const accountName = deal.account || "";
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      dealName.toLowerCase().includes(query) ||
      customerName.toLowerCase().includes(query) ||
      accountName.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    switch (activeTab) {
      case "In Pipeline":
        return deal.stage !== "Closed Won" && deal.stage !== "Closed Lost";
      case "Qualification":
      case "Needs Analysis":
      case "Negotiation":
      case "Closed Won":
      case "Closed Lost":
        return deal.stage === activeTab;
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Deals Pipeline
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Classify active deals by stage and track conversion value.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-orange-600/10 cursor-pointer"
          >
            <Plus size={16} /> Create Deal
          </button>
        </div>

        {/* Stage Classification Tabs */}
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

        {/* Toolbar */}
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
              placeholder="Search deals, contacts, accounts..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs outline-none text-white focus:border-orange-500/50"
            />
          </div>
        </div>

        {/* Table */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-visible shadow-2xl">
          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/10 text-gray-400 text-xs font-semibold tracking-wider">
                  <th className="py-4 px-5 w-4">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="py-4 px-5">Deal Name</th>
                  <th className="py-4 px-5">Client Contact</th>
                  <th className="py-4 px-5">Amount</th>
                  <th className="py-4 px-5">Stage Status</th>
                  <th className="py-4 px-5">Account</th>
                  <th className="py-4 px-5 text-right">Expected Revenue</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-white/5 text-gray-300">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2
                          className="animate-spin text-orange-500"
                          size={18}
                        />
                        <span>Loading pipeline data...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredDeals.length > 0 ? (
                  filteredDeals.map((deal) => (
                    <tr
                      key={deal._id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-4 px-5">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="py-4 px-5 font-semibold text-white group-hover:text-orange-400 transition-colors">
                        {deal.name}
                      </td>
                      <td className="py-4 px-5 text-gray-300">
                        <div className="flex items-center gap-2">
                          <UserCheck size={13} className="text-orange-400" />
                          <span>
                            {deal.customerId?.name || "Contact not linked"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-5 font-mono">
                        ${Number(deal.amount || 0).toLocaleString()}
                      </td>

                      {/* Dropdown for Stage */}
                      <td className="py-4 px-5 relative overflow-visible">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownId(
                              activeDropdownId === deal._id ? null : deal._id,
                            );
                          }}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95 ${
                            STAGE_CONFIGS[deal.stage] ||
                            "bg-white/5 text-white border-white/10"
                          }`}
                        >
                          {deal.stage}
                          <ChevronDown size={10} className="opacity-60" />
                        </button>

                        {activeDropdownId === deal._id && (
                          <div
                            ref={dropdownRef}
                            className="absolute z-50 left-5 mt-2 w-44 bg-[#130d2a] border border-white/10 rounded-xl shadow-2xl p-1.5"
                          >
                            {Object.keys(STAGE_CONFIGS).map((stageOption) => (
                              <button
                                key={stageOption}
                                onClick={() =>
                                  handleStageChange(deal._id, stageOption)
                                }
                                className={`w-full text-left px-3 py-2 text-[11px] rounded-lg transition-colors hover:bg-white/5 cursor-pointer ${
                                  deal.stage === stageOption
                                    ? "text-orange-400 font-semibold bg-orange-500/5"
                                    : "text-gray-300"
                                }`}
                              >
                                {stageOption}
                              </button>
                            ))}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-5 text-gray-400">
                        {deal.account || deal.customerId?.company || "—"}
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-white font-semibold">
                        $
                        {Number(
                          deal.revenue || deal.amount || 0,
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-12 text-center text-gray-500 font-medium"
                    >
                      No deals found in this stage. Click "Create Deal" to add
                      one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Metrics */}
          <div className="bg-white/[0.01] border-t border-white/5 px-6 py-4 flex items-center justify-between text-xs text-gray-400">
            <span>
              Total Visible in {activeTab}:{" "}
              <strong className="text-white">{filteredDeals.length}</strong>
            </span>
            <div className="flex items-center gap-4">
              <span>
                1 to {filteredDeals.length} of {filteredDeals.length}
              </span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded bg-white/5 border border-white/10 opacity-50 cursor-not-allowed">
                  <ChevronLeft size={14} />
                </button>
                <button className="p-1 rounded bg-white/5 border border-white/10 opacity-50 cursor-not-allowed">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Select Contact & Create Deal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#120b24] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <h3 className="text-lg font-bold text-white">
                  Create New Deal
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateDeal} className="space-y-4 text-xs">
                {/* Contact Selection Dropdown */}
                <div>
                  <label className="text-gray-400 block mb-1">
                    Select Customer / Contact *
                  </label>
                  <select
                    required
                    value={formData.customerId}
                    onChange={(e) => handleCustomerSelect(e.target.value)}
                    className="w-full bg-[#1b1236] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-orange-500"
                  >
                    <option value="">
                      -- Choose from your CRM contacts --
                    </option>
                    {customers.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} {c.company ? `(${c.company})` : ""} - {c.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">
                    Deal Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Website Revamp Contract"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 block mb-1">
                      Amount ($) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="5000"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">
                      Initial Stage
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) =>
                        setFormData({ ...formData, stage: e.target.value })
                      }
                      className="w-full bg-[#1b1236] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-orange-500"
                    >
                      {Object.keys(STAGE_CONFIGS).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">
                    Account / Company
                  </label>
                  <input
                    type="text"
                    placeholder="Autofilled from contact or enter company"
                    value={formData.account}
                    onChange={(e) =>
                      setFormData({ ...formData, account: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">
                    Expected Revenue ($)
                  </label>
                  <input
                    type="number"
                    placeholder="Leave empty to match amount"
                    value={formData.revenue}
                    onChange={(e) =>
                      setFormData({ ...formData, revenue: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    {submitting && (
                      <Loader2 className="animate-spin" size={14} />
                    )}
                    Save Deal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealsView;
