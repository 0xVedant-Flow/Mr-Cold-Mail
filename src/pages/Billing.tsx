import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, CheckCircle2, Zap, Loader2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import AddPaymentMethodModal from '../components/AddPaymentMethodModal';
import { usePaymentStore } from '../store/paymentStore';
import { useUsageStore } from '../store/usageStore';

export default function Billing() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(undefined);
  const { paymentMethods } = usePaymentStore();
  const { setPlan, plan, emailsGenerated, limit } = useUsageStore();

  const handleCheckout = async (planName: 'free' | 'pro' | 'agency') => {
    setLoadingPlan(planName);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPlan(planName);
      alert(`Successfully upgraded to ${planName} plan!`);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout process');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <AddPaymentMethodModal 
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); setModalData(undefined); }} 
          initialData={modalData}
        />
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Billing & Usage</h1>
          <p className="text-slate-400">Manage your subscription and track your AI email generation usage.</p>
        </div>

        {/* Usage Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1F2937] border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white">Current Usage ({plan.toUpperCase()} Plan)</h3>
            </div>
            <span className="text-sm font-medium text-slate-300">{emailsGenerated} / {limit} Emails Generated</span>
          </div>
          
          <div className="w-full bg-[#111827] rounded-full h-3 mb-2 overflow-hidden border border-white/5">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full" style={{ width: `${(emailsGenerated / limit) * 100}%` }}></div>
          </div>
          <p className="text-xs text-slate-500">Resets on Nov 12, 2026. {plan === 'free' ? 'Upgrade to Pro for unlimited emails.' : 'You have a ' + plan.toUpperCase() + ' plan.'}</p>
        </motion.div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Trial */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1F2937] border border-white/10 rounded-2xl p-8 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-500/50"></div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">Free Trial</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" /> <span>20 AI Emails</span></li>
              <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" /> <span>Basic templates</span></li>
              <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" /> <span>Standard support</span></li>
            </ul>
            <button disabled className="w-full py-3 rounded-xl bg-white/5 text-slate-400 font-semibold text-center cursor-not-allowed border border-white/10">Current Plan</button>
          </motion.div>

          {/* Pro */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1F2937] border border-blue-500/50 rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <div className="absolute top-4 right-4 bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/20">Recommended</div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$29</span>
              <span className="text-slate-500"> / month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Unlimited AI Emails</span></li>
              <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Advanced personalization</span></li>
              <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Priority AI processing</span></li>
              <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Export campaigns</span></li>
            </ul>
            <button 
              onClick={() => handleCheckout('pro')}
              disabled={loadingPlan === 'pro'}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all disabled:opacity-70"
            >
              {loadingPlan === 'pro' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Upgrade to Pro'}
            </button>
          </motion.div>

          {/* Agency */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1F2937] border border-white/10 rounded-2xl p-8 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-purple-500/50"></div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">Agency</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$69</span>
              <span className="text-slate-500"> / month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" /> <span>Team access (up to 5)</span></li>
              <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" /> <span>Unlimited campaigns</span></li>
              <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" /> <span>Advanced analytics</span></li>
              <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" /> <span>Priority support</span></li>
            </ul>
            <button 
              onClick={() => handleCheckout('agency')}
              disabled={loadingPlan === 'agency'}
              className="w-full py-3 rounded-xl border border-white/20 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors disabled:opacity-70"
            >
              {loadingPlan === 'agency' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Upgrade to Agency'}
            </button>
          </motion.div>
        </div>
        
        {/* Payment Methods */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#1F2937] border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CreditCard className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white">Payment Methods</h3>
          </div>
          
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border border-white/10 rounded-xl bg-[#111827] mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-[#1A1F36] font-bold italic text-sm">VISA</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{method.number}</p>
                  <p className="text-xs text-slate-500">Expires {method.expiry}</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setModalData(method);
                  setIsModalOpen(true);
                }}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium"
              >
                Edit
              </button>
            </div>
          ))}
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-4 text-sm text-slate-400 hover:text-white font-medium flex items-center gap-2"
          >
            + Add payment method
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
