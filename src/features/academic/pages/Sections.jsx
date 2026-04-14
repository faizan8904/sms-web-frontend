import React, { useState } from 'react';
import { 
    Users, 
    Plus, 
    Edit2, 
    Trash2, 
    LayoutGrid,
    CheckCircle2,
    Activity,
    Save,
    X,
    Shield
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialSections = [
    { name: 'Section A', activeInstances: 12, capacity: 500, id: 'SA' },
    { name: 'Section B', activeInstances: 10, capacity: 450, id: 'SB' },
    { name: 'Section C', activeInstances: 8, capacity: 350, id: 'SC' },
    { name: 'Section D', activeInstances: 4, capacity: 150, id: 'SD' },
];

export default function Sections() {
    const [sections, setSections] = useState(initialSections);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSection, setEditingSection] = useState(null);
    const [formData, setFormData] = useState({ name: '', capacity: '' });

    const handleOpenDialog = (sec = null) => {
        if (sec) {
            setEditingSection(sec);
            setFormData({ name: sec.name, capacity: sec.capacity.toString() });
        } else {
            setEditingSection(null);
            setFormData({ name: '', capacity: '' });
        }
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!formData.name) return;

        if (editingSection) {
            setSections(prev => prev.map(s => s.id === editingSection.id ? { 
                ...s, 
                name: formData.name, 
                capacity: parseInt(formData.capacity) || 0
            } : s));
        } else {
            const newSection = {
                id: `SEC${Date.now()}`,
                name: formData.name,
                activeInstances: 0,
                capacity: parseInt(formData.capacity) || 0
            };
            setSections(prev => [...prev, newSection]);
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this master section?')) {
            setSections(prev => prev.filter(s => s.id !== id));
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 bg-[#f8f7fc] min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                        Academic <span className="text-purple-600">Sections</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Manage specific student sections and their global operational limits.</p>
                </div>
                <button 
                    onClick={() => handleOpenDialog()}
                    className="flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all active:scale-95 group"
                >
                    <Plus size={20} />
                    New Master Section
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sections.map((sec) => (
                    <div key={sec.id} className="bg-white p-8 rounded-[40px] border border-slate-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Users size={64} className="text-slate-900" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 shadow-inner">
                                <LayoutGrid size={24} />
                            </div>
                            
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">{sec.name}</h3>
                            
                            <div className="flex flex-col gap-4 mb-8">
                                <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Active usage</span>
                                    <span className="text-xs font-bold text-slate-900">{sec.activeInstances} Classes</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total Capacity</span>
                                    <span className="text-xs font-bold text-slate-900">{sec.capacity} Seats</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                                <button 
                                    onClick={() => handleOpenDialog(sec)}
                                    className="flex-1 py-3 bg-slate-50 hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 rounded-2xl text-[8px] font-black uppercase tracking-widest transition-all"
                                >
                                    Update Label
                                </button>
                                <button 
                                    onClick={() => handleDelete(sec.id)}
                                    className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white/40 backdrop-blur-md rounded-[40px] p-8 border border-white shadow-xl mt-4">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
                        <Activity size={32} />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">System Utilization</h4>
                        <p className="text-slate-500 text-sm font-medium">Currently using {sections.length} sections across multiple academic classes with optimal occupancy.</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <div className="px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 text-[10px] font-black uppercase text-emerald-500 flex items-center gap-2">
                            <CheckCircle2 size={14} />
                            Optimal Flow
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog Component - Redesigned for Ultra-Premium feel */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[480px] rounded-[48px] border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] p-0 overflow-hidden bg-white/80 backdrop-blur-3xl ring-1 ring-white/50">
                    {/* Artistic Header */}
                    <div className="relative p-10 pb-6 overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
                        
                        <div className="relative z-10 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-900/20">
                                <Shield size={32} />
                            </div>
                            <div>
                                <DialogTitle className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-1">
                                    {editingSection ? 'Modify' : 'New'} <span className="text-purple-600">Section</span>
                                </DialogTitle>
                                <DialogDescription className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                    Infrastructure Management
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                    
                    {/* Elegant Form Body */}
                    <div className="p-10 pt-4 space-y-8 bg-slate-50/30">
                        <div className="space-y-6">
                            <div className="group/field">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block group-focus-within/field:text-purple-600 transition-colors">Section Name</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/field:text-purple-500 transition-colors">
                                        <LayoutGrid size={18} />
                                    </div>
                                    <Input
                                        placeholder="e.g. Section Alpha"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="rounded-3xl bg-slate-50/50 border-slate-100 pl-14 pr-6 py-8 font-black text-slate-700 placeholder:text-slate-300 focus:bg-white focus:ring-[12px] focus:ring-purple-500/5 focus:border-purple-300 transition-all border-2"
                                    />
                                </div>
                            </div>

                            <div className="group/field">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block group-focus-within/field:text-purple-600 transition-colors">Global Seat Capacity</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/field:text-purple-500 transition-colors">
                                        <Users size={18} />
                                    </div>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={formData.capacity}
                                        onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                                        className="rounded-3xl bg-slate-50/50 border-slate-100 pl-14 pr-6 py-8 font-black text-slate-700 focus:bg-white focus:ring-[12px] focus:ring-purple-500/5 focus:border-purple-300 transition-all border-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Minimalist Footer */}
                    <DialogFooter className="px-10 py-8 bg-slate-50/30 flex gap-4 sm:justify-end border-t border-slate-100/50">
                        <Button 
                            variant="ghost" 
                            onClick={() => setIsDialogOpen(false)}
                            className="rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 px-6 h-14 transition-all"
                        >
                            Dismiss
                        </Button>
                        <Button 
                            onClick={handleSave}
                            className="bg-slate-900 hover:bg-black text-white px-10 h-14 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-95 flex items-center gap-3"
                        >
                            {editingSection ? 'Sync Structure' : 'Deploy Section'}
                            {editingSection ? <Save size={16} /> : <Plus size={16} />}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
