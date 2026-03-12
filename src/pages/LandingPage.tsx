import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Mail, Zap, Globe, Edit3, Download, Shield, 
  ChevronRight, CheckCircle2, Play, Menu, X,
  Twitter, Linkedin, Github, Star, ArrowRight,
  Sparkles, MessageSquare, Users, BarChart, Copy
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-slate-300 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0B0F1A]/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-white font-heading font-bold text-xl tracking-tight">Mr. Cold Mail</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="text-sm font-medium hover:text-white transition-colors">Pricing</a>
            <a href="#demo" className="text-sm font-medium hover:text-white transition-colors">Demo</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth" className="text-sm font-medium hover:text-white transition-colors">Login</Link>
            <Link to="/generate" className="relative group px-5 py-2.5 rounded-full bg-white text-[#0B0F1A] font-semibold text-sm overflow-hidden transition-all hover:scale-105">
              <span className="relative z-10">Start Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0B0F1A] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-lg">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/generate" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center font-semibold" onClick={() => setMobileMenuOpen(false)}>
                Start Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium w-fit">
                <Sparkles className="w-4 h-4" />
                AI Cold Email Platform
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.1] tracking-tight">
                Write 50 Personalized <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  Cold Emails
                </span> in 5 Minutes
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
                Upload your leads and let AI research each company and write hyper-personalized outreach emails automatically.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/generate" className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all hover:scale-105">
                  Start Free <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#demo" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-all">
                  <Play className="w-5 h-5" /> Watch Demo
                </a>
              </motion.div>
            </motion.div>

            {/* 3D Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 15, rotateX: 5 }}
              animate={{ opacity: 1, scale: 1, rotateY: -5, rotateX: 5 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative perspective-1000"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-2xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden transform-style-3d"
                style={{ boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)' }}
              >
                {/* Browser Header */}
                <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                {/* App UI */}
                <div className="flex h-[400px]">
                  <div className="w-1/3 border-r border-white/10 p-4 space-y-3 bg-white/5">
                    <div className="h-8 rounded bg-white/10 w-full mb-6" />
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`p-3 rounded-lg border ${i === 1 ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/5 bg-white/5'}`}>
                        <div className="h-4 bg-white/20 rounded w-2/3 mb-2" />
                        <div className="h-3 bg-white/10 rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 p-6 relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                      <div>
                        <div className="h-4 bg-white/20 rounded w-32 mb-1" />
                        <div className="h-3 bg-white/10 rounded w-24" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-white/20 rounded w-3/4" />
                      <div className="h-4 bg-white/20 rounded w-full" />
                      <div className="h-4 bg-white/20 rounded w-5/6" />
                      <div className="h-4 bg-white/20 rounded w-4/5" />
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="h-4 bg-blue-500/50 rounded"
                      />
                    </div>
                    
                    {/* Floating Element */}
                    <motion.div 
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium flex items-center gap-2 backdrop-blur-md"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Generated
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-10 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-medium text-slate-500 mb-8 uppercase tracking-widest">Trusted by 500+ founders & sales teams</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {['Stripe', 'HubSpot', 'Notion', 'Zapier', 'Apollo'].map(logo => (
                <div key={logo} className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-white/20" /> {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">How it works</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Three simple steps to automate your personalized outreach.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Download className="w-6 h-6" />, title: "1. Upload Leads", desc: "Upload a CSV file of prospects. We need just their name, company, and role." },
              { icon: <Zap className="w-6 h-6" />, title: "2. AI Personalizes Emails", desc: "AI researches each company website and crafts a unique, highly relevant email." },
              { icon: <MessageSquare className="w-6 h-6" />, title: "3. Export & Send", desc: "Review, edit, and download your emails instantly to use in your sending tool." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-[#1F2937]/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-[#1F2937]/60 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 md:py-32 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Everything you need</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">Powerful features to scale your outreach without losing the human touch.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Sparkles />, title: "AI Personalization", desc: "GPT-4o powered emails that sound like they were written by a human." },
                { icon: <Globe />, title: "Website Scraping", desc: "Automatically reads company websites to find relevant hooks." },
                { icon: <Users />, title: "Bulk Generation", desc: "Process hundreds of leads in minutes, not hours." },
                { icon: <Edit3 />, title: "Email Editing", desc: "Built-in editor to tweak and perfect AI-generated drafts." },
                { icon: <Download />, title: "Export Anywhere", desc: "Download as CSV or JSON to import into Lemlist, Instantly, etc." },
                { icon: <Shield />, title: "Secure Data", desc: "Your lead data is encrypted and never used to train our models." }
              ].map((feat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-[#111827] border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors mb-6">
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Demo */}
        <section id="demo" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">See it in action</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">A seamless interface designed for speed and quality.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-white/10 bg-[#0B0F1A] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]"
          >
            {/* Sidebar */}
            <div className="w-full md:w-80 border-r border-white/10 bg-[#111827] flex flex-col">
              <div className="p-4 border-b border-white/10">
                <div className="h-10 bg-white/5 rounded-lg flex items-center px-4 text-slate-500 text-sm">Search leads...</div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="p-4 border-l-2 border-blue-500 bg-blue-500/5">
                  <div className="font-medium text-blue-400">Alex Chen</div>
                  <div className="text-xs text-slate-400">Head of Growth at FinPay</div>
                </div>
                <div className="p-4 border-b border-white/5 hover:bg-white/5">
                  <div className="font-medium text-slate-300">Maria Torres</div>
                  <div className="text-xs text-slate-500">CEO at PayStack</div>
                </div>
                <div className="p-4 border-b border-white/5 hover:bg-white/5">
                  <div className="font-medium text-slate-300">James Wu</div>
                  <div className="text-xs text-slate-500">VP Sales at Stripe</div>
                </div>
              </div>
            </div>
            {/* Editor */}
            <div className="flex-1 bg-[#0B0F1A] flex flex-col relative">
              <div className="p-6 border-b border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">AC</div>
                <div>
                  <div className="font-bold text-white text-lg">Alex Chen</div>
                  <div className="text-sm text-slate-400">FinPay • finpay.io</div>
                </div>
              </div>
              <div className="p-8 flex-1">
                <div className="text-sm text-slate-500 mb-2">Subject: Quick question about FinPay's Q3 growth</div>
                <div className="w-full h-px bg-white/10 mb-6" />
                <div className="text-slate-300 leading-relaxed font-mono text-sm">
                  Hi Alex,<br/><br/>
                  I noticed FinPay just expanded into the European market—congrats on the massive milestone!<br/><br/>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="text-blue-400"
                  >
                    I was digging into how fintechs manage cross-border compliance lately. Given your role as Head of Growth, I thought you might find our latest benchmark report on latency reduction relevant.
                  </motion.span>
                  <br/><br/>
                  Would you be open to a 5-minute chat next week?<br/><br/>
                  Best,<br/>
                  The Mr. Cold Mail Team
                </div>
              </div>
              
              {/* Floating action bar */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-[#1F2937]/80 backdrop-blur-md border border-white/10 flex items-center gap-4 shadow-xl">
                <button className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-medium"><Sparkles className="w-4 h-4"/> Improve</button>
                <div className="w-px h-4 bg-white/20" />
                <button className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-medium"><Copy className="w-4 h-4"/> Copy Email</button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">Start for free, upgrade when you need more power.</p>
            
            <div className="inline-flex items-center p-1 bg-white/5 rounded-full border border-white/10">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Yearly <span className="text-[10px] uppercase tracking-wider bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Save 40%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Trial */}
            <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 flex flex-col hover:border-white/20 transition-colors">
              <h3 className="text-xl font-heading font-bold text-white mb-2 flex items-center gap-2">🟢 Free Trial</h3>
              <p className="text-slate-400 text-sm mb-6">Perfect for testing how fast AI can write personalized cold emails.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>Generate up to 20 AI Personalized Emails</span></li>
                <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>Test the AI personalization engine</span></li>
                <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>No credit card required</span></li>
              </ul>
              <Link to="/generate" className="w-full py-3 rounded-xl border border-white/20 text-white font-semibold text-center hover:bg-white/5 transition-colors">Start Free</Link>
            </div>

            {/* Pro */}
            <div className="relative bg-[#1F2937] border border-blue-500/50 rounded-3xl p-8 flex flex-col shadow-[0_0_40px_rgba(59,130,246,0.15)] transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2 flex items-center gap-2">
                {billingCycle === 'yearly' ? '💎 Pro Yearly' : '⭐ Pro'}
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                {billingCycle === 'yearly' ? 'Save more with yearly billing.' : 'Perfect for founders and sales teams scaling outreach.'}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">${billingCycle === 'yearly' ? '17' : '29'}</span>
                <span className="text-slate-500"> / {billingCycle === 'yearly' ? 'year' : 'month'}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {billingCycle === 'yearly' ? (
                  <>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>All Pro features</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Unlimited AI emails</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Priority AI processing</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Best value yearly plan</span></li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Generate Unlimited AI Personalized Emails</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Advanced personalization</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Company website insights</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Export email campaigns</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" /> <span>Faster AI generation</span></li>
                  </>
                )}
              </ul>
              <Link to="/generate" className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-center hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all">Upgrade to Pro</Link>
            </div>

            {/* Agency */}
            <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 flex flex-col hover:border-white/20 transition-colors">
              <h3 className="text-xl font-heading font-bold text-white mb-2 flex items-center gap-2">
                {billingCycle === 'yearly' ? '🏆 Agency Yearly' : '🚀 Agency'}
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                {billingCycle === 'yearly' ? 'Best value for agencies.' : 'Best for agencies managing multiple clients.'}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">${billingCycle === 'yearly' ? '41' : '69'}</span>
                <span className="text-slate-500"> / {billingCycle === 'yearly' ? 'year' : 'month'}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {billingCycle === 'yearly' ? (
                  <>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>All Agency features</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>Unlimited emails & campaigns</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>Team collaboration</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>Priority support</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>Discounted yearly plan</span></li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>Unlimited AI emails</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>Unlimited campaigns</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>Team access</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>Advanced analytics</span></li>
                    <li className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> <span>Priority support</span></li>
                  </>
                )}
              </ul>
              <Link to="/generate" className="w-full py-3 rounded-xl border border-white/20 text-white font-semibold text-center hover:bg-white/5 transition-colors">Contact Sales</Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 md:py-32 px-6 bg-[#111827]/50 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Loved by sales teams</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { quote: "This tool saved me 10 hours every week writing cold emails. The personalization is scary good.", name: "Sarah Jenkins", role: "Founder @ TechFlow" },
                { quote: "Our reply rates jumped from 2% to 18% in one month. Mr. Cold Mail pays for itself 100x over.", name: "David Miller", role: "Head of Growth @ SaaSify" },
                { quote: "The website scraping feature is a game changer. It finds hooks I would have never thought of.", name: "Emily Blunt", role: "VP Marketing @ CloudScale" }
              ].map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#1F2937]/40 backdrop-blur-md border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex gap-1 text-yellow-500 mb-6">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                    <div>
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-sm text-slate-500">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20 pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Start sending better cold emails today</h2>
            <p className="text-xl text-slate-400 mb-10">Join 500+ companies booking more meetings with AI personalization.</p>
            <Link to="/generate" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all hover:scale-105">
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-6 text-sm text-slate-500">5 free emails • No credit card required</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0B0F1A] pt-16 pb-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-white font-heading font-bold text-xl tracking-tight">Mr. Cold Mail</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs mb-6">
              Send Personalized Cold Emails at Scale with AI. Generate 50 personalized emails in under 5 minutes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cold Email Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 Mr. Cold Mail. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> All systems operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
