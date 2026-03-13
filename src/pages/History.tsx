import { motion } from 'motion/react';
import { Mail, Clock } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useUsageStore } from '../store/usageStore';

export default function History() {
  const { history } = useUsageStore();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Email History</h1>
          <p className="text-slate-400">View your recently generated emails.</p>
        </div>

        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-20 bg-[#1F2937] border border-white/10 rounded-2xl">
              <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No email history yet.</p>
            </div>
          ) : (
            history.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1F2937] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{item.subject}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Clock className="w-4 h-4" />
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>
                <p className="text-slate-400 text-sm whitespace-pre-wrap">{item.body}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
