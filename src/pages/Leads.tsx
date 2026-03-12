import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Search, Filter, MoreVertical, Edit2, Trash2, Mail } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const INITIAL_LEADS = [
  { id: 1, name: 'Sarah Connor', company: 'Cyberdyne', role: 'VP of Engineering', website: 'cyberdyne.com', email: 'sarah@cyberdyne.com' },
  { id: 2, name: 'John Smith', company: 'Acme Corp', role: 'CEO', website: 'acme.co', email: 'john@acme.co' },
  { id: 3, name: 'Emily Chen', company: 'TechFlow', role: 'Director of Sales', website: 'techflow.io', email: 'emily@techflow.io' },
  { id: 4, name: 'Michael Ross', company: 'Pearson Specter', role: 'Managing Partner', website: 'pearsonspecter.com', email: 'm.ross@pearsonspecter.com' },
  { id: 5, name: 'Rachel Zane', company: 'Pearson Specter', role: 'Associate', website: 'pearsonspecter.com', email: 'r.zane@pearsonspecter.com' },
];

export default function Leads() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Leads</h1>
            <p className="text-slate-400">Manage your contacts and upload new lead lists.</p>
          </div>
          <button 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
          >
            <Upload className="w-5 h-5" />
            Upload CSV
          </button>
        </div>

        <div className="bg-[#1F2937] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search leads by name, company, or email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111827] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111827] border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="text-xs text-slate-500 uppercase bg-[#111827]/50 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Company</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Website</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead, idx) => (
                  <motion.tr 
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs uppercase">
                        {lead.name.charAt(0)}
                      </div>
                      {lead.name}
                    </td>
                    <td className="px-6 py-4">
                      {lead.company}
                    </td>
                    <td className="px-6 py-4">
                      {lead.role}
                    </td>
                    <td className="px-6 py-4">
                      <a href={`https://${lead.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        {lead.website}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-500" />
                        {lead.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filteredLeads.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No leads found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
