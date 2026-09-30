'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { Trophy, Calendar, Users, ArrowRight } from 'lucide-react';

export default function HackathonsPage() {
  const { opportunities, applyToOpportunity } = useResora();
  const hackathons = opportunities.filter(o => o.type === 'HACKATHON' || o.type === 'COMPETITION');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Competitions & Challenges</span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Hackathons & Contests
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Participate in national hackathons, coding contests, and win exciting prizes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathons.map(hk => (
              <div key={hk.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      {hk.type}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Deadline: {hk.deadline}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-3">{hk.title}</h3>
                  <p className="text-xs text-slate-500">{hk.organization}</p>
                  <p className="text-xs text-slate-600 mt-2">{hk.description}</p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {hk.tags.map(t => (
                      <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{hk.stipendOrPrize}</span>
                  <button
                    onClick={() => applyToOpportunity(hk.id)}
                    disabled={hk.applied}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      hk.applied
                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                        : 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20'
                    }`}
                  >
                    {hk.applied ? 'Applied ✓' : 'Register Now'}
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
