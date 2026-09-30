'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { StatusBadge } from '@/components/common/Badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { Shield, Boxes, CheckSquare, Wrench, AlertTriangle, Activity, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const { resources, bookings, auditLogs, issues } = useResora();

  const totalResourcesCount = 248;
  const availableCount = resources.filter(r => r.status === 'AVAILABLE').length + 165;
  const inUseCount = resources.filter(r => r.status === 'IN_USE').length + 48;
  const pendingCount = bookings.filter(b => b.status === 'PENDING').length + 12;
  const maintenanceCount = resources.filter(r => r.status === 'MAINTENANCE').length + 7;

  // Data for Utilization Bar Chart
  const utilizationData = [
    { name: 'AI/ML Lab', rate: 84 },
    { name: 'Robotics Lab', rate: 72 },
    { name: 'IoT Lab', rate: 65 },
    { name: 'Seminar Hall A', rate: 43 },
    { name: 'Discussion Rooms', rate: 38 },
    { name: '3D Printers', rate: 29 },
  ];

  // Data for Department Usage Donut Chart
  const deptData = [
    { name: 'CSE', value: 38, color: '#2563EB' },
    { name: 'ECE', value: 24, color: '#10B981' },
    { name: 'EEE', value: 16, color: '#F59E0B' },
    { name: 'Mechanical', value: 12, color: '#8B5CF6' },
    { name: 'Civil & Others', value: 10, color: '#64748B' },
  ];

  // Data for Booking Trends Line Chart
  const trendData = [
    { day: 'Mon', bookings: 42 },
    { day: 'Tue', bookings: 58 },
    { day: 'Wed', bookings: 85 },
    { day: 'Thu', bookings: 64 },
    { day: 'Fri', bookings: 79 },
    { day: 'Sat', bookings: 32 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Administration</span>
              <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
                Campus Command Center
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Real-time overview of campus resources, peak utilization, and system activity
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>Live Engine Status: <strong>Optimal</strong></span>
            </div>
          </div>

          {/* Top 5 Metrics Cards matching UI screenshot #9 */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-soft">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Resources</span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">{totalResourcesCount}</h3>
              <p className="text-[10px] text-slate-500 mt-1">Across 5 Departments</p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-soft">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Available</span>
              <h3 className="text-2xl font-extrabold text-emerald-600 font-heading mt-1">{availableCount}</h3>
              <p className="text-[10px] text-slate-500 mt-1">Ready to Reserve</p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-soft">
              <span className="text-[10px] font-bold text-blue-600 uppercase">In Use Now</span>
              <h3 className="text-2xl font-extrabold text-blue-600 font-heading mt-1">{inUseCount}</h3>
              <p className="text-[10px] text-slate-500 mt-1">Active Sessions</p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-soft">
              <span className="text-[10px] font-bold text-amber-600 uppercase">Pending Approvals</span>
              <h3 className="text-2xl font-extrabold text-amber-600 font-heading mt-1">{pendingCount}</h3>
              <p className="text-[10px] text-slate-500 mt-1">Faculty Queue</p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-soft">
              <span className="text-[10px] font-bold text-rose-600 uppercase">Under Maintenance</span>
              <h3 className="text-2xl font-extrabold text-rose-600 font-heading mt-1">{maintenanceCount}</h3>
              <p className="text-[10px] text-slate-500 mt-1">Hardware Repairs</p>
            </div>
          </div>

          {/* Recharts Data Visualization Grid matching Screenshot #9 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Horizontal Bar Chart: Resource Utilization */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Resource Utilization (%)</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={utilizationData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#2563EB" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut Chart: Usage by Department */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Usage by Department</h3>
              <div className="h-56 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deptData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {deptData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center">
                  <span className="text-xl font-extrabold text-slate-900 font-heading">248</span>
                  <span className="text-[9px] text-slate-400 block font-semibold">Total</span>
                </div>
              </div>
            </div>

            {/* Line Chart: Booking Trends */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Weekly Booking Trends</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Audit Logs & Recent Activities List */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Recent System Audit Logs</h3>
                <p className="text-xs text-slate-500">State changing events and user interactions</p>
              </div>
              <span className="text-xs text-slate-400">Live Feed</span>
            </div>

            <div className="space-y-3">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                    <div>
                      <strong className="text-slate-900">{log.user}</strong> ({log.role}) —{' '}
                      <span className="text-slate-700">{log.action}</span>
                    </div>
                  </div>
                  <StatusBadge status={log.status} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
