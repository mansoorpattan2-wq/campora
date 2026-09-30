'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { StatusBadge } from '@/components/common/Badge';
import { MultiStepBookingModal } from '@/components/booking/MultiStepBookingModal';
import { Resource } from '@/types';
import { Search, Filter, Sparkles, Building2, MapPin, Users, ArrowRight } from 'lucide-react';

export default function StudentResourcesPage() {
  const { resources } = useResora();
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [bookingModalRes, setBookingModalRes] = useState<Resource | null>(null);

  const categories = ['All', 'Labs', 'Rooms', 'Equipment', 'Facility', 'Bundle'];

  const filteredResources = resources.filter(res => {
    const matchesCat =
      selectedType === 'All' ||
      res.type === selectedType ||
      (selectedType === 'Labs' && res.type === 'Lab') ||
      (selectedType === 'Rooms' && res.type === 'Room');
    const matchesQuery =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
                Explore Campus Resources
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Browse labs, study rooms, microcontrollers, projectors, and compute nodes
              </p>
            </div>

            <Link
              href="/student/smart-finder"
              className="px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Ask AI Smart Finder</span>
            </Link>
          </div>

          {/* Search & Filter Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by resource name, building or department..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedType(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedType === cat
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Resource Cards Grid matching UI screenshot #5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(res => (
              <div
                key={res.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={res.imageUrl}
                      alt={res.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <StatusBadge status={res.status} />
                    </div>
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                      {res.type}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">
                        {res.department} Dept
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        Cap: {res.capacity}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {res.name}
                    </h3>

                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {res.building} · {res.floor}
                    </p>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {res.features.slice(0, 4).map(f => (
                        <span key={f} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center space-x-2">
                  <Link
                    href={`/student/resources/${res.id}`}
                    className="flex-1 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-center font-semibold rounded-xl text-xs transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => setBookingModalRes(res)}
                    disabled={res.status === 'MAINTENANCE'}
                    className={`flex-1 py-2 font-bold rounded-xl text-xs transition-all ${
                      res.status === 'MAINTENANCE'
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                    }`}
                  >
                    {res.status === 'MAINTENANCE' ? 'Under Repair' : 'Book Space'}
                  </button>
                </div>
              </div>
            ))}
          </div>
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
