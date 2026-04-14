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
    GraduationCap,
    Clock,
    Camera,
    CheckCircle2,
    BookOpen,
    ClipboardList,
    Award,
    IdCard
} from 'lucide-react';

const mockTeacher = {
    id: '1',
    firstName: 'Julian',
    lastName: 'Thorne',
    middleName: 'Alexander',
    employeeId: 'TCH-2024-001',
    department: 'Quantum Dynamics',
    designation: 'Senior Faculty',
    qualification: 'Ph.D. in Theoretical Physics',
    email: 'j.thorne@scholarly.edu',
    phone: '+1 (555) 012-3456',
    gender: 'Male',
    dob: '1985-06-20',
    joiningDate: '2020-08-15',
    experience: '12 Years',
    status: 'Active',
    address: '45 Faculty Row, University Heights, NY 10012',
    avatar: 'https://i.pravatar.cc/150?u=teacher1'
};

export default function TeacherDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isEditing, setIsEditing] = useState(location.state?.editMode || false);
    const [teacher, setTeacher] = useState(mockTeacher);
    const [formData, setFormData] = useState(mockTeacher);

    useEffect(() => {
        if (location.state?.editMode) {
            setIsEditing(true);
        }
    }, [location.state]);

    const handleEditToggle = () => {
        if (isEditing) {
            setFormData(teacher);
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setTeacher(formData);
        setIsEditing(false);
    };

    const InfoItem = ({ icon: Icon, label, value, name, type = "text" }) => (
        <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-white border border-slate-50 shadow-sm hover:shadow-md hover:border-purple-100 transition-all">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <Icon size={14} className="text-purple-500" />
                {label}
            </div>
            {isEditing ? (
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="text-sm font-bold text-slate-900 border-b-2 border-purple-200 bg-transparent focus:border-purple-500 focus:outline-none py-1 transition-colors"
                />
            ) : (
                <div className="text-sm font-black text-slate-800">{value || 'N/A'}</div>
            )}
        </div>
    );

    const SectionTitle = ({ title, icon: Icon }) => (
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shadow-sm border border-purple-100">
                <Icon size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">{title}</h2>
        </div>
    );

    return (
        <div className="flex flex-col gap-8 p-6 bg-[#f8f7fc] min-h-screen">
            {/* Nav & Actions */}
            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={() => navigate('/teacher/all')}
                    className="flex items-center gap-2 text-slate-500 hover:text-purple-600 font-bold text-sm transition-all group"
                >
                    <div className="p-2 rounded-lg group-hover:bg-purple-50 transition-colors">
                        <ChevronLeft size={20} />
                    </div>
                    Back to Faculty
                </button>

                <div className="flex items-center gap-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleEditToggle}
                                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl font-bold transition-all"
                            >
                                <X size={18} />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95"
                            >
                                <Save size={18} />
                                Save Profile
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEditToggle}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-purple-100 transition-all active:scale-95"
                        >
                            <Edit3 size={18} />
                            Edit Faculty
                        </button>
                    )}
                </div>
            </div>

            {/* Profile Header */}
            <div className="relative">
                <div className="h-48 w-full rounded-[40px] bg-gradient-to-tr from-purple-800 via-indigo-900 to-slate-900 shadow-xl overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                </div>

                <div className="px-12 -mt-16 relative z-10">
                    <div className="bg-white/80 backdrop-blur-2xl p-8 rounded-[40px] border border-white shadow-2xl flex flex-col md:flex-row items-center gap-10">
                        <div className="relative group">
                            <img
                                src={teacher.avatar}
                                alt={teacher.name}
                                className="w-40 h-40 rounded-3xl object-cover ring-8 ring-white shadow-xl transition-transform group-hover:scale-[1.02] duration-500"
                            />
                            {isEditing && (
                                <button className="absolute bottom-2 right-2 p-3 bg-purple-600 text-white rounded-2xl shadow-lg hover:bg-purple-700 transition-all">
                                    <Camera size={20} />
                                </button>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                                    {isEditing ? (
                                        <div className="flex flex-wrap gap-2">
                                            <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="bg-transparent border-b-2 border-purple-200 w-32 outline-none" />
                                            <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="bg-transparent border-b-2 border-purple-200 w-32 outline-none" />
                                        </div>
                                    ) : (
                                        <>{teacher.firstName} <span className="text-purple-600">{teacher.lastName}</span></>
                                    )}
                                </h1>
                                <span className="px-4 py-1.5 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                    {teacher.status}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-6 mt-4">
                                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                    <Briefcase size={18} className="text-purple-400" />
                                    {teacher.designation}
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                    <BookOpen size={18} className="text-purple-400" />
                                    {teacher.department}
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                    <IdCard size={18} className="text-purple-400" />
                                    {teacher.employeeId}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-2 pb-12">
                <div className="lg:col-span-2 flex flex-col gap-10">
                    <section>
                        <SectionTitle title="Personal Information" icon={User} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem icon={Mail} label="Official Email" value={teacher.email} name="email" type="email" />
                            <InfoItem icon={Phone} label="Contact Number" value={teacher.phone} name="phone" />
                            <InfoItem icon={Calendar} label="Date of Birth" value={teacher.dob} name="dob" type="date" />
                            <InfoItem icon={User} label="Gender" value={teacher.gender} name="gender" />
                            <InfoItem icon={MapPin} label="Residential Address" value={teacher.address} name="address" />
                        </div>
                    </section>

                    <section>
                        <SectionTitle title="Teaching Profile" icon={GraduationCap} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem icon={Award} label="Highest Qualification" value={teacher.qualification} name="qualification" />
                            <InfoItem icon={Clock} label="Total Experience" value={teacher.experience} name="experience" />
                            <InfoItem icon={Calendar} label="Joining Date" value={teacher.joiningDate} name="joiningDate" type="date" />
                            <InfoItem icon={ClipboardList} label="Designation" value={teacher.designation} name="designation" />
                        </div>
                    </section>
                </div>

                <aside className="flex flex-col gap-6">
                    <SectionTitle title="Quick Stats" icon={Clock} />
                    <div className="bg-white p-8 rounded-[40px] border border-slate-50 shadow-xl flex flex-col gap-8">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance Rate</span>
                                <span className="text-2xl font-black text-slate-900">98.4%</span>
                            </div>
                            <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
                                <CheckCircle2 size={24} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ongoing Courses</span>
                                <span className="text-2xl font-black text-slate-900">04</span>
                            </div>
                            <div className="p-3 bg-indigo-50 text-indigo-500 rounded-2xl">
                                <BookOpen size={24} />
                            </div>
                        </div>
                        <div className="pt-6 border-t border-slate-50">
                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                                Download CV/Resume
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
