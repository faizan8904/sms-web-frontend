import React, { useState } from 'react';
import { 
    Search, 
    Plus, 
    Mail, 
    Phone, 
    Edit2, 
    Users, 
    UserCog, 
    ShieldCheck, 
    Filter,
    ChevronLeft,
    ChevronRight,
    Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockStaff = [
    {
        id: 1,
        name: 'Alex Rivera',
        role: 'Chief Administrator',
        department: 'Administration',
        email: 'a.rivera@scholarly.edu',
        phone: '+1 (555) 111-2222',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?u=staff1'
    },
    {
        id: 2,
        name: 'Samantha Reed',
        role: 'IT Specialist',
        department: 'Technology Services',
        email: 's.reed@scholarly.edu',
        phone: '+1 (555) 333-4444',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?u=staff2'
    },
    {
        id: 3,
        name: 'David Chen',
        role: 'Head Librarian',
        department: 'Library Services',
        email: 'd.chen@scholarly.edu',
        phone: '+1 (555) 555-6666',
        status: 'On Leave',
        avatar: 'https://i.pravatar.cc/150?u=staff3'
    },
    {
        id: 4,
        name: 'Maria Garcia',
        role: 'Finance Officer',
        department: 'Accounts & Finance',
        email: 'm.garcia@scholarly.edu',
        phone: '+1 (555) 777-8888',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?u=staff4'
    }
];

export default function Staff() {
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

    const StaffCard = ({ member }) => (
        <div className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="relative mb-6">
                <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-48 rounded-[24px] object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${
                    member.status === 'Active' 
                    ? 'bg-emerald-500/80 text-white border-emerald-400/50' 
                    : 'bg-amber-500/80 text-white border-amber-400/50'
                }`}>
                    {member.status}
                </div>
            </div>

            <div className="text-center mb-6">
                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1">{member.name}</h3>
                <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider text-[10px]">{member.role}</p>
                <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest">{member.department}</p>
            </div>

            <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-500">
                    <Mail size={16} className="text-slate-300" />
                    <span className="text-xs font-medium truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                    <Phone size={16} className="text-slate-300" />
                    <span className="text-xs font-medium">{member.phone}</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button 
                    onClick={() => navigate(`/staff/${member.id}`)}
                    className="flex-1 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-600 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                >
                    Administrative Details
                </button>
                <button 
                    onClick={() => navigate(`/staff/${member.id}`, { state: { editMode: true } })}
                    className="p-3 bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all border border-transparent hover:border-indigo-100"
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
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 uppercase">Staff Directory</h1>
                    <p className="text-slate-500 font-medium">Coordinate and manage administrative & maintenance personnel.</p>
                </div>
                <button className="flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all active:scale-95 group">
                    <Plus size={20} />
                    Register New Staff
                </button>
            </div>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-6">
                <StatCard icon={UserCog} label="Total Staff" value="56" color="bg-indigo-500" />
                <StatCard icon={Briefcase} label="On Duty" value="48" color="bg-emerald-500" />
                <StatCard icon={ShieldCheck} label="Verified" value="100%" color="bg-blue-500" />
            </div>

            {/* Filters Section */}
            <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by name, position or department..."
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-[24px] shadow-sm text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-300 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <select className="bg-white border border-slate-100 rounded-[20px] px-6 py-4 text-sm font-bold text-slate-600 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 appearance-none min-w-[160px]">
                        <option>All Services</option>
                        <option>Administration</option>
                        <option>Maintenance</option>
                        <option>Security</option>
                    </select>
                    <button className="p-4 bg-white border border-slate-100 rounded-[20px] text-slate-400 hover:text-indigo-600 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/10">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {mockStaff.map(member => (
                    <StaffCard key={member.id} member={member} />
                ))}
            </div>

            {/* Footer / Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 pb-12 border-t border-slate-200">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Operational Insights: 86% Attendance Today
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    {[1, 2, 3].map((page, index) => (
                        <button 
                            key={index}
                            className={`w-12 h-12 rounded-2xl font-black text-sm transition-all ${
                                page === 1 
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
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
