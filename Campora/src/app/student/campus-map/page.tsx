'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { CampusMap } from '@/components/map/CampusMap';
import { MultiStepBookingModal } from '@/components/booking/MultiStepBookingModal';
import { Resource } from '@/types';

export default function StudentCampusMapPage() {
  const [bookingModalRes, setBookingModalRes] = useState<Resource | null>(null);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
              Smart Campus Visual Map
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Locate labs, buildings, equipment centers, and check live space status
            </p>
          </div>

          <CampusMap onSelectResource={res => setBookingModalRes(res)} />
        </main>
      </div>

      <MultiStepBookingModal
        isOpen={!!bookingModalRes}
        onClose={() => setBookingModalRes(null)}
        preSelectedResource={bookingModalRes}
      />
    </div>
  );
}
