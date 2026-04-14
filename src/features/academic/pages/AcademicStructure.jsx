import React, { useState } from 'react';
import { 
    Library, 
    Plus, 
    Users, 
    User, 
    GraduationCap, 
    ArrowRight, 
    MoreVertical,
    CheckCircle2,
    LayoutGrid,
    Search,
    Save,
    Trash2,
    ShieldCheck
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockTeachers = [
    'Dr. Julian Thorne',
    'Dr. Elena Vance',
    'Prof. Marcus Wright',
    'Dr. Sarah Jenkins',
    'Prof. Robert Frost',
    'Dr. Lisa Ray',
    'Mr. John Wick',
    'Ms. Diana Prince'
];

const availableMasterClasses = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
];

const availableMasterSections = [
    'Section A', 'Section B', 'Section C', 'Section D', 'Section E'
];

const initialAcademicStructure = [
    {
        grade: 'Grade 10',
        totalStudents: 120,
        sections: [
            { id: '101', name: 'Section A', classTeacher: 'Dr. Julian Thorne', students: 40, status: 'Full' },
            { id: '102', name: 'Section B', classTeacher: 'Dr. Elena Vance', students: 38, status: 'Active' },
            { id: '103', name: 'Section C', classTeacher: 'Prof. Marcus Wright', students: 42, status: 'Active' }
        ]
    },
    {
        grade: 'Grade 11',
        totalStudents: 156,
        sections: [
            { id: '111', name: 'Section A', classTeacher: 'Dr. Sarah Jenkins', students: 45, status: 'Active' },
            { id: '112', name: 'Section B', classTeacher: 'Prof. Robert Frost', students: 50, status: 'Full' },
            { id: '113', name: 'Section C', classTeacher: 'Dr. Lisa Ray', students: 61, status: 'Active' }
        ]
    },
    {
        grade: 'Grade 12',
        totalStudents: 98,
        sections: [
            { id: '121', name: 'Section A', classTeacher: 'Mr. John Wick', students: 48, status: 'Active' },
            { id: '122', name: 'Section B', classTeacher: 'Ms. Diana Prince', students: 50, status: 'Full' }
        ]
    }
];

export default function AcademicStructure() {
    const [structure, setStructure] = useState(initialAcademicStructure);
    
    // Modal states
    const [isManageOpen, setIsManageOpen] = useState(false);
    const [isAddGradeOpen, setIsAddGradeOpen] = useState(false);
    const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    
    // Selection states
    const [selectedMapping, setSelectedMapping] = useState(null); // { gradeIdx, secIdx }
    const [activeGradeIdx, setActiveGradeIdx] = useState(null);
    
    // Form states
    const [formData, setFormData] = useState({ classTeacher: '', status: 'Active', students: '0', name: '' });
    const [newGradeName, setNewGradeName] = useState('');

    // --- Actions ---

    const handleOpenManage = (gradeIdx, secIdx) => {
        const section = structure[gradeIdx].sections[secIdx];
        setSelectedMapping({ gradeIdx, secIdx });
        setFormData({
            classTeacher: section.classTeacher,
            status: section.status,
            students: section.students.toString(),
            name: section.name
        });
        setIsManageOpen(true);
    };

    const handleOpenAddSection = (gradeIdx) => {
        setActiveGradeIdx(gradeIdx);
        setFormData({ classTeacher: '', status: 'Active', students: '0', name: '' });
        setIsAddSectionOpen(true);
    };

    const handleAddGrade = () => {
        if (!newGradeName) return;
        const newGrade = {
            grade: newGradeName,
            totalStudents: 0,
            sections: []
        };
        setStructure(prev => [...prev, newGrade]);
        setNewGradeName('');
        setIsAddGradeOpen(false);
    };

    const handleAddSection = () => {
        if (!formData.name || activeGradeIdx === null) return;
        
        const newSection = {
            id: `SEC${Date.now()}`,
            name: formData.name,
            classTeacher: formData.classTeacher,
            status: formData.status,
            students: parseInt(formData.students) || 0
        };

        const newStructure = [...structure];
        newStructure[activeGradeIdx].sections.push(newSection);
        newStructure[activeGradeIdx].totalStudents = newStructure[activeGradeIdx].sections.reduce((acc, curr) => acc + curr.students, 0);
        
        setStructure(newStructure);
        setIsAddSectionOpen(false);
    };

    const handleSaveMapping = () => {
        if (!selectedMapping) return;

        const { gradeIdx, secIdx } = selectedMapping;
        const newStructure = [...structure];
        newStructure[gradeIdx].sections[secIdx] = {
            ...newStructure[gradeIdx].sections[secIdx],
            classTeacher: formData.classTeacher,
            status: formData.status,
            students: parseInt(formData.students) || 0
        };

        newStructure[gradeIdx].totalStudents = newStructure[gradeIdx].sections.reduce((acc, curr) => acc + curr.students, 0);

        setStructure(newStructure);
        setIsManageOpen(false);
    };

    const handleDeleteSection = (gradeIdx, secIdx) => {
        if (window.confirm('Dissolve this section mapping? This will remove the teacher assignment.')) {
            const newStructure = [...structure];
            newStructure[gradeIdx].sections.splice(secIdx, 1);
            newStructure[gradeIdx].totalStudents = newStructure[gradeIdx].sections.reduce((acc, curr) => acc + curr.students, 0);
            setStructure(newStructure);
            setIsManageOpen(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 bg-[#f8f7fc] min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                        Academic <span className="text-purple-600">Structure</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Define and manage the grade-section hierarchy and teacher assignments.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setIsAddGradeOpen(true)}
                        className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-6 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-sm transition-all active:scale-95"
                    >
                        <Plus size={18} />
                        Add Grade
                    </button>
                    <button 
                        onClick={() => setIsConfigOpen(true)}
                        className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all active:scale-95"
                    >
                        <LayoutGrid size={18} />
                        Configure Mapping
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="flex flex-wrap gap-6">
                {[
                    { label: 'Total Classes', value: structure.length, icon: GraduationCap, color: 'bg-blue-500 text-blue-500' },
                    { label: 'Total Sections', value: structure.reduce((acc, curr) => acc + curr.sections.length, 0), icon: Users, color: 'bg-purple-500 text-purple-500' },
                    { label: 'Avg Students/Class', value: structure.length ? Math.round(structure.reduce((acc, curr) => acc + curr.totalStudents, 0) / structure.length) : 0, icon: CheckCircle2, color: 'bg-emerald-500 text-emerald-500' }
                ].map((stat, i) => (
                    <div key={stat.label} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-50 flex items-center gap-6 flex-1 min-w-[240px]">
                        <div className={`p-4 rounded-2xl ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Grade Sections Grid */}
            <div className="grid grid-cols-1 gap-8 px-2 pb-12">
                {structure.map((gradeData, gIdx) => (
                    <div key={gradeData.grade + gIdx} className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-purple-50 transition-all duration-500">
                        {/* Grade Header */}
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-50">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg">
                                    {gradeData.grade.split(' ').length > 1 ? gradeData.grade.split(' ')[1] : '•'}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">{gradeData.grade}</h2>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                                        Overall Strength: <span className="text-slate-900">{gradeData.totalStudents} Students</span>
                                    </p>
                                </div>
                            </div>
                            <button className="p-4 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-2xl transition-all">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        {/* Sections List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                            {gradeData.sections.map((section, sIdx) => (
                                <div key={section.id || sIdx} className="bg-slate-50/50 hover:bg-white p-6 rounded-[32px] border border-transparent hover:border-purple-100 hover:shadow-xl hover:shadow-purple-50/50 transition-all group/card">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="px-5 py-2 bg-white rounded-2xl text-slate-900 font-black text-xs border border-slate-100 shadow-sm">
                                            {section.name}
                                        </div>
                                        <div className={`w-3 h-3 rounded-full ${section.status === 'Full' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-4 mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-purple-100/50 text-purple-600">
                                                <User size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Class Teacher</span>
                                                <span className="text-sm font-bold text-slate-800 line-clamp-1">{section.classTeacher || 'Unassigned'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-blue-100/50 text-blue-600">
                                                <Users size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Strength</span>
                                                <span className="text-sm font-bold text-slate-800">{section.students} Students</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleOpenManage(gIdx, sIdx)}
                                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-white group-hover/card:bg-slate-900 group-hover/card:text-white border border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm group-hover/card:shadow-lg"
                                    >
                                        Edit Alignment
                                        <ArrowRight size={14} className="opacity-0 group-hover/card:opacity-100 transition-all group-hover/card:translate-x-1" />
                                    </button>
                                </div>
                            ))}
                            <button 
                                onClick={() => handleOpenAddSection(gIdx)}
                                className="flex flex-col items-center justify-center gap-4 bg-slate-50/20 border-2 border-dashed border-slate-200 rounded-[32px] hover:border-purple-300 hover:bg-purple-50/30 transition-all min-h-[220px] group/add"
                            >
                                <div className="p-4 rounded-2xl bg-white shadow-sm text-slate-300 group-hover/add:text-purple-500 transition-colors">
                                    <Plus size={24} />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Add New Section</span>
                            </button>
                        </div>

                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 opacity-20 rounded-full translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group:hover:scale-125"></div>
                    </div>
                ))}
            </div>

            {/* --- Modals --- */}

            {/* Modal 1: Add Grade */}
            <Dialog open={isAddGradeOpen} onOpenChange={setIsAddGradeOpen}>
                <DialogContent className="sm:max-w-[480px] rounded-[48px] border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] p-0 overflow-hidden bg-white/80 backdrop-blur-3xl ring-1 ring-white/50">
                    <div className="relative p-10 pb-6 overflow-hidden">
                        <div className="w-16 h-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center shadow-2xl mb-4">
                            <Plus size={32} />
                        </div>
                        <DialogTitle className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-1">
                            Add New <span className="text-purple-600">Grade</span>
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic leading-relaxed">
                            Initialize a new academic layer for the school structure.
                        </DialogDescription>
                    </div>
                    <div className="p-10 pt-4 space-y-8 bg-slate-50/30">
                        <div className="group/field">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Available Grade Tiers</label>
                            <Select 
                                value={newGradeName} 
                                onValueChange={(v) => setNewGradeName(v)}
                            >
                                <SelectTrigger className="rounded-3xl bg-white border-slate-100 px-6 py-8 font-black text-slate-700 focus:ring-[12px] focus:ring-purple-500/5 transition-all border-2">
                                    <SelectValue placeholder="Choose a grade level..." />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-slate-100 shadow-2xl italic">
                                    {availableMasterClasses
                                        .filter(grade => !structure.find(s => s.grade === grade))
                                        .map(grade => (
                                            <SelectItem key={grade} value={grade} className="font-bold">
                                                {grade}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <p className="text-[9px] font-bold text-slate-400 mt-3 ml-2 italic leading-relaxed">
                                Only Grades defined in the <span className="text-purple-600">Classes Master List</span> appear here.
                            </p>
                        </div>
                    </div>
                    <DialogFooter className="px-10 py-8 bg-slate-50/20 border-t border-slate-100/50">
                        <Button onClick={handleAddGrade} className="w-full bg-slate-900 hover:bg-black text-white h-14 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-slate-200">
                            Establish Grade
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal 2: Add Section */}
            <Dialog open={isAddSectionOpen} onOpenChange={setIsAddSectionOpen}>
                <DialogContent className="sm:max-w-[480px] rounded-[48px] border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] p-0 overflow-hidden bg-white/80 backdrop-blur-3xl ring-1 ring-white/50">
                    <div className="relative p-10 pb-6 overflow-hidden">
                        <div className="w-16 h-16 rounded-[24px] bg-indigo-600 text-white flex items-center justify-center shadow-2xl mb-4">
                            <LayoutGrid size={32} />
                        </div>
                        <DialogTitle className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-1">
                            Deploy <span className="text-indigo-600">Section</span>
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">
                            Map a section to {activeGradeIdx !== null ? structure[activeGradeIdx].grade : ''}
                        </DialogDescription>
                    </div>
                    <div className="p-10 pt-4 space-y-8 bg-slate-50/30">
                        <div className="space-y-6">
                            <div className="group/field">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Master Section Room</label>
                                <Select 
                                    value={formData.name} 
                                    onValueChange={(v) => setFormData(prev => ({ ...prev, name: v }))}
                                >
                                    <SelectTrigger className="rounded-3xl bg-white border-slate-100 px-6 py-8 font-black text-slate-700 border-2">
                                        <SelectValue placeholder="Select a room label..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl shadow-2xl italic">
                                        {availableMasterSections
                                            .filter(sec => {
                                                if (activeGradeIdx === null) return true;
                                                return !structure[activeGradeIdx].sections.find(s => s.name === sec);
                                            })
                                            .map(sec => (
                                                <SelectItem key={sec} value={sec} className="font-bold">
                                                    {sec}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="group/field">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Assign Class Teacher</label>
                                <Select value={formData.classTeacher} onValueChange={(v) => setFormData(prev => ({ ...prev, classTeacher: v }))}>
                                    <SelectTrigger className="rounded-3xl bg-white border-slate-100 px-6 py-8 font-black text-slate-700 border-2">
                                        <SelectValue placeholder="Select faculty member" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl shadow-2xl border-slate-100 italic">
                                        {mockTeachers.map(t => <SelectItem key={t} value={t} className="font-bold">{t}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="px-10 py-8 bg-slate-50/20 border-t border-slate-100/50">
                        <Button onClick={handleAddSection} className="w-full bg-slate-900 hover:bg-black text-white h-14 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-slate-200 active:scale-95 transition-all">
                            Finalize Alignment
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal 3: Manage/Edit Alignment */}
            <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
                <DialogContent className="sm:max-w-[480px] rounded-[48px] border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] p-0 overflow-hidden bg-white/80 backdrop-blur-3xl ring-1 ring-white/50">
                    <div className="relative p-10 pb-6 overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                        <div className="relative z-10 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center shadow-2xl">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <DialogTitle className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-1">
                                    Modify <span className="text-purple-600">Alignment</span>
                                </DialogTitle>
                                <DialogDescription className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                                    {selectedMapping ? structure[selectedMapping.gradeIdx].grade : ''} • {selectedMapping ? structure[selectedMapping.gradeIdx].sections[selectedMapping.secIdx].name : ''}
                                </DialogDescription>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 pt-4 space-y-8 bg-slate-50/30">
                        <div className="space-y-6">
                            <div className="group/field">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Class Teacher</label>
                                <Select 
                                    value={formData.classTeacher} 
                                    onValueChange={(v) => setFormData(prev => ({ ...prev, classTeacher: v }))}
                                >
                                    <SelectTrigger className="rounded-3xl bg-white border-slate-100 px-6 py-8 font-black text-slate-700 focus:ring-[12px] focus:ring-purple-500/5 transition-all border-2">
                                        <SelectValue placeholder="Select Faculty" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-slate-100 shadow-2xl italic">
                                        {mockTeachers.map(t => (
                                            <SelectItem key={t} value={t} className="font-bold text-slate-700 tracking-tight">
                                                {t}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="group/field">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Enrollment</label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={formData.students}
                                        onChange={(e) => setFormData(prev => ({ ...prev, students: e.target.value }))}
                                        className="rounded-3xl bg-white border-slate-100 px-6 py-8 font-black text-slate-700 focus:ring-[12px] focus:ring-purple-500/5 transition-all border-2"
                                    />
                                </div>
                                <div className="group/field">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Status</label>
                                    <Select 
                                        value={formData.status} 
                                        onValueChange={(v) => setFormData(prev => ({ ...prev, status: v }))}
                                    >
                                        <SelectTrigger className="rounded-3xl bg-white border-slate-100 px-6 py-8 font-black text-slate-700 focus:ring-[12px] focus:ring-purple-500/5 transition-all border-2">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                                            <SelectItem value="Active" className="font-bold text-emerald-600">Active</SelectItem>
                                            <SelectItem value="Full" className="font-bold text-amber-500">Full</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-10 py-8 bg-slate-50/20 flex gap-4 sm:justify-end border-t border-slate-100/50">
                        <Button 
                            variant="ghost" 
                            onClick={() => handleDeleteSection(selectedMapping.gradeIdx, selectedMapping.secIdx)}
                            className="rounded-2xl font-black uppercase text-[10px] tracking-widest text-red-500 hover:bg-red-50 px-6 h-14"
                        >
                            Dissolve Mapping
                        </Button>
                        <Button 
                            onClick={handleSaveMapping}
                            className="bg-slate-900 hover:bg-black text-white px-10 h-14 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-95 flex items-center gap-3"
                        >
                            Sync Alignment
                            <Save size={16} />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal 4: Global Configuration (List View) */}
            <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
                <DialogContent className="sm:max-w-[720px] rounded-[48px] border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] p-0 overflow-hidden bg-white/95 backdrop-blur-3xl ring-1 ring-white/50">
                    <div className="relative p-10 pb-6 overflow-hidden bg-slate-900 text-white">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="relative z-10 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[24px] bg-white/10 text-white flex items-center justify-center backdrop-blur-md border border-white/10">
                                <LayoutGrid size={32} />
                            </div>
                            <div>
                                <DialogTitle className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-1">
                                    Global <span className="text-purple-400">Alignment</span>
                                </DialogTitle>
                                <DialogDescription className="text-white/40 font-bold text-[10px] uppercase tracking-widest">
                                    Full Database Structure Overview
                                </DialogDescription>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 max-h-[500px] overflow-y-auto custom-scrollbar bg-slate-50/30">
                        <div className="space-y-4">
                            {structure.map((gradeData, gIdx) => (
                                <div key={gradeData.grade + gIdx} className="space-y-3">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{gradeData.grade}</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {gradeData.sections.length === 0 ? (
                                            <div className="p-4 bg-white/50 border-2 border-dashed border-slate-100 rounded-3xl text-center">
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No active sections mapped yet</span>
                                            </div>
                                        ) : (
                                            gradeData.sections.map((sec, sIdx) => (
                                                <div key={sec.id} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between group/row hover:shadow-lg transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-xs">
                                                            {sec.name.split(' ').pop()}
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-black text-slate-900 tracking-tight">{sec.name}</div>
                                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest line-clamp-1">{sec.classTeacher || 'Unassigned'}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6">
                                                        <div className="text-right">
                                                            <div className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{sec.students} Seats</div>
                                                            <div className={`text-[8px] font-black uppercase text-right tracking-widest ${sec.status === 'Full' ? 'text-amber-500' : 'text-emerald-500'}`}>{sec.status}</div>
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                setIsConfigOpen(false);
                                                                handleOpenManage(gIdx, sIdx);
                                                            }}
                                                            className="p-3 bg-slate-50 hover:bg-purple-600 hover:text-white text-slate-400 rounded-xl transition-all"
                                                        >
                                                            <ArrowRight size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="px-10 py-8 bg-white border-t border-slate-50">
                        <Button 
                            onClick={() => setIsConfigOpen(false)}
                            className="bg-slate-900 hover:bg-black text-white px-10 h-14 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] w-full"
                        >
                            Return to Dashboard
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
