'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { StatusBadge } from '@/components/common/Badge';
import { CheckSquare, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function FacultyApprovalsPage() {
  const { bookings, approveBooking, rejectBooking } = useResora();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Faculty Governance</span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Student Resource Booking Approvals
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Review, approve, or reject student requests for lab space and specialized hardware
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
            <div className="divide-y divide-slate-100">
              {bookings.map(b => (
                <div key={b.id} className="p-6 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-base font-bold text-slate-900">{b.resourceName}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-100 text-brand-700">
                        #{b.bookingCode}
                      </span>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-xs text-slate-600">
                      Requested by student: <strong>{b.userName}</strong> ({b.userRole})
                    </p>
                    <p className="text-xs text-slate-500">
                      Location: {b.location} · Purpose: <strong>{b.purpose}</strong> · Date: {b.date} ({b.startTime} - {b.endTime})
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {b.status === 'PENDING' ? (
                      <>
                        <button
                          onClick={() => approveBooking(b.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve Request</span>
                        </button>
                        <button
                          onClick={() => rejectBooking(b.id, 'Schedule conflict with department class.')}
                          className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold rounded-xl text-xs flex items-center space-x-1 transition-all"
                        >
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Reject</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 italic">Action Completed</span>
                    )}
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
