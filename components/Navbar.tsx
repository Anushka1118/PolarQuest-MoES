'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Compass, BookOpen, GraduationCap, FileText, ShieldCheck, UserCheck, LogOut, Sparkles, Snowflake, Sun, Moon } from 'lucide-react';
import { UserRole } from '@/lib/supabase';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-stroke shadow-md transition-colors duration-250">
      {/* Hackathon Fast-Role Switcher Ribbon */}
      <div className="bg-bg-secondary border-b border-stroke px-4 py-1 flex items-center justify-between text-xs text-content-muted">
        <div className="flex items-center space-x-2">
          <Snowflake className="w-3.5 h-3.5 text-brand-primary animate-spin" style={{ animationDuration: '12s' }} />
          <span className="font-semibold text-content-main tracking-wide">MoES SIH26063 Prototype</span>
          <span className="hidden md:inline-block text-content-muted">| Live Telemetry & AI Paper Ingestion Engine</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline-block text-content-muted font-medium">Auth Testing Switcher:</span>
          <div className="flex items-center bg-surface rounded-full p-0.5 border border-stroke">
            <button
              onClick={() => handleSwitchRole('public')}
              className={`px-2.5 py-0.5 rounded-full font-medium transition-all btn-game ${
                activeRole === 'public'
                  ? 'bg-brand-primary text-white shadow'
                  : 'text-content-muted hover:text-content-main'
              }`}
            >
              Public
            </button>
            <button
              onClick={() => handleSwitchRole('researcher')}
              className={`px-2.5 py-0.5 rounded-full font-medium transition-all btn-game ${
                activeRole === 'researcher'
                  ? 'bg-brand-accent text-slate-900 font-bold shadow'
                  : 'text-content-muted hover:text-content-main'
              }`}
            >
              Researcher
            </button>
            <button
              onClick={() => handleSwitchRole('admin')}
              className={`px-2.5 py-0.5 rounded-full font-medium transition-all btn-game ${
                activeRole === 'admin'
                  ? 'bg-brand-purple text-white font-bold shadow'
                  : 'text-content-muted hover:text-content-main'
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-primary p-0.5 shadow-glow-cyan group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-brand-primary animate-pulse" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-content-main tracking-wider flex items-center">
                POLAR<span className="text-brand-primary font-black">QUEST</span>
              </div>
              <div className="text-[10px] tracking-widest text-content-muted uppercase -mt-1 font-mono">
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
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all btn-game ${
                    isActive
                      ? 'bg-bg-secondary text-brand-primary border border-brand-primary/40 font-bold'
                      : 'text-content-muted hover:text-content-main hover:bg-bg-secondary/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                  {link.protectedRole && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-secondary border border-stroke text-content-muted font-mono uppercase">
                      {link.protectedRole}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Auth Action & Theme Toggle */}
          <div className="flex items-center space-x-3">
            {/* Sun / Moon Theme Switcher */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2.5 rounded-xl bg-bg-secondary border border-stroke text-brand-primary btn-game shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-semantic-warning animate-spin" style={{ animationDuration: '20s' }} />
              ) : (
                <Moon className="w-4 h-4 text-brand-primary" />
              )}
            </button>

            {userEmail ? (
              <div className="flex items-center space-x-2 bg-bg-secondary border border-stroke px-3 py-1.5 rounded-xl">
                <UserCheck className="w-4 h-4 text-brand-primary" />
                <div className="text-xs">
                  <div className="text-content-main font-medium truncate max-w-[120px]">{userEmail}</div>
                  <div className="text-content-muted capitalize text-[10px]">{activeRole} Mode</div>
                </div>
                <button
                  onClick={() => handleSwitchRole('public')}
                  title="Logout"
                  className="text-content-muted hover:text-semantic-danger p-1 rounded transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 bg-gradient-to-r from-brand-primary to-brand-primary-hover text-white font-semibold px-4 py-2 rounded-xl text-sm btn-game shadow-glow-indigo"
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


