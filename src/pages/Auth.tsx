import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

type AuthMode = 'login' | 'signup' | 'forgot' | 'update';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    // Check for password recovery event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setMode('update');
      }
    });

    if (user && mode !== 'update') {
      navigate('/dashboard');
    }

    return () => subscription.unsubscribe();
  }, [user, navigate, mode]);

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if ((mode === 'signup' || mode === 'update') && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if ((mode === 'signup' || mode === 'update') && password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        if (error) throw error;
        setMessage('Registration successful! Please check your email for verification.');
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth`,
        });
        if (error) throw error;
        setMessage('Password reset link sent! Please check your email.');
      } else if (mode === 'update') {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        setMessage('Password updated successfully! You can now log in.');
        setMode('login');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'github' | 'google') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[150px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-white mb-6 shadow-2xl">
            <Send className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-3 tracking-tight">
            {mode === 'login' && 'Welcome back'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot' && 'Reset Password'}
            {mode === 'update' && 'Update Password'}
          </h1>
          <p className="text-slate-400 text-lg">
            {mode === 'login' && 'Access your personalized email dashboard.'}
            {mode === 'signup' && 'Start crafting high-converting cold emails.'}
            {mode === 'forgot' && 'We will send you a secure reset link.'}
            {mode === 'update' && 'Set your new secure password.'}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              {message}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input 
                    type="text" 
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#111111] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            {mode !== 'update' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111111] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
            )}

            {mode !== 'forgot' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-medium text-slate-400">
                    {mode === 'update' ? 'New Password' : 'Password'}
                  </label>
                  {mode === 'login' && (
                    <button 
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#111111] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {(mode === 'signup' || mode === 'update') && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input 
                    type="password" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#111111] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-slate-200 transition-all disabled:opacity-50 mt-4 shadow-lg"
            >
              {loading ? 'Processing...' : (
                mode === 'login' ? 'Sign In' : 
                mode === 'signup' ? 'Create Account' : 
                mode === 'forgot' ? 'Send Reset Link' : 'Update Password'
              )}
            </button>
          </form>

          {mode !== 'forgot' && mode !== 'update' && (
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#0A0A0A] text-slate-600 font-medium">OR</span>
                </div>
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => handleOAuth('google')}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all"
                  type="button"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <p className="text-center mt-8 text-slate-500">
          {mode === 'login' && (
            <>
              Don't have an account?{' '}
              <button 
                onClick={() => setMode('signup')}
                className="text-white hover:text-blue-400 font-semibold transition-colors"
              >
                Sign up
              </button>
            </>
          )}
          {mode === 'signup' && (
            <>
              Already have an account?{' '}
              <button 
                onClick={() => setMode('login')}
                className="text-white hover:text-blue-400 font-semibold transition-colors"
              >
                Log in
              </button>
            </>
          )}
          {mode === 'forgot' && (
            <button 
              onClick={() => setMode('login')}
              className="text-white hover:text-blue-400 font-semibold transition-colors"
            >
              Back to login
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
