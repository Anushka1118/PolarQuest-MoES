'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, UserCheck, ShieldCheck, FileText, Lock, Mail, ArrowRight } from 'lucide-react';
import { UserRole } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('researcher');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save session state to localStorage for local role authorization
    localStorage.setItem('polarquest_demo_role', role);
    localStorage.setItem('polarquest_demo_email', email || `${role}@demo.com`);
    window.dispatchEvent(new Event('polarquest_auth_change'));

    setTimeout(() => {
      setLoading(false);
      if (role === 'admin') router.push('/admin');
      else router.push('/researcher');
    }, 600);
  };

  const handleFillCredentials = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setEmail(`${selectedRole}@demo.com`);
    setPassword('polarquest2026');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-navy-950 transition-colors duration-300">
      <div className="w-full max-w-md bg-white/95 dark:bg-navy-900/90 border border-slate-200 dark:border-polar-500/30 rounded-2xl p-8 shadow-2xl shadow-sky-900/10 dark:shadow-navy-950/80 space-y-6 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/20 dark:bg-aurora-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-polar-900 border border-sky-300 dark:border-aurora-cyan/40 flex items-center justify-center text-sky-700 dark:text-aurora-cyan mx-auto shadow-sm dark:shadow-glow-cyan">
            <UserCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-wide">
            MoES Portal Authentication
          </h1>
          <p className="text-xs text-slate-600 dark:text-polar-300">
            Sign in to access Researcher Ingestion Console or Admin Publishing Workflows.
          </p>
        </div>

        {/* 1-Click Fast Fill for Hackathon Presentation */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-polar-500/20 space-y-2">
          <div className="text-[11px] font-bold font-mono text-slate-600 dark:text-polar-300 uppercase tracking-wider text-center">
            Demo Credentials Auto-Fill (1-Click):
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleFillCredentials('researcher')}
              className="px-3 py-2 rounded-lg bg-sky-100/80 dark:bg-polar-900/80 border border-sky-300 dark:border-polar-500/30 hover:border-sky-500 dark:hover:border-aurora-cyan text-xs font-semibold text-sky-900 dark:text-aurora-cyan transition-all flex items-center justify-center space-x-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Researcher</span>
            </button>
            <button
              type="button"
              onClick={() => handleFillCredentials('admin')}
              className="px-3 py-2 rounded-lg bg-purple-100/80 dark:bg-polar-900/80 border border-purple-300 dark:border-polar-500/30 hover:border-purple-500 dark:hover:border-purple-400 text-xs font-semibold text-purple-900 dark:text-purple-300 transition-all flex items-center justify-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-polar-300 uppercase tracking-wider mb-1 font-mono">
              Target Portal Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-polar-500/30 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 dark:focus:border-aurora-cyan font-medium"
            >
              <option value="researcher">Researcher (Upload & Submit Papers)</option>
              <option value="admin">Administrator (Review & Publish Papers)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-polar-300 uppercase tracking-wider mb-1 font-mono">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-polar-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="researcher@demo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-polar-500/30 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 dark:focus:border-aurora-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-polar-300 uppercase tracking-wider mb-1 font-mono">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-polar-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-polar-500/30 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 dark:focus:border-aurora-cyan"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-aurora-cyan text-white dark:text-navy-950 font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white dark:border-navy-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Authenticate Session</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
