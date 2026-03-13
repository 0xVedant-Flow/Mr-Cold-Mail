import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, FileText, Copy, Trash2, Edit2, Layout, 
  Sparkles, X, Loader2, CheckCircle2, AlertCircle, ChevronRight
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { cn } from '../components/DashboardLayout';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { Template } from '../types';
import { EMAIL_TEMPLATES } from '../constants';
import { generateEmailTemplate } from '../lib/gemini';
import { useNavigate } from 'react-router-dom';

export default function Templates() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    body: '',
    category: 'Sales'
  });
  const [aiPrompt, setAiPrompt] = useState('');

  const categories = ['All', 'Sales', 'Marketing', 'Business', 'Custom'];

  useEffect(() => {
    if (!user) return;

    fetchTemplates();

    const channel = supabase
      .channel('templates-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'templates', filter: `user_id=eq.${user.id}` },
        () => fetchTemplates()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (err) {
      console.error('Error fetching templates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setActionLoading(true);
    setError(null);

    try {
      if (editingTemplate) {
        const { error } = await supabase
          .from('templates')
          .update({
            name: formData.name,
            subject: formData.subject,
            body: formData.body,
            category: formData.category
          })
          .eq('id', editingTemplate.id);

        if (error) throw error;
        setSuccess('Template updated successfully');
      } else {
        const { error } = await supabase
          .from('templates')
          .insert([{
            user_id: user.id,
            name: formData.name,
            subject: formData.subject,
            body: formData.body,
            category: formData.category
          }]);

        if (error) throw error;
        setSuccess('Template created successfully');
      }

      setIsModalOpen(false);
      resetForm();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save template');
    } finally {
      setActionLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return;

    setActionLoading(true);
    setError(null);

    try {
      const result = await generateEmailTemplate(aiPrompt);
      setFormData({
        name: result.name,
        subject: result.subject,
        body: result.body,
        category: 'Custom'
      });
      setIsAIModalOpen(false);
      setIsModalOpen(true);
    } catch (err: any) {
      setError(err.message || 'Failed to generate template');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Template deleted');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError('Failed to delete template');
    }
  };

  const handleCopyTemplate = async (template: Template) => {
    try {
      const { error } = await supabase
        .from('templates')
        .insert([{
          user_id: user?.id,
          name: `${template.name} (Copy)`,
          subject: template.subject,
          body: template.body,
          category: template.category
        }]);

      if (error) throw error;
      setSuccess('Template duplicated');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError('Failed to copy template');
    }
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject,
      body: template.body,
      category: template.category
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingTemplate(null);
    setFormData({
      name: '',
      subject: '',
      body: '',
      category: 'Sales'
    });
    setAiPrompt('');
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           t.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [templates, searchQuery, activeCategory]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Templates</h1>
            <p className="text-slate-400">Save and reuse your best performing email templates.</p>
          </div>
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
          >
            <Plus className="w-5 h-5" />
            New Template
          </button>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">{error}</p>
              <button onClick={() => setError(null)} className="ml-auto"><X className="w-4 h-4" /></button>
            </motion.div>
          )}
          {success && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3 text-emerald-400"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <p className="text-sm">{success}</p>
              <button onClick={() => setSuccess(null)} className="ml-auto"><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1F2937] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap border",
                  activeCategory === cat 
                    ? "bg-blue-500/10 border-blue-500/50 text-blue-400" 
                    : "bg-[#1F2937] border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pre-made Templates */}
        <div className="space-y-6">
          <h2 className="text-xl font-heading font-bold text-white">Pre-made Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMAIL_TEMPLATES.map((template) => (
              <motion.div 
                key={template.id}
                whileHover={{ y: -5 }}
                className="bg-[#1F2937] border border-white/10 rounded-2xl p-6 flex flex-col group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">{template.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-3 flex-1 mb-6">{template.prompt}</p>
                <button 
                  onClick={() => {
                    setAiPrompt(template.prompt);
                    setIsAIModalOpen(true);
                  }}
                  className="w-full py-2 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-colors"
                >
                  Use Template
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Your Templates */}
        <h2 className="text-xl font-heading font-bold text-white">Your Templates</h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-slate-400">Loading your templates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Generator Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              onClick={() => setIsAIModalOpen(true)}
              className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">AI Template Generator</h3>
                <p className="text-sm text-slate-400 mb-6">Describe your goal and let AI craft a perfect template for you.</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-400 transition-colors">
                Generate with AI
              </button>
            </motion.div>

            {filteredTemplates.map((template, idx) => (
              <motion.div 
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#1F2937] border border-white/10 rounded-2xl p-6 flex flex-col group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleEditTemplate(template)}
                      className="p-1.5 text-slate-500 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleCopyTemplate(template)}
                      className="p-1.5 text-slate-500 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-1">{template.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                    {template.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Layout className="w-3 h-3" /> Used {template.usage_count || 0} times
                  </span>
                </div>
                <p className="text-sm text-slate-400 line-clamp-2 flex-1">{template.subject}</p>
                <button 
                  onClick={() => navigate('/generate', { state: { template } })}
                  className="mt-6 w-full py-2 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  Use Template
                </button>
              </motion.div>
            ))}

            {filteredTemplates.length === 0 && searchQuery && (
              <div className="col-span-full py-20 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">No templates found</h3>
                <p className="text-slate-400">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        )}

        {/* Create/Edit Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-heading font-bold text-white">
                    {editingTemplate ? 'Edit Template' : 'Create New Template'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSaveTemplate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Template Name</label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Initial Outreach"
                        className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Category</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      >
                        {categories.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Subject Line</label>
                    <input 
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Email subject..."
                      className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-400">Email Body</label>
                      <span className="text-[10px] text-slate-500">Use [Name], [Company], [Role] as placeholders</span>
                    </div>
                    <textarea 
                      required
                      rows={8}
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      placeholder="Write your email template here..."
                      className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={actionLoading}
                      className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {editingTemplate ? 'Update Template' : 'Create Template'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* AI Generate Modal */}
        <AnimatePresence>
          {isAIModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAIModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-white">AI Generator</h2>
                  </div>
                  <button onClick={() => setIsAIModalOpen(false)} className="p-2 text-slate-400 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">What's your goal?</label>
                    <textarea 
                      rows={4}
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g., Write a cold email to SaaS founders about a new marketing automation tool. Keep it short and witty."
                      className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                    />
                  </div>

                  <button 
                    onClick={handleGenerateAI}
                    disabled={actionLoading || !aiPrompt.trim()}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {actionLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        AI is writing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Template
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
