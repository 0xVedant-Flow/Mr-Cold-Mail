import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, Upload, Download, MoreHorizontal, Mail, 
  ExternalLink, Trash2, Filter, Users, Loader2, X, 
  CheckCircle2, AlertCircle, FileText
} from 'lucide-react';
import Papa from 'papaparse';
import DashboardLayout from '../components/DashboardLayout';
import { cn } from '../components/DashboardLayout';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { Lead } from '../types';

export default function Leads() {
  const { user } = useAuthStore();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New lead form state
  const [newLead, setNewLead] = useState({
    name: '',
    role: '',
    company: '',
    industry: '',
    email: '',
    status: 'New' as Lead['status']
  });

  useEffect(() => {
    if (!user) return;

    fetchLeads();

    // Set up real-time subscription
    const channel = supabase
      .channel('leads-page-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      setError('Failed to load leads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setActionLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([{ ...newLead, user_id: user.id }])
        .select();

      if (error) throw error;
      
      setLeads([data[0], ...leads]);
      setIsAddModalOpen(false);
      setNewLead({
        name: '',
        role: '',
        company: '',
        industry: '',
        email: '',
        status: 'New'
      });
      setSuccess('Lead added successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLeads(leads.filter(l => l.id !== id));
      setSuccess('Lead deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError('Failed to delete lead');
    }
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setError(null);
    setActionLoading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: (header) => header.trim().toLowerCase().replace(/\s+/g, '_'),
      transform: (value) => value.trim(),
      complete: async (results) => {
        try {
          const parsedLeads = results.data.map((row: any) => {
            const normalizedRow: any = {};
            Object.keys(row).forEach(key => {
              normalizedRow[key.toLowerCase().replace(/\s+/g, '_')] = row[key];
            });

            return {
              user_id: user.id,
              name: normalizedRow.name || normalizedRow.full_name || normalizedRow.fullname || '',
              role: normalizedRow.role || normalizedRow.position || normalizedRow.title || '',
              company: normalizedRow.company || normalizedRow.organization || '',
              industry: normalizedRow.industry || normalizedRow.sector || '',
              email: normalizedRow.email || normalizedRow.e_mail || normalizedRow.email_address || '',
              status: 'New'
            };
          }).filter((l: any) => l.email && l.name);

          if (parsedLeads.length === 0) {
            throw new Error('No valid leads found. Please ensure your CSV has "name" and "email" columns.');
          }

          const { data, error: supabaseError } = await supabase
            .from('leads')
            .insert(parsedLeads)
            .select();

          if (supabaseError) throw supabaseError;
          
          setLeads([...(data || []), ...leads]);
          setIsImportModalOpen(false);
          setSuccess(`Successfully imported ${parsedLeads.length} leads!`);
          setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
          console.error('Import error:', err);
          setError(err.message || 'Failed to import leads. Please check your CSV format.');
        } finally {
          setActionLoading(false);
          if (e.target) e.target.value = '';
        }
      },
      error: (error) => {
        console.error('Papa Parse error:', error);
        setError('Failed to parse CSV file.');
        setActionLoading(false);
        if (e.target) e.target.value = '';
      }
    });
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(leads.map(({ id, user_id, created_at, ...rest }) => rest));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    contacted: leads.filter(l => l.status === 'Contacted').length,
    replied: leads.filter(l => l.status === 'Replied').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Leads</h1>
            <p className="text-slate-400">Manage your prospects and their contact information.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Import CSV
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Lead
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Leads', value: stats.total.toLocaleString(), icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'New', value: stats.new.toLocaleString(), icon: Plus, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Contacted', value: stats.contacted.toLocaleString(), icon: Mail, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { label: 'Replied', value: stats.replied.toLocaleString(), icon: ExternalLink, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#1F2937] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-heading font-bold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Messages */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5" />
              {error}
              <button onClick={() => setError(null)} className="ml-auto"><X className="w-4 h-4" /></button>
            </motion.div>
          )}
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-[#1F2937] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                Filter
              </button>
              <button 
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111827] border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 flex flex-col items-center justify-center text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
                <p>Loading leads...</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="text-xs text-slate-500 uppercase bg-[#111827]/50 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Company</th>
                    <th className="px-6 py-4 font-medium">Industry</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Status</th>
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
                      <td className="px-6 py-4">
                        <Link to={`/leads/${lead.id}`} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-white hover:text-blue-400 transition-colors">{lead.name}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{lead.role}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {lead.company}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] uppercase tracking-wider font-bold">
                          {lead.industry}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {lead.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium border",
                          lead.status === 'New' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                          lead.status === 'Contacted' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                          lead.status === 'Replied' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          "bg-slate-500/10 text-slate-400 border-slate-500/20"
                        )}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
            {!loading && filteredLeads.length === 0 && (
              <div className="p-12 text-center text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No leads found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Lead Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold text-white">Add New Lead</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-500 hover:text-white"><X /></button>
              </div>
              <form onSubmit={handleAddLead} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={newLead.name}
                      onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                      className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={newLead.email}
                      onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                      className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Company</label>
                    <input 
                      type="text" 
                      required
                      value={newLead.company}
                      onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                      className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Acme Inc"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Role</label>
                    <input 
                      type="text" 
                      required
                      value={newLead.role}
                      onChange={(e) => setNewLead({...newLead, role: e.target.value})}
                      className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="CEO"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Industry</label>
                  <input 
                    type="text" 
                    required
                    value={newLead.industry}
                    onChange={(e) => setNewLead({...newLead, industry: e.target.value})}
                    className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="SaaS / Technology"
                  />
                </div>
                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={actionLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all disabled:opacity-50"
                  >
                    {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                    Add Lead
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Import Modal */}
      <AnimatePresence>
        {isImportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImportModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold text-white">Import Leads</h2>
                <button onClick={() => setIsImportModalOpen(false)} className="text-slate-500 hover:text-white"><X /></button>
              </div>
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-6">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Upload CSV File</h3>
                <p className="text-slate-400 text-sm mb-8">
                  Your CSV should have columns for <b>name</b>, <b>email</b>, <b>company</b>, <b>role</b>, and <b>industry</b>.
                </p>
                
                <input 
                  type="file" 
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleImportCSV}
                  className="hidden"
                />
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={actionLoading}
                  className="w-full py-4 rounded-xl border-2 border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 text-slate-300 hover:text-blue-400 transition-all flex flex-col items-center gap-2"
                >
                  {actionLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6" />
                      <span className="font-medium">Click to select CSV</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
