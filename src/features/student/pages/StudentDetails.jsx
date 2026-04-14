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
    Users,
    IdCard,
    GraduationCap,
    Heart,
    Shield,
    Camera,
    CheckCircle2
} from 'lucide-react';

const mockStudent = {
    id: '1',
    firstName: 'Julian',
    lastName: 'Thorne',
    middleName: 'Alexander',
    admissionNo: 'ADM-2024-089',
    class: 'Grade 11',
    section: 'Sec A',
    rollNo: '14',
    status: 'Active',
    email: 'j.thorne@atrium.edu',
    phone: '+1 (555) 123-4567',
    gender: 'Male',
    dob: '2008-05-15',
    bloodGroup: 'O+',
    address: '123 Academic Way, Education District, NY 10001',
    admissionDate: '2024-01-10',
    fatherName: 'Robert Thorne',
    motherName: 'Sarah Thorne',
    guardianContact: '+1 (555) 987-6543',
    guardianOccupation: 'Software Engineer',
    avatar: 'https://i.pravatar.cc/150?u=1'
};

export default function StudentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isEditing, setIsEditing] = useState(location.state?.editMode || false);
    const [student, setStudent] = useState(mockStudent);
    const [formData, setFormData] = useState(mockStudent);

    // Update isEditing if location state changes (e.g., navigating from View to Edit directly)
    useEffect(() => {
        if (location.state?.editMode) {
            setIsEditing(true);
        }
    }, [location.state]);

    const handleEditToggle = () => {
        if (isEditing) {
            setFormData(student); // Reset form data to current student state if canceling
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setStudent(formData);
        setIsEditing(false);
        // In a real app, you'd call an API here
    };

    const InfoItem = ({ icon: Icon, label, value, name, type = "text" }) => (
        <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-100 transition-all">
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
            {/* Navigation & Actions */}
            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={() => navigate('/student/all')}
                    className="flex items-center gap-2 text-slate-500 hover:text-purple-600 font-bold text-sm transition-all group"
                >
                    <div className="p-2 rounded-lg group-hover:bg-purple-50 transition-colors">
                        <ChevronLeft size={20} />
                    </div>
                    Back to Directory
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
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEditToggle}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-purple-100 transition-all active:scale-95"
                        >
                            <Edit3 size={18} />
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* Profile Header Card */}
            <div className="relative">
                {/* Background Banner */}
                <div className="h-48 w-full rounded-[36px] bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 shadow-xl overflow-hidden relative">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <div className="absolute top-8 right-8 flex gap-2">
                        <span className={`px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white border border-white/30 flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${student.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
                            {student.status}
                        </span>
                    </div>
                </div>

                {/* Profile Float Info */}
                <div className="px-12 -mt-16 relative z-10">
                    <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[40px] border border-white shadow-2xl flex flex-col md:flex-row items-center gap-8">
                        <div className="relative group">
                            <img
                                src={student.avatar}
                                alt={student.firstName}
                                className="w-40 h-40 rounded-3xl object-cover ring-8 ring-white shadow-xl transition-transform group-hover:scale-[1.02] duration-500"
                            />
                            {isEditing && (
                                <button className="absolute bottom-2 right-2 p-3 bg-purple-600 text-white rounded-2xl shadow-lg hover:bg-purple-700 transition-all active:scale-90">
                                    <Camera size={20} />
                                </button>
                            )}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                                    {isEditing ? (
                                        <div className="flex flex-wrap gap-2">
                                            <input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="First Name"
                                                className="bg-transparent border-b-2 border-purple-200 focus:border-purple-500 outline-none w-32"
                                            />
                                            <input
                                                name="middleName"
                                                value={formData.middleName}
                                                onChange={handleInputChange}
                                                placeholder="Middle Name"
                                                className="bg-transparent border-b-2 border-purple-200 focus:border-purple-500 outline-none w-32"
                                            />
                                            <input
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="Last Name"
                                                className="bg-transparent border-b-2 border-purple-200 focus:border-purple-500 outline-none w-32"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            {student.firstName} <span className="text-purple-600 font-black">{student.middleName}</span> {student.lastName}
                                        </>
                                    )}
                                </h1>
                                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-[10px] font-black uppercase tracking-widest self-center md:self-auto shadow-sm">
                                    {student.admissionNo}
                                </span>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
                                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                    <GraduationCap size={18} className="text-purple-400" />
                                    {student.class}
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                    <Users size={18} className="text-purple-400" />
                                    {student.section}
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                    <IdCard size={18} className="text-purple-400" />
                                    Roll No: {student.rollNo}
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-col gap-2 items-end">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Registered Date</div>
                            <div className="text-lg font-black text-slate-800">{new Date(student.admissionDate).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-2 pb-12">
                {/* Personal Information */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="flex flex-col">
                        <SectionTitle title="Personal Information" icon={User} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem icon={Mail} label="Email Address" value={student.email} name="email" type="email" />
                            <InfoItem icon={Phone} label="Phone Number" value={student.phone} name="phone" />
                            <InfoItem icon={Calendar} label="Date of Birth" value={student.dob} name="dob" type="date" />
                            <InfoItem icon={User} label="Gender" value={student.gender} name="gender" />
                            <InfoItem icon={Heart} label="Blood Group" value={student.bloodGroup} name="bloodGroup" />
                            <InfoItem icon={MapPin} label="Home Address" value={student.address} name="address" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <SectionTitle title="Academic Record" icon={GraduationCap} />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InfoItem icon={IdCard} label="Admission ID" value={student.admissionNo} name="admissionNo" />
                            <InfoItem icon={Calendar} label="Joining Date" value={student.admissionDate} name="admissionDate" type="date" />
                            <InfoItem icon={Shield} label="Account Status" value={student.status} name="status" />
                        </div>
                    </div>
                </div>

                {/* Guardian Information */}
                <div className="flex flex-col h-fit sticky top-24">
                    <SectionTitle title="Guardian Details" icon={Users} />
                    <div className="flex flex-col gap-4 p-8 rounded-[36px] bg-white border border-slate-100 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
                        
                        <div className="relative z-10 flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                                <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Father's Full Name</div>
                                {isEditing ? (
                                    <input
                                        name="fatherName"
                                        value={formData.fatherName}
                                        onChange={handleInputChange}
                                        className="text-base font-bold text-slate-800 border-b border-purple-200 outline-none"
                                    />
                                ) : (
                                    <div className="text-base font-black text-slate-800">{student.fatherName}</div>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Mother's Full Name</div>
                                {isEditing ? (
                                    <input
                                        name="motherName"
                                        value={formData.motherName}
                                        onChange={handleInputChange}
                                        className="text-base font-bold text-slate-800 border-b border-purple-200 outline-none"
                                    />
                                ) : (
                                    <div className="text-base font-black text-slate-800">{student.motherName}</div>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Guardian Contact</div>
                                {isEditing ? (
                                    <input
                                        name="guardianContact"
                                        value={formData.guardianContact}
                                        onChange={handleInputChange}
                                        className="text-base font-bold text-slate-800 border-b border-purple-200 outline-none"
                                    />
                                ) : (
                                    <div className="text-base font-black text-slate-800">{student.guardianContact}</div>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Occupation</div>
                                {isEditing ? (
                                    <input
                                        name="guardianOccupation"
                                        value={formData.guardianOccupation}
                                        onChange={handleInputChange}
                                        className="text-base font-bold text-slate-800 border-b border-purple-200 outline-none"
                                    />
                                ) : (
                                    <div className="text-base font-black text-slate-800">{student.guardianOccupation}</div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                                <CheckCircle2 size={16} />
                                Verified Profile
                            </div>
                            <MoreVertical size={20} className="text-slate-300 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MoreVertical = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
    </svg>
);
