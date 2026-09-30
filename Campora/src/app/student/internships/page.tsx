'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { Globe, Calendar, Briefcase, ArrowRight } from 'lucide-react';

export default function InternshipsPage() {
  const { opportunities, applyToOpportunity } = useResora();
  const internships = opportunities.filter(o => o.type === 'INTERNSHIP');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Career Opportunities</span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Tech Internships
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Apply for software engineering, AI, and research internships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internships.map(it => (
              <div key={it.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {it.type}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Apply by: {it.deadline}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-3">{it.title}</h3>
                  <p className="text-xs text-slate-500">{it.organization}</p>
                  <p className="text-xs text-slate-600 mt-2">{it.description}</p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {it.tags.map(t => (
                      <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600">{it.stipendOrPrize}</span>
                  <button
                    onClick={() => applyToOpportunity(it.id)}
                    disabled={it.applied}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      it.applied
                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                        : 'bg-brand-600 hover:bg-brand-700 text-white shadow-md'
                    }`}
                  >
                    {it.applied ? 'Applied ✓' : 'Apply Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
