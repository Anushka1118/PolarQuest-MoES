'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Compass, BookOpen, GraduationCap, FileText, ShieldCheck, UserCheck, LogOut, Sparkles, Snowflake } from 'lucide-react';
import { UserRole } from '@/lib/supabase';

export default function Navbar() {
  const pathname = usePathname();
  const [activeRole, setActiveRole] = useState<UserRole>('public');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Read session role from localStorage for demo persistence
    const savedRole = localStorage.getItem('polarquest_demo_role') as UserRole;
    const savedEmail = localStorage.getItem('polarquest_demo_email');
    if (savedRole) setActiveRole(savedRole);
    if (savedEmail) setUserEmail(savedEmail);
  }, []);

  const handleSwitchRole = (role: UserRole) => {
    setActiveRole(role);
    let email = null;
    if (role === 'researcher') email = 'researcher@demo.com';
    if (role === 'admin') email = 'admin@demo.com';
    
    localStorage.setItem('polarquest_demo_role', role);
    if (email) localStorage.setItem('polarquest_demo_email', email);
    else localStorage.removeItem('polarquest_demo_email');
    setUserEmail(email);

    // Dispatch custom event to notify components
    window.dispatchEvent(new Event('polarquest_auth_change'));
  };

  const navLinks = [
    { name: '3D Explorer', href: '/', icon: Globe },
    { name: 'Research Vault', href: '/research', icon: BookOpen },
    { name: 'Smart Education', href: '/learn', icon: GraduationCap },
    { name: 'Researcher Console', href: '/researcher', icon: FileText, protectedRole: 'researcher' },
    { name: 'Admin Console', href: '/admin', icon: ShieldCheck, protectedRole: 'admin' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy-950/80 backdrop-blur-xl border-b border-polar-500/20 shadow-lg shadow-navy-950/50">
      {/* Hackathon Fast-Role Switcher Ribbon */}
      <div className="bg-gradient-to-r from-polar-900 via-navy-900 to-polar-950 border-b border-polar-500/10 px-4 py-1 flex items-center justify-between text-xs text-polar-300">
        <div className="flex items-center space-x-2">
          <Snowflake className="w-3.5 h-3.5 text-polar-400 animate-spin" style={{ animationDuration: '12s' }} />
          <span className="font-semibold text-white tracking-wide">MoES SIH26063 Prototype</span>
          <span className="hidden md:inline-block text-polar-400">| Live Telemetry & AI Paper Ingestion Engine</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline-block text-polar-400">Auth Testing Switcher:</span>
          <div className="flex items-center bg-navy-900/90 rounded-full p-0.5 border border-polar-500/30">
            <button
              onClick={() => handleSwitchRole('public')}
              className={`px-2.5 py-0.5 rounded-full font-medium transition-all ${
                activeRole === 'public'
                  ? 'bg-polar-600 text-white shadow'
                  : 'text-polar-300 hover:text-white'
              }`}
            >
              Public
            </button>
            <button
              onClick={() => handleSwitchRole('researcher')}
              className={`px-2.5 py-0.5 rounded-full font-medium transition-all ${
                activeRole === 'researcher'
                  ? 'bg-aurora-cyan text-navy-950 font-bold shadow'
                  : 'text-polar-300 hover:text-white'
              }`}
            >
              Researcher
            </button>
            <button
              onClick={() => handleSwitchRole('admin')}
              className={`px-2.5 py-0.5 rounded-full font-medium transition-all ${
                activeRole === 'admin'
                  ? 'bg-purple-600 text-white font-bold shadow'
                  : 'text-polar-300 hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-cyan to-polar-600 p-0.5 shadow-glow-cyan group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-aurora-cyan animate-pulse" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-white tracking-wider flex items-center">
                POLAR<span className="text-aurora-cyan font-black">QUEST</span>
              </div>
              <div className="text-[10px] tracking-widest text-polar-300 uppercase -mt-1 font-mono">
                MoES Polar Frontier
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-polar-500/20 text-aurora-cyan border border-aurora-cyan/30 shadow-glow-cyan'
                      : 'text-polar-200 hover:text-white hover:bg-polar-900/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                  {link.protectedRole && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-polar-900 border border-polar-500/30 text-polar-300">
                      {link.protectedRole}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Auth Action */}
          <div className="flex items-center space-x-3">
            {userEmail ? (
              <div className="flex items-center space-x-2 bg-polar-900/60 border border-polar-500/30 px-3 py-1.5 rounded-xl">
                <UserCheck className="w-4 h-4 text-aurora-cyan" />
                <div className="text-xs">
                  <div className="text-white font-medium truncate max-w-[120px]">{userEmail}</div>
                  <div className="text-polar-400 capitalize text-[10px]">{activeRole} Mode</div>
                </div>
                <button
                  onClick={() => handleSwitchRole('public')}
                  title="Logout"
                  className="text-polar-400 hover:text-red-400 p-1 rounded transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 bg-gradient-to-r from-polar-600 to-polar-500 hover:from-polar-500 hover:to-aurora-cyan text-white hover:text-navy-950 font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-glow-ice"
              >
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
