'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { Briefcase, CheckCircle2, BookOpen, Code, Terminal, MessageSquare, ArrowRight } from 'lucide-react';

export default function PlacementsPage() {
  const { progress } = useResora();

  const placementModules = [
    { title: 'Data Structures & Algorithms (DSA)', score: progress.dsaScore, topics: ['Arrays & Strings', 'Trees & Graphs', 'Dynamic Programming'], icon: Code, color: 'text-brand-600 bg-brand-50' },
    { title: 'Quantitative & Logical Aptitude', score: progress.aptitudeScore, topics: ['Permutations & Probability', 'Data Interpretation', 'Logical Reasoning'], icon: Terminal, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'CS Core Fundamentals', score: progress.csFundamentalsScore, topics: ['Operating Systems', 'DBMS & SQL', 'Computer Networks'], icon: BookOpen, color: 'text-amber-600 bg-amber-50' },
    { title: 'Mock Interviews & Soft Skills', score: progress.communicationScore, topics: ['HR Technical Round', 'System Design Intro', 'Behavioral Questions'], icon: MessageSquare, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Career Readiness</span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Placement Preparation Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track your DSA, Aptitude, CS Fundamentals, and Interview prep milestones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {placementModules.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center font-bold`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                    </div>
                    <span className="text-sm font-extrabold text-slate-900 font-heading">{m.score}%</span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-600 rounded-full" style={{ width: `${m.score}%` }} />
                  </div>

                  <div className="space-y-1.5 pt-2 text-xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Key Modules</span>
                    {m.topics.map(t => (
                      <div key={t} className="flex items-center space-x-2 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 transition-all">
                    <span>Practice Questions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
