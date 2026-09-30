'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { BookOpen, GraduationCap, Trophy, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ExamPrepPage() {
  const exams = [
    { title: 'GATE Computer Science 2027', subjects: 'Algorithms, OS, DBMS, Networks, Theory of Comp', syllabus: 68 },
    { title: 'CAT & Higher Management Exams', subjects: 'Quantitative Aptitude, Verbal, DILR', syllabus: 82 },
    { title: 'GRE General Examination', subjects: 'Verbal Reasoning, Quant, Analytical Writing', syllabus: 55 },
    { title: 'University Semester Exams (CSE 6th Sem)', subjects: 'AI, Mobile Computing, Web Technologies', syllabus: 90 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Higher Studies & Exams</span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Exam Preparation Hub
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Study resources, mock tests & syllabus trackers for competitive exams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((ex, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{ex.title}</h3>
                      <p className="text-[11px] text-slate-500">{ex.subjects}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600">Syllabus Completion</span>
                    <span className="text-slate-900">{ex.syllabus}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${ex.syllabus}%` }} />
                  </div>
                </div>

                <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 transition-all">
                  <span>Take Practice Test</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
