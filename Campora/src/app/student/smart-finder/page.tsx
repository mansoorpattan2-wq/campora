'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { MultiStepBookingModal } from '@/components/booking/MultiStepBookingModal';
import { Resource } from '@/types';
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, Cpu, Wifi, Projector, Users, Clock } from 'lucide-react';
import { StatusBadge } from '@/components/common/Badge';

export default function SmartResourceFinderPage() {
  const { parseSmartQuery } = useResora();

  const [queryInput, setQueryInput] = useState(
    'I need a lab for 8 students tomorrow from 2 PM to 6 PM with Wi-Fi, Arduino kits and a projector.'
  );

  const [searchResult, setSearchResult] = useState<ReturnType<typeof parseSmartQuery> | null>(
    parseSmartQuery(queryInput)
  );

  const [bookingModalRes, setBookingModalRes] = useState<Resource | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    const res = parseSmartQuery(queryInput);
    setSearchResult(res);
  };

  const handlePresetClick = (text: string) => {
    setQueryInput(text);
    const res = parseSmartQuery(text);
    setSearchResult(res);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-card">
            <div className="relative z-10 space-y-3">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Resora AI Assistant</span>
              </span>
              <h1 className="text-3xl font-extrabold font-heading">Tell us what you need.</h1>
              <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
                Describe your project, lab requirements, gear needs, or team size in plain English. Our smart match algorithm finds the best space instantly.
              </p>
            </div>
          </div>

          {/* AI Prompt Input Bar */}
          <form onSubmit={handleSearch} className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-soft space-y-3">
            <div className="relative">
              <textarea
                rows={3}
                value={queryInput}
                onChange={e => setQueryInput(e.target.value)}
                placeholder="Example: I need a lab for 8 students tomorrow from 2 PM to 6 PM with Wi-Fi, Arduino kits and a projector."
                className="w-full p-4 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="absolute bottom-3 right-3 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run AI Smart Match</span>
              </button>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-medium">Try Presets:</span>
              <button
                type="button"
                onClick={() =>
                  handlePresetClick('I need a lab for 8 students tomorrow from 2 PM to 6 PM with Wi-Fi, Arduino kits and a projector.')
                }
                className="text-[11px] bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1 rounded-xl transition-colors"
              >
                8 Students + Arduino + Projector (Requirement Demo)
              </button>
              <button
                type="button"
                onClick={() =>
                  handlePresetClick('Need high performance GPU workstation for deep learning model training for 3 hours.')
                }
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-xl transition-colors"
              >
                GPU Deep Learning Node
              </button>
              <button
                type="button"
                onClick={() =>
                  handlePresetClick('Auditorium hall for 200 people with Dolby surround sound audio and live streaming rig.')
                }
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-xl transition-colors"
              >
                Seminar Hall Auditorium
              </button>
            </div>
          </form>

          {/* AI Extracted Parameters Breakdown & Matching Results */}
          {searchResult && (
            <div className="space-y-6">
              {/* Extracted Parameters Card */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  AI Extracted Requirements
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">People</span>
                      <strong className="text-slate-900">{searchResult.extractedRequirements.people} Students</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Duration</span>
                      <strong className="text-slate-900">{searchResult.extractedRequirements.durationHours} Hours</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Wi-Fi</span>
                      <strong className="text-slate-900">{searchResult.extractedRequirements.wifi ? 'Required ✓' : 'Optional'}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Arduino Kits</span>
                      <strong className="text-slate-900">{searchResult.extractedRequirements.arduino ? 'Required ✓' : 'Optional'}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center space-x-2">
                    <Projector className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Projector</span>
                      <strong className="text-slate-900">{searchResult.extractedRequirements.projector ? 'Required ✓' : 'Optional'}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Results */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  Smart Match Recommendations ({searchResult.matches.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {searchResult.matches.map(m => (
                    <div
                      key={m.resource.id}
                      className="bg-white rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-card transition-all overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-40">
                          <img
                            src={m.resource.imageUrl}
                            alt={m.resource.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-purple-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                            {m.matchScore}% Match
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <StatusBadge status={m.resource.status} />
                          </div>
                        </div>

                        <div className="p-5 space-y-3">
                          <div>
                            <h4 className="text-base font-bold text-slate-900">{m.resource.name}</h4>
                            <p className="text-xs text-slate-500">{m.resource.building} · Capacity {m.resource.capacity}</p>
                          </div>

                          <div className="space-y-1 bg-purple-50/50 p-3 rounded-2xl border border-purple-100 text-[11px] text-purple-950">
                            <strong className="block text-purple-900">Why it matched:</strong>
                            <ul className="space-y-1 list-disc list-inside text-slate-700">
                              {m.reasons.map((r, i) => (
                                <li key={i}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 border-t border-slate-100">
                        <button
                          onClick={() => setBookingModalRes(m.resource)}
                          disabled={m.resource.status === 'MAINTENANCE'}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all ${
                            m.resource.status === 'MAINTENANCE'
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-md'
                          }`}
                        >
                          <span>Reserve Space</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
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
