'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useResora } from '@/context/ResoraContext';
import { QrCode, CheckCircle2, AlertTriangle, ArrowLeft, Camera, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckInScannerPage() {
  const { checkInBooking } = useResora();
  const [inputCode, setInputCode] = useState('RES-9842');
  const [scanResult, setScanResult] = useState<{
    success?: boolean;
    message?: string;
    booking?: any;
  } | null>(null);

  const handleVerifyCheckIn = (codeToVerify?: string) => {
    const code = codeToVerify || inputCode;
    const res = checkInBooking(code);
    setScanResult(res);

    if (res.success) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans select-none">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/student/dashboard"
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
          <span className="px-3 py-1 bg-brand-500/20 text-brand-400 border border-brand-500/30 rounded-full text-xs font-semibold">
            Kiosk Mode
          </span>
        </div>

        {/* Title */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-bold text-xl mx-auto shadow-glow mb-3">
            R
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Campus Door Check-In</h1>
          <p className="text-xs text-slate-400 mt-1">
            Scan your QR Pass or enter your 7-character Booking ID below
          </p>
        </div>

        {/* Camera Viewfinder Mockup */}
        <div className="relative bg-slate-950 rounded-3xl border-2 border-slate-800 p-8 text-center overflow-hidden shadow-2xl">
          {/* Scanner Overlay Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent animate-pulse" />

          <div className="w-48 h-48 mx-auto border-2 border-dashed border-brand-500/60 rounded-2xl flex flex-col items-center justify-center relative bg-slate-900/50">
            <Camera className="w-10 h-10 text-brand-400 mb-2 animate-bounce" />
            <span className="text-[11px] text-slate-400">Position QR Code in Viewfinder</span>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => handleVerifyCheckIn('RES-9842')}
              className="px-3 py-1.5 bg-brand-600/30 hover:bg-brand-600/50 text-brand-300 border border-brand-500/40 rounded-xl text-xs font-semibold transition-all"
            >
              Simulate Scan #RES-9842
            </button>
          </div>
        </div>

        {/* Manual Code Input Form */}
        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Enter Booking Pass ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
                placeholder="e.g. RES-9842"
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs uppercase font-mono font-bold text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                onClick={() => handleVerifyCheckIn()}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs transition-all shadow-md"
              >
                Verify & Check In
              </button>
            </div>
          </div>

          {/* Scan Results Modal / Display */}
          {scanResult && (
            <div
              className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in duration-200 ${
                scanResult.success
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
              }`}
            >
              <div className="flex items-center space-x-2 font-bold text-sm">
                {scanResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                )}
                <span>{scanResult.success ? 'Booking Verified ✓' : 'Verification Failed'}</span>
              </div>
              <p className="text-[11px]">{scanResult.message}</p>

              {scanResult.booking && (
                <div className="mt-3 pt-3 border-t border-emerald-800/60 space-y-1 text-[11px] text-slate-300">
                  <p><strong>Student:</strong> {scanResult.booking.userName}</p>
                  <p><strong>Resource:</strong> {scanResult.booking.resourceName}</p>
                  <p><strong>Time Slot:</strong> {scanResult.booking.startTime} – {scanResult.booking.endTime}</p>
                  <p><strong>ID:</strong> #{scanResult.booking.bookingCode}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
