'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useResora } from '@/context/ResoraContext';
import { UserRole } from '@/types';
import { GraduationCap, UserCheck, Shield, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useResora();

  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [email, setEmail] = useState('aryan@college.edu');
  const [password, setPassword] = useState('••••••••••••');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);

    if (selectedRole === 'STUDENT') router.push('/student/dashboard');
    else if (selectedRole === 'FACULTY') router.push('/faculty/dashboard');
    else router.push('/admin/dashboard');
  };

  const handleQuickDemo = (role: UserRole) => {
    setSelectedRole(role);
    setRole(role);
    if (role === 'STUDENT') {
      setEmail('student@resora.demo');
      router.push('/student/dashboard');
    } else if (role === 'FACULTY') {
      setEmail('faculty@resora.demo');
      router.push('/faculty/dashboard');
    } else {
      setEmail('admin@resora.demo');
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 font-sans">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 min-h-[620px]">
        {/* Left Form Section */}
        <div className="p-8 sm:p-12 flex flex-col justify-between">
          <div>
            {/* Logo Header */}
            <Link href="/" className="inline-flex items-center space-x-3 mb-8 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-bold font-heading text-2xl shadow-glow">
                R
              </div>
              <span className="font-bold text-slate-900 text-xl tracking-tight">RESORA</span>
            </Link>

            <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-xs text-slate-500 mt-1">Continue your campus journey</p>

            {/* Role Selector Segmented Switcher */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 mt-6">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('STUDENT');
                  setEmail('student@resora.demo');
                }}
                className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition-all ${
                  selectedRole === 'STUDENT'
                    ? 'bg-white text-brand-600 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('FACULTY');
                  setEmail('faculty@resora.demo');
                }}
                className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition-all ${
                  selectedRole === 'FACULTY'
                    ? 'bg-white text-emerald-600 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Faculty</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('ADMIN');
                  setEmail('admin@resora.demo');
                }}
                className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition-all ${
                  selectedRole === 'ADMIN'
                    ? 'bg-white text-purple-600 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSignIn} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email or Roll Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-brand-600 focus:ring-brand-500" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-brand-600 hover:underline font-medium">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow-md shadow-brand-500/20 flex items-center justify-center space-x-2 transition-all"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Credentials Buttons */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2 text-center uppercase tracking-wider">
                1-Click Demo Login Shortcuts
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleQuickDemo('STUDENT')}
                  className="p-2 border border-slate-200 hover:border-brand-500 bg-slate-50 hover:bg-brand-50 rounded-xl text-[11px] font-semibold text-slate-700 text-center transition-all"
                >
                  Student Demo
                </button>
                <button
                  onClick={() => handleQuickDemo('FACULTY')}
                  className="p-2 border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50 rounded-xl text-[11px] font-semibold text-slate-700 text-center transition-all"
                >
                  Faculty Demo
                </button>
                <button
                  onClick={() => handleQuickDemo('ADMIN')}
                  className="p-2 border border-slate-200 hover:border-purple-500 bg-slate-50 hover:bg-purple-50 rounded-xl text-[11px] font-semibold text-slate-700 text-center transition-all"
                >
                  Admin Demo
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-brand-600 font-semibold hover:underline">Sign up</a>
          </div>
        </div>

        {/* Right Campus Visual Hero matching UI Screenshot #2 */}
        <div className="bg-slate-900 text-white p-12 flex flex-col justify-between relative overflow-hidden hidden lg:flex">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
            alt="Campus"
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-brand-500/30 text-brand-300 rounded-full text-xs font-semibold mb-4 border border-brand-500/40">
              Campus Intelligence Ecosystem
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight leading-tight">
              Learn.<br />Book.<br />Grow.<br />All In One Place.
            </h3>
          </div>

          <div className="relative z-10 space-y-3">
            {[
              'Campus Resources & Smart Finder',
              'Placements & Exam Roadmaps',
              'Hackathons & Internships',
              'Personalized Skill Progress',
            ].map(item => (
              <div key={item} className="flex items-center space-x-2 text-xs font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10 text-[11px] text-slate-400">
            © 2026 RESORA · Smart Campus Platform
          </div>
        </div>
      </div>
    </div>
  );
}
