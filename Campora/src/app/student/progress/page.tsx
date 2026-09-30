'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { TrendingUp, Award, CheckCircle2 } from 'lucide-react';

export default function StudentProgressPage() {
  const { progress } = useResora();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Analytics & Evaluation</span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              My Academic & Placement Progress
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Comprehensive report of skill competencies, lab usage, and placement readiness
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-soft grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-4">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Overall Index</span>
              <h2 className="text-4xl font-extrabold text-slate-900 font-heading">
                Placement Readiness: {progress.overallReadiness}%
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                You are in the top 15% of your batch in CSE. Your strong project score (85%) and aptitude performance (80%) make you eligible for tier-1 campus placements.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Data Structures & Algorithms', score: progress.dsaScore, color: 'bg-brand-600' },
                { label: 'Quantitative Aptitude', score: progress.aptitudeScore, color: 'bg-emerald-500' },
                { label: 'CS Fundamentals (OS, DBMS, Networks)', score: progress.csFundamentalsScore, color: 'bg-amber-500' },
                { label: 'Capstone Projects & Labs', score: progress.projectsScore, color: 'bg-purple-600' },
                { label: 'Communication & Mock Interviews', score: progress.communicationScore, color: 'bg-blue-500' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{item.label}</span>
                    <span className="text-slate-900">{item.score}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
