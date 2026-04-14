import React, { useState } from 'react';
import { 
    Search, 
    Plus, 
    Mail, 
    Phone, 
    Edit2, 
    MoreHorizontal,
    Users,
    Calendar,
    UserPlus,
    Filter,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockTeachers = [
    {
        id: 1,
        name: 'Dr. Julian Thorne',
        title: 'Dr.',
        department: 'Quantum Dynamics',
        email: 'j.thorne@scholarly.edu',
        phone: '+1 (555) 012-3456',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?u=teacher1'
    },
    {
        id: 2,
        name: 'Dr. Elena Vance',
        title: 'Dr.',
        department: 'Biological Sciences',
        email: 'e.vance@scholarly.edu',
        phone: '+1 (555) 098-7654',
        status: 'On Leave',
        avatar: 'https://i.pravatar.cc/150?u=teacher2'
    },
    {
        id: 3,
        name: 'Prof. Marcus Wright',
        title: 'Prof.',
        department: 'Artificial Intelligence',
        email: 'm.wright@scholarly.edu',
        phone: '+1 (555) 024-6810',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?u=teacher3'
    },
    {
        id: 4,
        name: 'Dr. Sarah Jenkins',
        title: 'Dr.',
        department: 'Applied Mathematics',
        email: 's.jenkins@scholarly.edu',
        phone: '+1 (555) 036-9121',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?u=teacher4'
    }
];

export default function Teacher() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-50 flex items-center gap-6 flex-1">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-opacity-100 flex items-center justify-center`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
            <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</div>
                <div className="text-3xl font-black text-slate-900 tracking-tighter">{value}</div>
            </div>
        </div>
    );

    const FacultyCard = ({ teacher }) => (
        <div className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="relative mb-6">
                <img 
                    src={teacher.avatar} 
                    alt={teacher.name} 
                    className="w-full h-48 rounded-[24px] object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${
                    teacher.status === 'Active' 
                    ? 'bg-emerald-500/80 text-white border-emerald-400/50' 
                    : 'bg-amber-500/80 text-white border-amber-400/50'
                }`}>
                    {teacher.status}
                </div>
            </div>

            <div className="text-center mb-6">
                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1">{teacher.name}</h3>
                <p className="text-sm font-bold text-purple-600 uppercase tracking-wider text-[10px]">{teacher.department}</p>
            </div>

            <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-500">
                    <Mail size={16} className="text-slate-300" />
                    <span className="text-xs font-medium truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                    <Phone size={16} className="text-slate-300" />
                    <span className="text-xs font-medium">{teacher.phone}</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button 
                    onClick={() => navigate(`/teacher/${teacher.id}`)}
                    className="flex-1 bg-slate-50 hover:bg-purple-50 hover:text-purple-600 text-slate-600 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                >
                    View Profile
                </button>
                <button 
                    onClick={() => navigate(`/teacher/${teacher.id}`, { state: { editMode: true } })}
                    className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-400 hover:text-purple-600 rounded-2xl transition-all border border-transparent hover:border-purple-100"
                >
                    <Edit2 size={16} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-8 p-6 bg-[#f8f7fc] min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Faculty Management</h1>
                    <p className="text-slate-500 font-medium">Manage and monitor academic staff records across all departments.</p>
                </div>
                <button 
                    onClick={() => navigate('/teacher/add')}
                    className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-purple-100 transition-all active:scale-95 group"
                >
                    <Plus size={20} />
                    Add New Faculty
                </button>
            </div>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-6">
                <StatCard icon={Users} label="Total Faculty" value="142" color="bg-blue-500" />
                <StatCard icon={Calendar} label="On Leave" value="12" color="bg-amber-500" />
                <StatCard icon={UserPlus} label="New Joiners" value="5" color="bg-emerald-500" />
            </div>

            {/* Filters Section */}
            <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by name, ID or research area..."
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-[24px] shadow-sm text-sm font-medium focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-300 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <select className="bg-white border border-slate-100 rounded-[20px] px-6 py-4 text-sm font-bold text-slate-600 shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-500/10 appearance-none min-w-[160px]">
                        <option>All Departments</option>
                        <option>Quantum Dynamics</option>
                        <option>Biological Sciences</option>
                    </select>
                    <select className="bg-white border border-slate-100 rounded-[20px] px-6 py-4 text-sm font-bold text-slate-600 shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-500/10 appearance-none min-w-[140px]">
                        <option>Status: All</option>
                        <option>Active</option>
                        <option>On Leave</option>
                    </select>
                    <button className="p-4 bg-white border border-slate-100 rounded-[20px] text-slate-400 hover:text-purple-600 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-purple-500/10">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Faculty Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {mockTeachers.map(teacher => (
                    <FacultyCard key={teacher.id} teacher={teacher} />
                ))}
            </div>

            {/* Footer / Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 pb-12 border-t border-slate-200">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Showing 12 of 142 Faculty Members
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    {[1, 2, 3, '...', 12].map((page, index) => (
                        <button 
                            key={index}
                            className={`w-12 h-12 rounded-2xl font-black text-sm transition-all ${
                                page === 1 
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' 
                                : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
