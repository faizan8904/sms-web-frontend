import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    ChevronLeft,
    Edit3,
    Save,
    X,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
    ShieldCheck,
    Clock,
    Camera,
    CheckCircle2,
    HardHat,
    ClipboardList,
    Activity
} from 'lucide-react';

const mockStaff = {
    id: '1',
    firstName: 'Alex',
    lastName: 'Rivera',
    middleName: 'M.',
    employeeId: 'STF-2024-001',
    department: 'Administration',
    role: 'Chief Administrator',
    email: 'a.rivera@scholarly.edu',
    phone: '+1 (555) 111-2222',
    gender: 'Male',
    dob: '1982-11-05',
    joiningDate: '2018-03-10',
    experience: '15 Years',
    status: 'Active',
    address: '12 Admin Heights, Central Campus, NY 10001',
    avatar: 'https://i.pravatar.cc/150?u=staff1'
};

export default function StaffDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isEditing, setIsEditing] = useState(location.state?.editMode || false);
    const [staff, setStaff] = useState(mockStaff);
    const [formData, setFormData] = useState(mockStaff);

    useEffect(() => {
        if (location.state?.editMode) {
            setIsEditing(true);
        }
    }, [location.state]);

    const handleEditToggle = () => {
        if (isEditing) {
            setFormData(staff);
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setStaff(formData);
        setIsEditing(false);
    };

    const InfoItem = ({ icon: Icon, label, value, name, type = "text" }) => (
        <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-white border border-slate-50 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <Icon size={14} className="text-slate-500" />
                {label}
            </div>
            {isEditing ? (
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="text-sm font-bold text-slate-900 border-b-2 border-slate-300 bg-transparent focus:border-slate-900 focus:outline-none py-1 transition-colors"
                />
            ) : (
                <div className="text-sm font-black text-slate-800">{value || 'N/A'}</div>
            )}
        </div>
    );

    const SectionTitle = ({ title, icon: Icon }) => (
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-slate-900 text-white shadow-sm">
                <Icon size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">{title}</h2>
        </div>
    );

    return (
        <div className="flex flex-col gap-8 p-6 bg-[#f8f7fc] min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={() => navigate('/staff/all')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition-all group"
                >
                    <div className="p-2 rounded-lg group-hover:bg-slate-100 transition-colors">
                        <ChevronLeft size={20} />
                    </div>
                    Back to Staff Directory
                </button>

                <div className="flex items-center gap-3">
                    {isEditing ? (
                        <>
                            <button onClick={handleEditToggle} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-bold transition-all">
                                <X size={18} />
                                Cancel
                            </button>
                            <button onClick={handleSave} className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all active:scale-95">
                                <Save size={18} />
                                Save Profile
                            </button>
                        </>
                    ) : (
                        <button onClick={handleEditToggle} className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all active:scale-95">
                            <Edit3 size={18} />
                            Modify Record
                        </button>
                    )}
                </div>
            </div>

            {/* Profile Hero */}
            <div className="relative">
                <div className="h-48 w-full rounded-[40px] bg-slate-200 shadow-inner overflow-hidden relative">
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-300 to-transparent opacity-30"></div>
                </div>

                <div className="px-12 -mt-16 relative z-10">
                    <div className="bg-white/90 backdrop-blur-3xl p-8 rounded-[40px] border border-white shadow-2xl flex flex-col md:flex-row items-center gap-10">
                        <div className="relative group">
                            <img
                                src={staff.avatar}
                                alt={staff.name}
                                className="w-40 h-40 rounded-3xl object-cover ring-8 ring-white shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            {isEditing && (
                                <button className="absolute bottom-2 right-2 p-3 bg-slate-900 text-white rounded-2xl shadow-lg hover:bg-black transition-all">
                                    <Camera size={20} />
                                </button>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                                    {isEditing ? (
                                        <div className="flex flex-wrap gap-2">
                                            <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="bg-transparent border-b-2 border-slate-300 w-32 outline-none" />
                                            <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="bg-transparent border-b-2 border-slate-300 w-32 outline-none" />
                                        </div>
                                    ) : (
                                        <>{staff.firstName} {staff.lastName}</>
                                    )}
                                </h1>
                                <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                    {staff.status}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-6 mt-4 italic font-bold text-slate-400">
                                <span className="flex items-center gap-2"><Briefcase size={18} /> {staff.role}</span>
                                <span className="flex items-center gap-2"><HardHat size={18} /> {staff.department}</span>
                                <span className="flex items-center gap-2"><IdCard size={18} /> {staff.employeeId}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-2 pb-12">
                <div className="lg:col-span-2 flex flex-col gap-10">
                    <section>
                        <SectionTitle title="Employee Data" icon={ClipboardList} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem icon={Mail} label="Work Email" value={staff.email} name="email" type="email" />
                            <InfoItem icon={Phone} label="Work Phone" value={staff.phone} name="phone" />
                            <InfoItem icon={Calendar} label="Date of Birth" value={staff.dob} name="dob" type="date" />
                            <InfoItem icon={User} label="Gender" value={staff.gender} name="gender" />
                            <InfoItem icon={MapPin} label="Home Location" value={staff.address} name="address" />
                        </div>
                    </section>

                    <section>
                        <SectionTitle title="Employment Details" icon={ShieldCheck} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem icon={Clock} label="Years Active" value={staff.experience} name="experience" />
                            <FormInput icon={Calendar} label="Commencement Date" value={staff.joiningDate} name="joiningDate" type="date" />
                            <InfoItem icon={Activity} label="Current Duty" value="Full Time" />
                            <InfoItem icon={Briefcase} label="Office Location" value="Admin Block G-12" />
                        </div>
                    </section>
                </div>

                <aside className="flex flex-col gap-8">
                    <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-slate-400">Service Metrics</h3>
                        <div className="flex flex-col gap-8">
                            <div>
                                <div className="text-3xl font-black mb-1">99.9%</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reliability Index</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black mb-1">24h</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg Response Time</div>
                            </div>
                            <div className="mt-4 pt-8 border-t border-slate-800 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <CheckCircle2 size={24} className="text-emerald-400" />
                                </div>
                                <div className="text-sm font-bold">Top Verified Member</div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

const IdCard = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h10" />
        <path d="M7 16h4" />
    </svg>
);

const FormInput = ({ icon, label, value, name, type }) => (
    <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-white border border-slate-50 shadow-sm">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {React.createElement(icon, { size: 14, className: "text-slate-500" })}
            {label}
        </div>
        <div className="text-sm font-black text-slate-800">{value}</div>
    </div>
);
