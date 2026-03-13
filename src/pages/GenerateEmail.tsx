import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Copy, RefreshCw, Wand2, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { cn } from '../components/DashboardLayout';
import { generatePersonalizedEmail } from '../lib/gemini';
import { useUsageStore } from '../store/usageStore';
import { useAuthStore } from '../store/authStore';

const GOALS = ['Book meeting', 'Start conversation', 'Demo request'];
const TONES = ['Professional', 'Friendly', 'Direct'];

export default function GenerateEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { emailsGenerated, limit, incrementUsage, saveEmailHistory } = useUsageStore();
  const { user } = useAuthStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    leadName: '',
    leadRole: '',
    companyName: '',
    companyWebsite: '',
    industry: '',
    companyDescription: '',
    goal: 'Book meeting',
    tone: 'Professional'
  });

  const [generatedSubject, setGeneratedSubject] = useState('');
  const [generatedBody, setGeneratedBody] = useState('');
  const [displayedBody, setDisplayedBody] = useState('');

  // Handle template from navigation state
  useEffect(() => {
    if (location.state?.template) {
      const { template } = location.state;
      setGeneratedSubject(template.subject);
      setGeneratedBody(template.body);
      setIsGenerated(true);
    }
  }, [location.state]);

  const handleGenerate = async () => {
    if (emailsGenerated >= limit) {
      alert('You have reached your usage limit. Please upgrade to continue.');
      navigate('/billing');
      return;
    }

    try {
      setIsGenerating(true);
      setIsGenerated(false);
      setDisplayedBody('');
      
      const data = await generatePersonalizedEmail({
        ...formData,
        userName: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Sender'
      });
      
      setIsGenerating(false);
      setIsGenerated(true);
      setGeneratedSubject(data.subject);
      setGeneratedBody(data.body);
      
      // Increment usage and save history
      incrementUsage();
      saveEmailHistory(data.subject, data.body, location.state?.leadId);
    } catch (err: any) {
      console.error('Error generating email:', err);
      setIsGenerating(false);
      alert(err.message || 'Failed to generate email. Please check your Gemini API key.');
    }
  };

  // Typing effect
  useEffect(() => {
    if (isGenerated && generatedBody) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedBody(generatedBody.substring(0, i));
        i++;
        if (i > generatedBody.length) clearInterval(interval);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isGenerated, generatedBody]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${generatedSubject}\n\n${generatedBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = generatedBody.trim().split(/\s+/).length;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Generate Email</h1>
          <p className="text-slate-400">Create highly personalized cold emails using AI.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-[#1F2937] border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                1
              </div>
              Lead Details
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Lead Name</label>
                  <input 
                    type="text" 
                    value={formData.leadName}
                    onChange={(e) => setFormData({...formData, leadName: e.target.value})}
                    className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="e.g. Sarah Connor"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Lead Role</label>
                  <input 
                    type="text" 
                    value={formData.leadRole}
                    onChange={(e) => setFormData({...formData, leadRole: e.target.value})}
                    className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="e.g. VP of Sales"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Company Name</label>
                  <input 
                    type="text" 
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="e.g. Cyberdyne"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Industry</label>
                  <input 
                    type="text" 
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="e.g. Robotics"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Company Website</label>
                <input 
                  type="url" 
                  value={formData.companyWebsite}
                  onChange={(e) => setFormData({...formData, companyWebsite: e.target.value})}
                  className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Company Description</label>
                <textarea 
                  value={formData.companyDescription}
                  onChange={(e) => setFormData({...formData, companyDescription: e.target.value})}
                  className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-24 resize-none"
                  placeholder="Briefly describe what they do..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Campaign Goal</label>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map(goal => (
                    <button
                      key={goal}
                      onClick={() => setFormData({...formData, goal})}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                        formData.goal === goal 
                          ? "bg-blue-500/20 border-blue-500/50 text-blue-400" 
                          : "bg-[#111827] border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                      )}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {TONES.map(tone => (
                    <button
                      key={tone}
                      onClick={() => setFormData({...formData, tone})}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                        formData.tone === tone 
                          ? "bg-purple-500/20 border-purple-500/50 text-purple-400" 
                          : "bg-[#111827] border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                      )}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Personalized Email
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Output Editor */}
          <div className="bg-[#1F2937] border border-white/10 rounded-2xl p-6 flex flex-col">
            <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                2
              </div>
              Generated Email
            </h2>

            <AnimatePresence mode="wait">
              {!isGenerated && !isGenerating ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/5 rounded-xl p-8 text-center"
                >
                  <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                  <p>Fill out the details and click generate to see the magic happen.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-blue-400 border-2 border-dashed border-blue-500/20 rounded-xl p-8 text-center bg-blue-500/5"
                >
                  <RefreshCw className="w-12 h-12 mb-4 animate-spin" />
                  <p className="animate-pulse">Analyzing lead and crafting email...</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Subject Line</label>
                    <input 
                      type="text" 
                      value={generatedSubject}
                      onChange={(e) => setGeneratedSubject(e.target.value)}
                      className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  
                  <div className="space-y-2 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-300">Email Body</label>
                      <span className="text-xs text-slate-500">{wordCount} words</span>
                    </div>
                    <textarea 
                      value={displayedBody}
                      onChange={(e) => {
                        setDisplayedBody(e.target.value);
                        setGeneratedBody(e.target.value);
                      }}
                      className="w-full flex-1 bg-[#111827] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 resize-none min-h-[300px]"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                    <button 
                      onClick={handleCopy}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy Email'}
                    </button>
                    <button 
                      onClick={handleGenerate}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-medium transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </button>
                    <button 
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-medium transition-colors border border-purple-500/20"
                    >
                      <Wand2 className="w-4 h-4" />
                      Improve with AI
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
