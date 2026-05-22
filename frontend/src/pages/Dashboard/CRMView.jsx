import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Search, Plus, Filter } from 'lucide-react';

const MOCK_CONTACTS = [
  { name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 555-0101", status: "Customer", statusBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", source: "Landing Page", date: "Today" },
  { name: "Mike Chen", email: "mike@studio.com", phone: "+1 555-0102", status: "Lead", statusBg: "bg-blue-500/10 text-blue-400 border-blue-500/20", source: "Referral", date: "Yesterday" },
  { name: "Emma Wilson", email: "emma@design.co", phone: "+1 555-0103", status: "Prospect", statusBg: "bg-amber-500/10 text-amber-400 border-amber-500/20", source: "Facebook Ad", date: "3 days ago" },
  { name: "James Brown", email: "james@corp.io", phone: "+1 555-0104", status: "Customer", statusBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", source: "Organic", date: "1 week ago" },
];

const CRMView = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#0a051a] text-white">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Contacts Management</h1>
            <p className="text-gray-400 text-xs mt-1">Central client index directory tracking real-time data.</p>
          </div>
          <button className="bg-orange-600 hover:bg-orange-500 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-600/10"><Plus size={14} /> Add Contact</button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/10 text-gray-400 font-semibold">
                <th className="p-4 pl-6">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Source</th>
                <th className="p-4 text-right pr-6">Last Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {MOCK_CONTACTS.map((c, i) => (
                <tr key={i} className="hover:bg-white/[0.01]">
                  <td className="p-4 pl-6 font-medium text-white">
                    <div>{c.name}</div>
                    <div className="text-[10px] text-gray-400 font-normal">{c.email}</div>
                  </td>
                  <td className="p-4 font-mono text-gray-400">{c.phone}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${c.statusBg}`}>{c.status}</span>
                  </td>
                  <td className="p-4 text-gray-400">{c.source}</td>
                  <td className="p-4 text-right pr-6 text-gray-400">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CRMView;