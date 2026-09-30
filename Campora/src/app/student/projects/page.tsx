'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { MultiStepBookingModal } from '@/components/booking/MultiStepBookingModal';
import { FolderGit2, Users, CalendarCheck, CheckCircle2, Plus } from 'lucide-react';

export default function StudentProjectsPage() {
  const { projects } = useResora();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Capstone Portfolio</span>
              <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
                My Student Projects
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Collaborate with team members, track milestones, and request campus lab resources
              </p>
            </div>

            <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md">
              <Plus className="w-4 h-4" />
              <span>Create New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(pj => (
              <div key={pj.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    {pj.status}
                  </span>
                  <span className="text-xs text-slate-500">Mentor: <strong>{pj.mentor}</strong></span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{pj.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{pj.description}</p>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600">Milestone Progress</span>
                    <span className="text-slate-900">{pj.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-600 rounded-full" style={{ width: `${pj.progress}%` }} />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Team Members</span>
                  <div className="flex flex-wrap gap-1">
                    {pj.teamMembers.map(m => (
                      <span key={m} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Required: <strong>{pj.requiredResources.join(', ')}</strong>
                  </span>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Request Resources</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <MultiStepBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
