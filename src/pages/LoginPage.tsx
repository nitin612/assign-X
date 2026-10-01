import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import {
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  AlertCircle,
  UserCheck,
  Zap
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate, currentRoute } = useNavigation();
  const { login } = useApp();
  const { isDark, toggleTheme } = useTheme();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your work email and password.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login();
      setIsLoading(false);
      const redirectTarget = currentRoute.query.redirect || '/dashboard';
      navigate(redirectTarget);
    }, 500);
  };

  const handleSocialLogin = (_provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      login();
      setIsLoading(false);
      navigate('/dashboard');
    }, 450);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] dark:bg-[#070709] text-slate-900 dark:text-white flex flex-col justify-between transition-colors relative overflow-x-hidden font-sans">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-slate-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* ── Top Navigation Header ── */}
      <header className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-3 sm:py-5 flex items-center justify-between z-20 relative">
        {/* Brand Left */}
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer group flex items-center gap-1.5 select-none"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white group-hover:text-[#EE6B50] transition-colors">
            Assign<span className="text-[#EE6B50] dark:text-[#FA795C]">X</span>
          </span>
        </div>

        {/* Right Actions: Back to Home + Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 shadow-2xs backdrop-blur-md transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Back to </span>
            <span>Home</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-amber-300 shadow-2xs hover:bg-white dark:hover:bg-white/10 backdrop-blur-md transition-all cursor-pointer"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
          </button>
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-6 flex-1 flex items-center justify-center z-10 relative">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch max-w-5xl">

          {/* ─────────────────────────────────────────────────────────────
              Left Column (Desktop): Clean Value Showcase & Client Guarantee
             ───────────────────────────────────────────────────────────── */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between bg-gradient-to-br from-slate-950 via-[#101015] to-[#161214] text-white border border-slate-800/80 rounded-3xl p-8 lg:p-9 shadow-2xl relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#EE6B50]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top: Clean Headline & Intro */}
            <div className="relative z-10">


              <h2 className="text-2.5xl lg:text-[30px] font-bold text-white tracking-tight leading-[1.2]">
                Get work done. <br />
                <span className="bg-gradient-to-r from-[#FF758F] via-[#FA795C] to-[#F6CF57] bg-clip-text text-transparent">
                  Zero management headache.
                </span>
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Post tasks, track progress in escrow, and let dedicated senior supervisors verify code quality before you pay.
              </p>
            </div>

            {/* Middle: 3 Clean Value Pillars */}
            <div className="relative z-10 my-6 space-y-3.5">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-xl bg-[#EE6B50]/15 border border-[#EE6B50]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <UserCheck className="w-4 h-4 text-[#FA795C]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Dedicated Tech Supervisors</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                    Senior tech leads review code quality, enforce deadlines, and manage doers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Zero Status Meetings</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                    Transparent async daily updates and live milestone progress in one dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Guarantee Banner */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                100% Satisfaction Guarantee
              </span>
              <span className="text-slate-500 text-[11px]">AssignX Verified</span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              Right Column: Client Auth Form Card (Responsive & Smooth Height)
             ───────────────────────────────────────────────────────────── */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
            <motion.div
              layout
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/95 dark:bg-[#111116]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4.5 sm:p-7 lg:p-9 shadow-xl dark:shadow-2xl text-left relative overflow-hidden"
            >
              {/* Header Tab Switcher (Full Width Segmented Control) */}
              <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl sm:rounded-2xl border border-slate-200/80 dark:border-white/10 mb-4 sm:mb-5 relative">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className={`flex-1 relative z-10 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center ${mode === 'login'
                    ? 'text-slate-950 dark:text-white font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {mode === 'login' && (
                    <motion.div
                      layoutId="activeAuthTab"
                      className="absolute inset-0 bg-white dark:bg-[#1E1E26] rounded-lg sm:rounded-xl shadow-xs -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                  }}
                  className={`flex-1 relative z-10 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center ${mode === 'register'
                    ? 'text-slate-950 dark:text-white font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {mode === 'register' && (
                    <motion.div
                      layoutId="activeAuthTab"
                      className="absolute inset-0 bg-white dark:bg-[#1E1E26] rounded-lg sm:rounded-xl shadow-xs -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  Register
                </button>
              </div>

              {/* Title and Subtitle - Generous full width */}
              <div className="mb-4 sm:mb-5">
                <h3 className="text-lg sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                  {mode === 'login' ? 'Client Sign In' : 'Create Client Account'}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                  {mode === 'login'
                    ? 'Enter your work email to access your client dashboard.'
                    : 'Create your account to post tasks and manage project deliverables.'}
                </p>
              </div>

              {/* ── Social Login Buttons (Google / GitHub) ── */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-xs sm:text-sm font-semibold text-slate-800 dark:text-white transition-all cursor-pointer shadow-2xs"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('GitHub')}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-xs sm:text-sm font-semibold text-slate-800 dark:text-white transition-all cursor-pointer shadow-2xs"
                >
                  <svg className="w-4 h-4 shrink-0 fill-current text-slate-900 dark:text-white" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-3 sm:my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-white/10" />
                </div>
                <div className="relative bg-white dark:bg-[#111116] px-3 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">
                  or work email
                </div>
              </div>

              {/* Error Message Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="mb-3 sm:mb-4 overflow-hidden"
                  >
                    <div className="p-2.5 sm:p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Interactive Form with Smooth Layout Transitions ── */}
              <motion.form layout transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                {/* Registration: Full Name */}
                <AnimatePresence initial={false}>
                  {mode === 'register' && (
                    <motion.div
                      key="register-name-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3 sm:pb-3.5">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alex Chen"
                          className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-[#EE6B50] focus:ring-2 focus:ring-[#EE6B50]/20 transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Input */}
                <motion.div layout transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    required
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-[#EE6B50] focus:ring-2 focus:ring-[#EE6B50]/20 transition-all placeholder:text-slate-400"
                  />
                </motion.div>

                {/* Password Input with Show/Hide */}
                <motion.div layout transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <AnimatePresence>
                      {mode === 'login' && (
                        <motion.button
                          initial={{ opacity: 0, x: 6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 6 }}
                          transition={{ duration: 0.18 }}
                          type="button"
                          onClick={() => setShowForgotModal(true)}
                          className="text-[11px] font-medium text-[#EE6B50] dark:text-[#FA795C] hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full px-3.5 py-2 sm:py-2.5 pr-10 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-[#EE6B50] focus:ring-2 focus:ring-[#EE6B50]/20 transition-all placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </motion.div>

                {/* Remember Me Checkbox */}
                <motion.div layout transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded-md accent-[#EE6B50] cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Remember me for 30 days
                    </span>
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  layout
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-1.5 sm:mt-2 bg-gradient-to-r from-[#FA795C] via-[#EE6B50] to-[#D95236] hover:brightness-105 active:scale-98 text-white font-semibold py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Create Client Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>

              {/* Terms Note */}
              <motion.p layout transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="mt-3.5 sm:mt-4 text-[11px] text-center text-slate-400 font-normal leading-relaxed">
                By signing in, you agree to AssignX's{' '}
                <a href="#terms" className="underline hover:text-slate-600 dark:hover:text-slate-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="underline hover:text-slate-600 dark:hover:text-slate-300">
                  Privacy Policy
                </a>.
              </motion.p>
            </motion.div>
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-[11px] text-slate-400 border-t border-slate-200/60 dark:border-white/5 z-10 relative flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-bit SSL Encrypted & Escrow Protected</span>
        </div>
        <div>
          © {new Date().getFullYear()} AssignX Inc. All rights reserved.
        </div>
      </footer>

      {/* ── Forgot Password Modal ── */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#15151A] rounded-2xl border border-slate-200 dark:border-white/10 p-6 max-w-md w-full shadow-2xl text-left">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#EE6B50]" />
              <span>Reset your password</span>
            </h4>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Enter your work email address and we will send you a secure link to reset your account password.
            </p>

            {forgotSent ? (
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>Password reset link sent to {forgotEmail}!</span>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-[#EE6B50]"
                />
                <button
                  onClick={() => {
                    if (forgotEmail) setForgotSent(true);
                  }}
                  className="w-full py-2 bg-gradient-to-r from-[#FA795C] to-[#D95236] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs hover:brightness-105"
                >
                  Send Reset Link
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setShowForgotModal(false);
                setForgotSent(false);
                setForgotEmail('');
              }}
              className="mt-4 w-full py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
