'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { BookOpen, Calendar, Clock, MapPin } from 'lucide-react';

export default function FacultyClassesPage() {
  const classesList = [
    { code: 'CSE-301', title: 'Database Management Systems', section: 'CSE-A', room: 'Room 302', time: 'Mon, Wed 09:00 AM - 10:30 AM', students: 58 },
    { code: 'CSE-402', title: 'Operating Systems & Kernel Dev', section: 'CSE-B', room: 'Lab 1', time: 'Tue, Thu 11:00 AM - 01:00 PM', students: 45 },
    { code: 'CSE-490', title: 'Artificial Intelligence & Neural Nets', section: 'CSE-AI', room: 'Innovation Lab', time: 'Fri 02:00 PM - 05:00 PM', students: 40 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Academic Schedule</span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              My Assigned Classes & Labs
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Semester teaching schedule, room allocations, and enrolled student rosters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {classesList.map((cls, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    {cls.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{cls.students} Enrolled</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{cls.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Section: {cls.section}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <p className="flex items-center gap-1.5 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {cls.time}
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {cls.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
