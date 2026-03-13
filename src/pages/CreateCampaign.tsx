import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UploadCloud, Check, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

import DashboardLayout from '../components/DashboardLayout';

export default function CreateCampaign() {
  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleCreateCampaign = async () => {
    if (!campaignName.trim()) {
      setError('Please enter a campaign name');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const { data, error: insertError } = await supabase
        .from('campaigns')
        .insert([
          { 
            name: campaignName, 
            user_id: user?.id,
            status: 'Draft',
            leads_count: 12, // Simulated for now
            generated_count: 0
          }
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // Simulate lead insertion for the preview
      const leads = [
        { name: 'Sarah Jenkins', email: 'sarah@nexustech.io', company: 'Nexus Tech', role: 'CMO', campaign_id: data.id, user_id: user?.id },
        { name: 'Marcus Thorne', email: 'm.thorne@innovate.com', company: 'Innovate Co', role: 'Founder', campaign_id: data.id, user_id: user?.id },
        { name: 'Leila Chen', email: 'leila@chencreative.com', company: 'Chen Creative', role: 'Head of Growth', campaign_id: data.id, user_id: user?.id }
      ];

      const { error: leadsError } = await supabase
        .from('leads')
        .insert(leads);

      if (leadsError) throw leadsError;

      navigate('/campaigns');
    } catch (err: any) {
      console.error('Error creating campaign:', err);
      setError(err.message || 'Failed to create campaign');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8">
        {/* StepIndicator */}
        <div className="mb-12 flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 -z-10"></div>
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 -z-10 transition-all duration-500"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          ></div>
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-[#0B0F1A] transition-colors ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-[#1F2937] border-2 border-white/10 text-slate-500'}`}>
              {step > 1 ? <Check className="w-6 h-6" /> : <span className="font-bold">1</span>}
            </div>
            <span className={`mt-2 text-sm font-medium ${step >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>Setup</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-[#0B0F1A] transition-colors ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-[#1F2937] border-2 border-white/10 text-slate-500'}`}>
              {step > 2 ? <Check className="w-6 h-6" /> : <span className="font-bold">2</span>}
            </div>
            <span className={`mt-2 text-sm font-medium ${step >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>Upload</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-[#0B0F1A] transition-colors ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-[#1F2937] border-2 border-white/10 text-slate-500'}`}>
              <span className="font-bold">3</span>
            </div>
            <span className={`mt-2 text-sm font-medium ${step >= 3 ? 'text-blue-400' : 'text-slate-500'}`}>Confirm</span>
          </div>
        </div>

        {/* WizardCard */}
        <div className="bg-[#1F2937] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-heading font-bold text-white mb-2">Name your campaign</h1>
                  <p className="text-slate-400 mb-6">Give your campaign a descriptive name to keep track of your outreach.</p>
                  <input 
                    type="text" 
                    placeholder="e.g. Q4 SaaS Founders Outreach"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="text-2xl font-heading font-bold text-white mb-2">Import your leads</h1>
                <p className="text-slate-400 mb-8">Upload your CSV file to populate your campaign with prospects.</p>
                
                <div 
                  className="relative group"
                  onClick={() => {
                    setIsUploading(true);
                    setTimeout(() => {
                      setIsUploading(false);
                      setStep(3);
                    }, 1500);
                  }}
                >
                  <div className="border-2 border-dashed border-white/10 group-hover:border-blue-500/50 transition-colors rounded-xl p-12 flex flex-col items-center justify-center bg-[#111827]/50 cursor-pointer">
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                        <p className="text-white font-medium">Processing CSV...</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 mb-4 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                          <UploadCloud className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">Drag your CSV here</h3>
                        <p className="text-slate-500 text-sm mb-6">or click to browse from your computer</p>
                        <button className="text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500/10 transition-colors">
                          Download Template CSV
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Preview Parsed Data</h4>
                  <div className="flex items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                    <span className="text-emerald-500 text-xs font-bold uppercase tracking-tight">3 valid leads ready</span>
                  </div>
                </div>
                
                <div className="overflow-hidden border border-white/10 rounded-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#111827]/50 border-b border-white/10">
                        <tr>
                          <th className="px-4 py-3 font-medium text-slate-400">Name</th>
                          <th className="px-4 py-3 font-medium text-slate-400">Email</th>
                          <th className="px-4 py-3 font-medium text-slate-400">Company</th>
                          <th className="px-4 py-3 font-medium text-slate-400">Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr>
                          <td className="px-4 py-3 text-slate-200">Sarah Jenkins</td>
                          <td className="px-4 py-3 text-slate-400">sarah@nexustech.io</td>
                          <td className="px-4 py-3 text-slate-400">Nexus Tech</td>
                          <td className="px-4 py-3 text-slate-400">CMO</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-200">Marcus Thorne</td>
                          <td className="px-4 py-3 text-slate-400">m.thorne@innovate.com</td>
                          <td className="px-4 py-3 text-slate-400">Innovate Co</td>
                          <td className="px-4 py-3 text-slate-400">Founder</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-slate-200">Leila Chen</td>
                          <td className="px-4 py-3 text-slate-400">leila@chencreative.com</td>
                          <td className="px-4 py-3 text-slate-400">Chen Creative</td>
                          <td className="px-4 py-3 text-slate-400">Head of Growth</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>
          
          {/* WizardFooter */}
          <div className="bg-[#111827]/50 px-8 py-6 flex justify-between items-center border-t border-white/10">
            <button 
              onClick={() => step > 1 ? setStep(step - 1) : navigate('/campaigns')}
              className="flex items-center gap-2 text-slate-400 font-medium hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            
            {step === 1 && (
              <button 
                onClick={() => campaignName.trim() ? setStep(2) : setError('Please enter a campaign name')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-10 rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Continue
              </button>
            )}

            {step === 3 && (
              <button 
                onClick={handleCreateCampaign}
                disabled={isSaving}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 px-10 rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                {isSaving ? 'Creating...' : 'Launch Campaign'}
              </button>
            )}
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-500 text-xs">
          Need help? <a href="#" className="text-blue-400 underline">Read our guide on CSV formatting</a>
        </p>
      </div>
    </DashboardLayout>
  );
}
