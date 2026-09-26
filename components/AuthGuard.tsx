'use client';

import React, { useEffect, useState } from 'react';
import { UserRole } from '@/lib/supabase';
import { ShieldAlert, LogIn, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AuthGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export default function AuthGuard({ allowedRoles, children }: AuthGuardProps) {
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  const [loading, setLoading] = useState(true);

  const checkRole = () => {
    const savedRole = (localStorage.getItem('polarquest_demo_role') as UserRole) || 'public';
    setCurrentRole(savedRole);
    setLoading(false);
  };

  useEffect(() => {
    checkRole();
    window.addEventListener('polarquest_auth_change', checkRole);
    return () => window.removeEventListener('polarquest_auth_change', checkRole);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-navy-950 text-polar-300">
        <div className="w-8 h-8 border-2 border-polar-500/30 border-t-aurora-cyan rounded-full animate-spin"></div>
      </div>
    );
  }

  const isAuthorized = allowedRoles.includes(currentRole);

  if (!isAuthorized) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 bg-navy-900/90 border border-red-500/30 rounded-2xl text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">Access Restricted</h2>
        <p className="text-sm text-polar-300 max-w-md mx-auto">
          This portal section requires <span className="font-mono text-aurora-cyan font-bold uppercase">{allowedRoles.join(' or ')}</span> authorization permissions. You are currently browsing as <span className="font-mono text-amber-400 font-bold uppercase">{currentRole}</span>.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-polar-600 to-aurora-cyan text-navy-950 font-bold text-sm shadow-glow-cyan hover:brightness-110 transition-all flex items-center space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Go to Login Page</span>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
