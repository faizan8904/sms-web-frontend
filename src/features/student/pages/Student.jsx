import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    UserPlus,
    Filter,
    ChevronLeft,
    ChevronRight,
    Eye,
    Edit3,
    RotateCcw,
    TrendingUp,
    ShieldCheck,
    Award,
    MoreVertical
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const mockStudents = [
    {
        id: 1,
        name: 'Julian Thorne',
        email: 'j.thorne@atrium.edu',
        admissionNo: '#ADM-2024-089',
        class: 'Grade 11',
        section: 'Sec A',
        rollNo: '14',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?u=1'
    },
    {
        id: 2,
        name: 'Elena Rodriguez',
        email: 'e.rod@atrium.edu',
        admissionNo: '#ADM-2023-142',
        class: 'Grade 12',
        section: 'Sec B',
        rollNo: '08',
        status: 'Graduated',
        avatar: 'https://i.pravatar.cc/150?u=2'
    },
    {
        id: 3,
        name: 'Marcus Vance',
        email: 'm.vance@atrium.edu',
        admissionNo: '#ADM-2024-002',
        class: 'Grade 10',
        section: 'Sec A',
        rollNo: '22',
        status: 'Withdrawn',
        avatar: 'https://i.pravatar.cc/150?u=3'
    },
    {
        id: 4,
        name: 'Aria Sterling',
        email: 'a.ster@atrium.edu',
        admissionNo: '#ADM-2024-115',
        class: 'Grade 11',
        section: 'Sec C',
        rollNo: '03',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?u=4'
    }
];

const stats = [
    {
        label: 'NEW ENROLLMENTS',
        value: '+12%',
        subValue: 'vs last month',
        icon: TrendingUp,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50'
    },
    {
        label: 'ATTENDANCE RATE',
        value: '94.2%',
        subValue: 'Average',
        icon: ShieldCheck,
        color: 'text-purple-600',
        bg: 'bg-purple-50'
    },
    {
        label: 'DEAN\'S LIST',
        value: '85',
        subValue: 'Students',
        icon: Award,
        color: 'text-rose-600',
        bg: 'bg-rose-50'
    }
];

export default function Student() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-emerald-600';
            case 'Graduated': return 'bg-amber-50 text-amber-600';
            case 'Withdrawn': return 'bg-rose-50 text-rose-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    const getStatusDotColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-500';
            case 'Graduated': return 'bg-amber-500';
            case 'Withdrawn': return 'bg-rose-500';
            default: return 'bg-slate-500';
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 bg-[#f8f7fc] min-h-screen">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Student Directory</h1>
                    <p className="text-slate-500 mt-1">Manage and monitor academic enrollments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => navigate('/student/add')}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-purple-200 transition-all active:scale-95"
                    >
                        <UserPlus size={18} />
                        <span className="hidden sm:inline">Add New Student</span>
                    </button>
                </div>
            </div>

            {/* Filters Area */}
            <div className="flex flex-wrap items-end gap-6 bg-white shadow-sm p-6 rounded-[24px] border border-slate-100">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Class</label>
                    <Select defaultValue="All Classes">
                        <SelectTrigger className="bg-slate-50 border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 h-11 w-48 focus:ring-4 focus:ring-purple-500/10 focus:bg-white focus:border-purple-300 transition-all shadow-none">
                            <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-100 shadow-xl p-2">
                            <SelectItem value="All Classes" className="rounded-xl font-bold py-2.5">All Classes</SelectItem>
                            <SelectItem value="Grade 10" className="rounded-xl font-bold py-2.5">Grade 10</SelectItem>
                            <SelectItem value="Grade 11" className="rounded-xl font-bold py-2.5">Grade 11</SelectItem>
                            <SelectItem value="Grade 12" className="rounded-xl font-bold py-2.5">Grade 12</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Section</label>
                    <Select defaultValue="All Sections">
                        <SelectTrigger className="bg-slate-50 border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 h-11 w-48 focus:ring-4 focus:ring-purple-500/10 focus:bg-white focus:border-purple-300 transition-all shadow-none">
                            <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-100 shadow-xl p-2">
                            <SelectItem value="All Sections" className="rounded-xl font-bold py-2.5">All Sections</SelectItem>
                            <SelectItem value="Sec A" className="rounded-xl font-bold py-2.5">Sec A</SelectItem>
                            <SelectItem value="Sec B" className="rounded-xl font-bold py-2.5">Sec B</SelectItem>
                            <SelectItem value="Sec C" className="rounded-xl font-bold py-2.5">Sec C</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Status</label>
                    <Select defaultValue="Active">
                        <SelectTrigger className="bg-slate-50 border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 h-11 w-48 focus:ring-4 focus:ring-purple-500/10 focus:bg-white focus:border-purple-300 transition-all shadow-none">
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-100 shadow-xl p-2">
                            <SelectItem value="Active" className="rounded-xl font-bold py-2.5">Active</SelectItem>
                            <SelectItem value="Graduated" className="rounded-xl font-bold py-2.5">Graduated</SelectItem>
                            <SelectItem value="Withdrawn" className="rounded-xl font-bold py-2.5">Withdrawn</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:bg-indigo-50 px-4 py-2.5 rounded-xl transition-all ml-auto">
                    <RotateCcw size={16} />
                    Reset Filters
                </button>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30">Student</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30">Admission #</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30">Class/Section</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30">Roll No</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/30 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {mockStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img src={student.avatar} alt={student.name} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm" />
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                                            </div>
                                            <div>
                                                <div className="font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors uppercase tracking-tight">{student.name}</div>
                                                <div className="text-xs text-slate-500 font-bold lowercase">{student.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-slate-500 tracking-tight">
                                        {student.admissionNo}
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-[10px] font-black uppercase tracking-wider">{student.class}</span>
                                            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider">{student.section}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-base font-black text-slate-800 tracking-tighter">{student.rollNo}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(student.status)}`}>
                                            <span className={`w-2 h-2 rounded-full ${getStatusDotColor(student.status)}`}></span>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => navigate(`/student/${student.id}`)}
                                                className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-indigo-100/50 shadow-sm bg-indigo-50/30"
                                                title="View Profile"
                                            >
                                                <Eye size={20} />
                                            </button>
                                            <button
                                                onClick={() => navigate(`/student/${student.id}`, { state: { editMode: true } })}
                                                className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                                                title="Edit Student"
                                            >
                                                <Edit3 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-6 bg-slate-50/20 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-50">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        Showing <span className="text-slate-900">1 to 4</span> of <span className="text-slate-900 font-black">1,240</span> entries
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-300 hover:text-slate-500 transition-colors disabled:opacity-20" disabled>
                            <ChevronLeft size={24} />
                        </button>
                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-sm shadow-xl shadow-indigo-100 scale-110">1</button>
                            <button className="w-10 h-10 rounded-xl text-slate-500 font-black text-sm hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all">2</button>
                            <button className="w-10 h-10 rounded-xl text-slate-500 font-black text-sm hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all">3</button>
                            <span className="px-2 text-slate-300 font-black tracking-widest">...</span>
                            <button className="w-10 h-10 rounded-xl text-slate-500 font-black text-sm hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all">12</button>
                        </div>
                        <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
                        <div className={`p-5 rounded-2xl ${stat.bg} ${stat.color} transition-all group-hover:rotate-12 group-hover:scale-110 duration-500`}>
                            <stat.icon size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</span>
                                <span className="text-xs font-bold text-slate-500 tracking-tight">{stat.subValue}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}