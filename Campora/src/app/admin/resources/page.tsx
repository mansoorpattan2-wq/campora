'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useResora } from '@/context/ResoraContext';
import { StatusBadge } from '@/components/common/Badge';
import { Resource } from '@/types';
import { Boxes, Plus, Search, Edit, Wrench, CheckCircle2, X } from 'lucide-react';

export default function AdminResourceManagementPage() {
  const { resources, addResource, toggleMaintenance } = useResora();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New resource form state
  const [name, setName] = useState('');
  const [type, setType] = useState<'Lab' | 'Room' | 'Equipment' | 'Facility' | 'Bundle'>('Lab');
  const [building, setBuilding] = useState('Block A');
  const [floor, setFloor] = useState('Floor 1');
  const [capacity, setCapacity] = useState(30);
  const [department, setDepartment] = useState('CSE');
  const [features, setFeatures] = useState('Wi-Fi, Projector, AC');

  const categories = ['All', 'Lab', 'Room', 'Equipment', 'Facility', 'Bundle'];

  const filteredResources = resources.filter(res => {
    const matchesCat = selectedCategory === 'All' || res.type === selectedCategory;
    const matchesQuery =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addResource({
      name,
      type,
      building,
      floor,
      capacity,
      department,
      status: 'AVAILABLE',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
      features: features.split(',').map(f => f.trim()),
    });

    setIsAddModalOpen(false);
    setName('');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Administration</span>
              <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
                Manage Campus Resources
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Add, edit, toggle maintenance, or configure access permissions for campus spaces and equipment
              </p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-brand-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Resource</span>
            </button>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Resource Management Table matching Screenshot #10 */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-6">Resource Name</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Capacity</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredResources.map(res => (
                    <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">{res.name}</td>
                      <td className="py-4 px-4 text-slate-600 font-medium">{res.type}</td>
                      <td className="py-4 px-4 font-semibold text-brand-600">{res.department}</td>
                      <td className="py-4 px-4 text-slate-500">{res.building} · {res.floor}</td>
                      <td className="py-4 px-4 font-semibold text-slate-800">{res.capacity} Seats</td>
                      <td className="py-4 px-4">
                        <StatusBadge status={res.status} />
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => toggleMaintenance(res.id, 'Routine administrator inspection')}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                            res.status === 'MAINTENANCE'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          }`}
                        >
                          {res.status === 'MAINTENANCE' ? 'Restore Service' : 'Toggle Repair'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add Resource Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Campus Resource</h3>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreateResource} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Resource Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Robotics Lab 2"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option value="Lab">Lab</option>
                    <option value="Room">Room</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Facility">Facility</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Central">Central</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Building</label>
                  <input
                    type="text"
                    value={building}
                    onChange={e => setBuilding(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={e => setCapacity(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Features (Comma separated)</label>
                <input
                  type="text"
                  value={features}
                  onChange={e => setFeatures(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow-md mt-2"
              >
                Create Resource
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
