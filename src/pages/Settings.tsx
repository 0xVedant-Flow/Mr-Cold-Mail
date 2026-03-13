import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Shield, Bell, Camera, Save, Trash2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { cn } from '../components/DashboardLayout';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'account', label: 'Account', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, setUser } = useAuthStore();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [company, setCompany] = useState(user?.user_metadata?.company || '');
  const [role, setRole] = useState(user?.user_metadata?.role || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateProfile = async () => {
    try {
      setIsSaving(true);
      setSaveStatus('idle');
      
      const { data, error } = await supabase.auth.updateUser({
        data: { 
          full_name: fullName,
          company: company,
          role: role
        }
      });

      if (error) throw error;

      setUser(data.user);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setSaveStatus('error');
      setErrorMessage(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleUpdatePassword = async () => {
    try {
      setIsUpdatingPassword(true);
      setPasswordStatus('idle');
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setPasswordStatus('success');
      setNewPassword('');
      setTimeout(() => setPasswordStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Error updating password:', err);
      setPasswordStatus('error');
      setErrorMessage(err.message || 'Failed to update password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account preferences and settings.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 space-y-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left",
                  activeTab === tab.id 
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-[#1F2937] border border-white/10 rounded-2xl p-6 md:p-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-xl font-heading font-bold text-white mb-1">Profile Information</h2>
                    <p className="text-sm text-slate-400">Update your personal details and public profile.</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-3xl overflow-hidden">
                        {(user?.user_metadata?.full_name || user?.email)?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <button className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    <div>
                      <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors mb-2">
                        Change Photo
                      </button>
                      <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Full Name</label>
                      <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Email Address</label>
                      <input 
                        type="email" 
                        disabled
                        value={user?.email || ''}
                        className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-slate-500 cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Company</label>
                      <input 
                        type="text" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Role</label>
                      <input 
                        type="text" 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>

                  {saveStatus === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button 
                      onClick={handleUpdateProfile}
                      disabled={isSaving}
                      className={cn(
                        "flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all",
                        saveStatus === 'success' 
                          ? "bg-emerald-500 text-white" 
                          : "bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
                      )}
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : saveStatus === 'success' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {isSaving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : 'Save Changes'}
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-xl font-heading font-bold text-white mb-1">Account Security</h2>
                    <p className="text-sm text-slate-400">Manage your password and account security.</p>
                  </div>

                  <div className="space-y-6 max-w-md">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">New Password</label>
                      <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="••••••••"
                      />
                    </div>
                    <button 
                      onClick={handleUpdatePassword}
                      disabled={isUpdatingPassword || !newPassword}
                      className={cn(
                        "flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all",
                        passwordStatus === 'success' 
                          ? "bg-emerald-500 text-white" 
                          : "bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
                      )}
                    >
                      {isUpdatingPassword ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : passwordStatus === 'success' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Shield className="w-4 h-4" />
                      )}
                      {isUpdatingPassword ? 'Updating...' : passwordStatus === 'success' ? 'Updated!' : 'Update Password'}
                    </button>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <h3 className="text-lg font-heading font-bold text-red-400 mb-2">Danger Zone</h3>
                    <p className="text-sm text-slate-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-red-500/50 text-red-400 hover:bg-red-500/10 font-medium transition-colors">
                      <Trash2 className="w-4 h-4" /> Delete Account
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-xl font-heading font-bold text-white mb-1">Notification Preferences</h2>
                    <p className="text-sm text-slate-400">Choose what updates you want to receive.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-[#111827] border border-white/5 rounded-xl">
                      <div>
                        <h4 className="text-white font-medium mb-1">Email Alerts</h4>
                        <p className="text-sm text-slate-400">Receive daily summaries of your campaign performance.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#111827] border border-white/5 rounded-xl">
                      <div>
                        <h4 className="text-white font-medium mb-1">Campaign Updates</h4>
                        <p className="text-sm text-slate-400">Get notified when a campaign finishes generating emails.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#111827] border border-white/5 rounded-xl">
                      <div>
                        <h4 className="text-white font-medium mb-1">Product Updates</h4>
                        <p className="text-sm text-slate-400">Hear about new features and improvements.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
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
