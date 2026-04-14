import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
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
    X,
    CheckCircle2,
    Briefcase,
    Save,
    Camera
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AddStudent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dob: '',
        bloodGroup: '',
        email: '',
        phone: '',
        address: '',
        admissionNo: '',
        class: '',
        section: '',
        rollNo: '',
        admissionDate: new Date().toISOString().split('T')[0],
        fatherName: '',
        motherName: '',
        guardianContact: '',
        guardianOccupation: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // Add API call here
        navigate('/student/all');
    };

    const FormInput = ({ icon: Icon, label, name, type = "text", placeholder, options }) => (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                {label}
            </label>
            <div className="relative group">
                {options ? (
                    <Select
                        name={name}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, [name]: value }))}
                        value={formData[name]}
                    >
                        <SelectTrigger className="w-full pl-12 pr-4 py-6 bg-slate-50 border-slate-100 rounded-2xl text-sm font-bold text-slate-700 h-auto focus:ring-4 focus:ring-purple-500/10 focus:bg-white focus:border-purple-300 transition-all shadow-none">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-500 transition-colors">
                                <Icon size={18} />
                            </div>
                            <SelectValue placeholder={`Select ${label}`} />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-100 shadow-xl p-2">
                            {options.map(opt => (
                                <SelectItem key={opt} value={opt} className="rounded-xl font-bold py-3">
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-500 transition-colors z-10 pointer-events-none">
                            <Icon size={18} />
                        </div>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                            placeholder={placeholder}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:bg-white focus:border-purple-300 transition-all"
                        />
                    </>
                )}
            </div>
        </div>
    );

    const FormSection = ({ title, icon: Icon, children }) => (
        <div className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 opacity-20 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600 shadow-sm border border-purple-100">
                        <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{title}</h2>
                        <div className="h-1 w-12 bg-purple-200 rounded-full mt-1"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-8 p-6 bg-[#f8f7fc] min-h-screen">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                        Student <span className="text-purple-600">Registration</span>
                    </h1>
                    <p className="text-slate-500 font-medium tracking-tight">Onboard a new student to the scholarly ecosystem.</p>
                </div>

                
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-12">
                {/* Personal Information & Photo */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 opacity-20 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col gap-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600 shadow-sm border border-purple-100">
                                <User size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Student Information</h2>
                                <div className="h-1 w-12 bg-purple-200 rounded-full mt-1"></div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Photo Upload Area */}
                            <div className="flex flex-col items-center gap-4 w-full lg:w-1/4 pt-2">
                                <div className="w-full aspect-square max-w-[200px] border-2 border-dashed border-slate-200 rounded-[32px] bg-slate-50/50 flex flex-col items-center justify-center gap-3 hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer group/upload relative overflow-hidden shadow-none">
                                    <div className="p-4 rounded-2xl bg-white shadow-sm text-slate-300 group-hover/upload:text-purple-500 transition-colors">
                                        <Camera size={32} />
                                    </div>
                                    <div className="text-center px-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Upload Student Photo</p>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 py-2 bg-purple-600/10 text-purple-600 text-[8px] font-bold uppercase tracking-widest text-center opacity-0 group-hover/upload:opacity-100 transition-opacity">
                                        Max 5MB • JPG or PNG
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields Grid */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                <FormInput icon={User} label="First Name" name="firstName" placeholder="e.g. Julian" />
                                <FormInput icon={User} label="Middle Name" name="middleName" placeholder="Optional" />
                                <FormInput icon={User} label="Last Name" name="lastName" placeholder="e.g. Thorne" />
                                <FormInput icon={Calendar} label="Date of Birth" name="dob" type="date" />
                                <FormInput icon={User} label="Gender" name="gender" options={['Male', 'Female', 'Other']} />
                                <FormInput icon={Heart} label="Blood Group" name="bloodGroup" options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} />
                                <FormInput icon={IdCard} label="Admission Number" name="admissionNo" placeholder="ADM-2024-001" />
                                <FormInput icon={CheckCircle2} label="Roll Number" name="rollNo" placeholder="42" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic & Contact Information */}
                <FormSection title="Emergency Contact & Address" icon={Shield}>
                    <FormInput icon={MapPin} label="Home Address" name="address" placeholder="Street name, City, State, Zip Code" />
                    <FormInput icon={Mail} label="Email Address" name="email" type="email" placeholder="student@example.com" />
                    <FormInput icon={Phone} label="Primary Phone" name="phone" placeholder="+1 (555) 000-0000" />
                    <FormInput icon={GraduationCap} label="Class" name="class" options={['Grade 10', 'Grade 11', 'Grade 12']} />
                    <FormInput icon={Users} label="Section" name="section" options={['Sec A', 'Sec B', 'Sec C']} />
                    <FormInput icon={Calendar} label="Admission Date" name="admissionDate" type="date" />
                </FormSection>

                {/* Guardian Information */}
                <FormSection title="Guardian Details" icon={Shield}>
                    <FormInput icon={User} label="Father's Full Name" name="fatherName" placeholder="Full name" />
                    <FormInput icon={User} label="Mother's Full Name" name="motherName" placeholder="Full name" />
                    <FormInput icon={Phone} label="Guardian Contact" name="guardianContact" placeholder="+1 (555) 000-0000" />
                    <FormInput icon={Briefcase} label="Guardian Occupation" name="guardianOccupation" placeholder="e.g. Engineer, Business" />
                </FormSection>

                {/* Bottom Actions */}
                <div className="flex items-center justify-end gap-6 mt-4">
                    <p className="text-slate-400 text-sm font-medium">Verify all information before clicking register student.</p>
                    <button
                        type="submit"
                        className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-12 py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-purple-200 transition-all active:scale-95 group"
                    >
                        <Save size={20} className="group-hover:scale-110 transition-transform" />
                        Register Student
                    </button>
                </div>
            </form>
        </div>
    );
}
