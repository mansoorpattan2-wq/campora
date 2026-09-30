'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { GraduationCap, Bookmark, Share2, Calendar, Trophy, Globe, BookOpen } from 'lucide-react';

export default function OpportunitiesPage() {
  const { opportunities, toggleSaveOpportunity, applyToOpportunity } = useResora();
  const [filterType, setFilterType] = useState('All');

  const filteredOpps = opportunities.filter(o => filterType === 'All' || o.type === filterType);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Campus Ecosystem</span>
              <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
                Unified Opportunities Feed
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Hackathons, internships, competitions, workshops, scholarships & research projects
              </p>
            </div>

            <div className="flex space-x-2">
              {['All', 'HACKATHON', 'INTERNSHIP', 'COMPETITION', 'WORKSHOP'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    filterType === t
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredOpps.map(opp => (
              <div
                key={opp.id}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4 hover:border-brand-300 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-slate-900">{opp.title}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                        {opp.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">{opp.organization} · Deadline: {opp.deadline}</p>
                    <p className="text-xs text-slate-600 mt-1">{opp.description}</p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {opp.tags.map(t => (
                        <span key={t} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleSaveOpportunity(opp.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      opp.saved
                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                        : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => applyToOpportunity(opp.id)}
                    disabled={opp.applied}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      opp.applied
                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                        : 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20'
                    }`}
                  >
                    {opp.applied ? 'Applied ✓' : 'Apply Opportunity'}
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
