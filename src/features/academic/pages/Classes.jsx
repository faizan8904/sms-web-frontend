import React, { useState } from 'react';
import { 
    GraduationCap, 
    Plus, 
    Edit2, 
    Trash2, 
    Layers, 
    Search,
    ChevronRight,
    Users,
    Save,
    X,
    LayoutGrid
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

const initialClasses = [
    { name: 'Grade 1', students: 85, sections: 3, id: 'G1' },
    { name: 'Grade 2', students: 92, sections: 3, id: 'G2' },
    { name: 'Grade 3', students: 78, sections: 2, id: 'G3' },
    { name: 'Grade 4', students: 105, sections: 4, id: 'G4' },
    { name: 'Grade 5', students: 88, sections: 3, id: 'G5' },
    { name: 'Grade 6', students: 112, sections: 4, id: 'G6' },
];

export default function Classes() {
    const [classes, setClasses] = useState(initialClasses);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [formData, setFormData] = useState({ name: '', sections: '', students: '' });

    const handleOpenDialog = (cls = null) => {
        if (cls) {
            setEditingClass(cls);
            setFormData({ name: cls.name, sections: cls.sections.toString(), students: cls.students.toString() });
        } else {
            setEditingClass(null);
            setFormData({ name: '', sections: '', students: '' });
        }
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!formData.name) return;

        if (editingClass) {
            setClasses(prev => prev.map(c => c.id === editingClass.id ? { 
                ...c, 
                name: formData.name, 
                sections: parseInt(formData.sections) || 0,
                students: parseInt(formData.students) || 0
            } : c));
        } else {
            const newClass = {
                id: `G${Date.now()}`,
                name: formData.name,
                sections: parseInt(formData.sections) || 0,
                students: parseInt(formData.students) || 0
            };
            setClasses(prev => [...prev, newClass]);
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this grade level?')) {
            setClasses(prev => prev.filter(c => c.id !== id));
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 bg-[#f8f7fc] min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                        Grade <span className="text-purple-600">Levels</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Define and organize the primary grade levels of your school.</p>
                </div>
                <button 
                    onClick={() => handleOpenDialog()}
                    className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-purple-100 transition-all active:scale-95 group"
                >
                    <Plus size={20} />
                    Create New Class
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {classes.map((cls) => (
                    <div key={cls.id} className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-purple-50/50 transition-all group flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-inner">
                                <GraduationCap size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">{cls.name}</h3>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Layers size={12} className="text-purple-400" />
                                        {cls.sections} Sections
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Users size={12} className="text-purple-400" />
                                        {cls.students} Students
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => handleOpenDialog(cls)}
                                className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-400 hover:text-purple-600 rounded-xl transition-all"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button 
                                onClick={() => handleDelete(cls.id)}
                                className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                
            </div>

            {/* Dialog Component - Redesigned for Ultra-Premium feel */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[480px] rounded-[48px] border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] p-0 overflow-hidden bg-white/80 backdrop-blur-3xl ring-1 ring-white/50">
                    {/* Artistic Header */}
                    <div className="relative p-10 pb-6 overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
                        
                        <div className="relative z-10 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-900/20 group-hover:scale-110 transition-transform">
                                <GraduationCap size={32} />
                            </div>
                            <div>
                                <DialogTitle className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-1">
                                    {editingClass ? 'Update' : 'New'} <span className="text-purple-600">Grade</span>
                                </DialogTitle>
                                <DialogDescription className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                    Academic Year 2024-2025
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                    
                    {/* Elegant Form Body */}
                    <div className="p-10 pt-4 space-y-8 bg-slate-50/30">
                        <div className="space-y-6">
                            <div className="group/field">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block group-focus-within/field:text-purple-600 transition-colors">Class Identity</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/field:text-purple-500 transition-colors">
                                        <Layers size={18} />
                                    </div>
                                    <Input
                                        placeholder="e.g. Senior Grade 12"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="rounded-3xl bg-slate-50/50 border-slate-100 pl-14 pr-6 py-8 font-black text-slate-700 placeholder:text-slate-300 focus:bg-white focus:ring-[12px] focus:ring-purple-500/5 focus:border-purple-300 transition-all border-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="group/field">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block group-focus-within/field:text-purple-600 transition-colors">Sections</label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/field:text-purple-500 transition-colors">
                                            <LayoutGrid size={18} />
                                        </div>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={formData.sections}
                                            onChange={(e) => setFormData(prev => ({ ...prev, sections: e.target.value }))}
                                            className="rounded-3xl bg-slate-50/50 border-slate-100 pl-14 pr-6 py-8 font-black text-slate-700 focus:bg-white focus:ring-[12px] focus:ring-purple-500/5 focus:border-purple-300 transition-all border-2"
                                        />
                                    </div>
                                </div>
                                <div className="group/field">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block group-focus-within/field:text-purple-600 transition-colors">Capacity</label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/field:text-purple-500 transition-colors">
                                            <Users size={18} />
                                        </div>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={formData.students}
                                            onChange={(e) => setFormData(prev => ({ ...prev, students: e.target.value }))}
                                            className="rounded-3xl bg-slate-50/50 border-slate-100 pl-14 pr-6 py-8 font-black text-slate-700 focus:bg-white focus:ring-[12px] focus:ring-purple-500/5 focus:border-purple-300 transition-all border-2"
                                        />
                                    </div>
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
                            {editingClass ? 'Sync Updates' : 'Launch Grade'}
                            {editingClass ? <Save size={16} /> : <Plus size={16} />}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
