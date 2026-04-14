import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
    Shield,
    Camera,
    Save,
    Clock,
    Truck,
    BadgeCheck,
    Contact,
    CreditCard
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AddStaff() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        employeeId: '',
        joiningDate: new Date().toISOString().split('T')[0],
        role: '',
        department: '',
        shift: 'Day',
        emergencyContact: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Staff Registered:', formData);
        navigate('/staff/all');
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

    const FormSection = ({ title, icon: Icon, colorClass, children }) => (
        <div className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-64 h-64 ${colorClass} opacity-20 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700`}></div>
            
            <div className="relative z-10 flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <div className={`p-3.5 rounded-2xl ${colorClass.replace('/20', '')} bg-slate-50 text-slate-900 shadow-sm border border-slate-100`}>
                        <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{title}</h2>
                        <div className="h-1 w-12 bg-slate-200 rounded-full mt-1"></div>
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                        Non-Academic <span className="text-slate-500">Staff</span>
                    </h1>
                    <p className="text-slate-500 font-medium tracking-tight">Onboard support and administrative personnel.</p>
                </div>
                <button 
                    onClick={() => navigate('/staff/all')}
                    className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 hover:shadow-lg transition-all active:scale-95"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-12">
                {/* Staff Identity */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 opacity-20 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col gap-10">
                        <div className="flex flex-col lg:flex-row gap-12">
                            <div className="flex flex-col items-center gap-4 w-full lg:w-1/4 pt-2">
                                <div className="w-full aspect-square max-w-[200px] border-2 border-dashed border-slate-200 rounded-[32px] bg-slate-50/50 flex flex-col items-center justify-center gap-3 hover:border-slate-400 hover:bg-slate-100 transition-all cursor-pointer group/upload relative overflow-hidden">
                                    <div className="p-4 rounded-2xl bg-white shadow-sm text-slate-300 group-hover/upload:text-slate-900 transition-colors">
                                        <Camera size={32} />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4">Upload ID Photo</p>
                                </div>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                <FormInput icon={User} label="First Name" name="firstName" placeholder="e.g. Marcus" />
                                <FormInput icon={User} label="Last Name" name="lastName" placeholder="e.g. Wright" />
                                <FormInput icon={Mail} label="Email Address" name="email" type="email" placeholder="staff@school.com" />
                                <FormInput icon={Phone} label="Primary Contact" name="phone" placeholder="+1 (555) 000-0000" />
                                <FormInput icon={Calendar} label="Date of Joining" name="joiningDate" type="date" />
                                <FormInput icon={BadgeCheck} label="Employee ID" name="employeeId" placeholder="STF-2024-101" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Role Deployment */}
                <FormSection title="Role Alignment" icon={Briefcase} colorClass="bg-slate-200">
                    <FormInput icon={Shield} label="Professional Role" name="role" options={['Administrator', 'Accountant', 'Librarian', 'Security', 'Maintenance', 'Transport']} />
                    <FormInput icon={BadgeCheck} label="Department" name="department" options={['Admin Hub', 'Finance', 'Logistics', 'Security Ops', 'Grounds']} />
                    <FormInput icon={Clock} label="Operational Shift" name="shift" options={['Morning', 'Evening', 'Night', 'Rotational']} />
                    <FormInput icon={CreditCard} label="Bank Account No." name="bankAccount" placeholder="XXXX-XXXX-XXXX-XXXX" />
                    <FormInput icon={Contact} label="Emergency Contact" name="emergencyContact" placeholder="Name & Phone Number" />
                    <FormInput icon={MapPin} label="Residential Address" name="address" placeholder="Full residential address" />
                </FormSection>

                {/* Bottom Actions */}
                <div className="flex items-center justify-end gap-6 mt-4">
                    <p className="text-slate-400 text-sm font-medium italic">Ensure compliance with HR policies before registration.</p>
                    <button
                        type="submit"
                        className="flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-12 py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-95 group"
                    >
                        <Save size={20} className="group-hover:scale-110 transition-transform" />
                        Finalize Onboarding
                    </button>
                </div>
            </form>
        </div>
    );
}
