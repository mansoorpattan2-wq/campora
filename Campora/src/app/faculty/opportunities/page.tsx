'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { GraduationCap, Trophy, Globe } from 'lucide-react';

export default function FacultyOpportunitiesPage() {
  const { opportunities } = useResora();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Student Guidance</span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Academic & Research Opportunities
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Recommend research grants, hackathons, and industry internships to mentored students
            </p>
          </div>

          <div className="space-y-4">
            {opportunities.map(opp => (
              <div key={opp.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-slate-900">{opp.title}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                      {opp.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{opp.organization} · Deadline: {opp.deadline}</p>
                  <p className="text-xs text-slate-600 mt-1">{opp.description}</p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm">
                  Recommend to Class
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
