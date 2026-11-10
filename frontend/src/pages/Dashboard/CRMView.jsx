// src/pages/Dashboard/CRMView.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  Mail,
  Phone,
  Building2,
  FileText,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CRMView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State for Manual Customer Entry
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  // Fetch logged-in user's customers from MongoDB
  const fetchCustomers = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/customers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Save manual customer to database
  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      setSubmitting(true);
      const res = await axios.post(
        "http://localhost:5000/api/customers",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCustomers((prev) => [res.data, ...prev]);
      setIsModalOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        notes: "",
      });
    } catch (err) {
      console.error("Failed to add customer:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Filter contacts by name, email, or company
  const filteredCustomers = customers.filter((customer) => {
    const name = customer.name || "";
    const email = customer.email || "";
    const company = customer.company || "";
    const query = searchQuery.toLowerCase();

    return (
      name.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query) ||
      company.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white overflow-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header Space */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">CRM Directory</h1>
            <p className="text-gray-400 text-xs mt-1">
              Store, view, and organize your client contact profiles.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-orange-600/10 self-start sm:self-auto cursor-pointer"
          >
            <Plus size={16} /> Add Customer
          </button>
        </div>

        {/* Toolbar & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-300 hover:text-white cursor-pointer">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-300 hover:text-white cursor-pointer">
              <ArrowUpDown size={14} /> Sort
            </button>
          </div>
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, company..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs outline-none text-white focus:border-orange-500/50"
            />
          </div>
        </div>

        {/* CRM Customers Table */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/10 text-gray-400 text-xs font-semibold tracking-wider">
                  <th className="py-4 px-5 w-4">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="py-4 px-5">Name</th>
                  <th className="py-4 px-5">Email</th>
                  <th className="py-4 px-5">Phone Number</th>
                  <th className="py-4 px-5">Company</th>
                  <th className="py-4 px-5">Notes</th>
                  <th className="py-4 px-5 text-right">Created Date</th>
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
                        <span>Loading contact profiles...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-4 px-5">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="py-4 px-5 font-semibold text-white group-hover:text-orange-400 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                            {customer.name
                              ? customer.name[0].toUpperCase()
                              : "C"}
                          </div>
                          <span>{customer.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-gray-300">
                        {customer.email ? (
                          <div className="flex items-center gap-1.5">
                            <Mail size={12} className="text-gray-500" />
                            <span>{customer.email}</span>
                          </div>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-gray-300">
                        {customer.phone ? (
                          <div className="flex items-center gap-1.5">
                            <Phone size={12} className="text-gray-500" />
                            <span>{customer.phone}</span>
                          </div>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-gray-300">
                        {customer.company ? (
                          <div className="flex items-center gap-1.5">
                            <Building2 size={12} className="text-gray-500" />
                            <span>{customer.company}</span>
                          </div>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-gray-400 max-w-[200px] truncate">
                        {customer.notes ? (
                          <div
                            className="flex items-center gap-1.5"
                            title={customer.notes}
                          >
                            <FileText
                              size={12}
                              className="text-gray-500 shrink-0"
                            />
                            <span className="truncate">{customer.notes}</span>
                          </div>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-right text-gray-500">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-12 text-center text-gray-500 font-medium"
                    >
                      No contacts found. Click "Add Customer" to manually add
                      your first lead.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Metrics */}
          <div className="bg-white/[0.01] border-t border-white/5 px-6 py-4 flex items-center justify-between text-xs text-gray-400">
            <span>
              Total Contacts:{" "}
              <strong className="text-white">{filteredCustomers.length}</strong>
            </span>
            <div className="flex items-center gap-4">
              <span>
                1 to {filteredCustomers.length} of {filteredCustomers.length}
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

        {/* Modal: Manual Customer Creation */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#120b24] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <h3 className="text-lg font-bold text-white">
                  Add New Customer
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <form
                onSubmit={handleCreateCustomer}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="text-gray-400 block mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 block mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="client@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Design Agency"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Initial consultation summary, requirements, etc."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-orange-500 resize-none"
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
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {submitting && (
                      <Loader2 className="animate-spin" size={14} />
                    )}
                    Save Customer
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

export default CRMView;
