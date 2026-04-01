import { useState } from 'react';
import { Printer, Pencil, ChevronDown, UtensilsCrossed, Plus, X, Check } from 'lucide-react';
import { timetableData, timeSlots, days as allDays, subjectColorMap, subjects, teachers, rooms } from './db';
import './timetable.css';

export default function TimeTable() {
    const [selectedClass, setSelectedClass] = useState(10);
    const [isEditing, setIsEditing] = useState(false);
    const [layoutMode, setLayoutMode] = useState('mon-sat');
    const [editingSlot, setEditingSlot] = useState(null); // { day, slotIdx, subject, teacher, room }

    // In a real app, this would be global state (Redux/Context), but we use local state here.
    const [scheduleState, setScheduleState] = useState(timetableData);

    const schedule = scheduleState[selectedClass];
    const displayDays = layoutMode === 'mon-fri' ? allDays.slice(0, 5) : allDays;

    const handleSaveSlot = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newSubject = formData.get('subject');
        const newTeacher = formData.get('teacher');
        const newRoom = formData.get('room');

        setScheduleState(prev => {
            const newSchedule = { ...prev };
            const classRef = { ...newSchedule[selectedClass] };
            const dayRef = [...classRef[editingSlot.day]];

            dayRef[editingSlot.slotIdx] = {
                subject: newSubject,
                teacher: newTeacher,
                room: newRoom
            };

            classRef[editingSlot.day] = dayRef;
            newSchedule[selectedClass] = classRef;
            return newSchedule;
        });

        setEditingSlot(null);
    };

    return (
        <div className="timetable-page">
            {/* Print Only Title */}
            <h1 className="tt-print-title">
                Time Table of Class {selectedClass}
            </h1>

            {/* Control Bar */}
            <div className="tt-controls tt-no-print">
                <div className="tt-controls__left">
                    <div className="tt-select-wrapper">
                        <select
                            className="tt-select"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(Number(e.target.value))}
                        >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((cls) => (
                                <option key={cls} value={cls}>
                                    Class {cls}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="tt-select-icon" size={18} />
                    </div>
                    <div className="tt-controls__divider" />
                    <h2 className="tt-controls__title">Time table</h2>
                </div>

                <div className="tt-controls__right">
                    {isEditing && (
                        <div className="tt-select-wrapper mr-2">
                            <select
                                className="tt-select tt-select--layout"
                                value={layoutMode}
                                onChange={(e) => setLayoutMode(e.target.value)}
                            >
                                <option value="mon-sat">Mon-Sat</option>
                                <option value="mon-fri">Mon-Friday</option>
                            </select>
                            <ChevronDown className="tt-select-icon" size={18} />
                        </div>
                    )}

                    <button className="tt-btn tt-btn--secondary" onClick={() => window.print()}>
                        <Printer size={16} />
                        Print
                    </button>
                    <button
                        className={`tt-btn tt-btn--primary ${isEditing ? 'tt-btn--active' : ''}`}
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? <Check size={14} /> : <Pencil size={14} />}
                        {isEditing ? 'Done' : 'Edit'}
                    </button>
                </div>
            </div>

            {/* Timetable Grid */}
            <div className="tt-scroll-wrapper">
                <div className="tt-grid-container">
                    <div className="tt-grid" style={{ gridTemplateColumns: `100px repeat(${timeSlots.length}, 1fr)` }}>
                        {/* Header Row */}
                        <div className="tt-header-cell tt-header-corner" />
                        {timeSlots.map((slot) => (
                            <div
                                key={slot.id}
                                className={`tt-header-cell ${slot.id === 'break' ? 'tt-header-cell--break' : ''}`}
                            >
                                <span className="tt-header-label">
                                    {slot.label}
                                </span>
                                <span className={`tt-header-time ${slot.id === 'break' ? 'tt-header-time--break' : ''}`}>
                                    {slot.time}
                                </span>
                            </div>
                        ))}

                        {/* Day Rows */}
                        {displayDays.map((day) => {
                            const daySlots = schedule?.[day] || [];
                            return (
                                <>
                                    {/* Day label */}
                                    <div key={`${day}-label`} className="tt-day-cell">
                                        <span className="tt-day-label">{day}</span>
                                    </div>

                                    {/* Slot cells */}
                                    {timeSlots.map((slot, slotIdx) => {
                                        // Break column
                                        if (slot.id === 'break') {
                                            return (
                                                <div key={`${day}-break-${slotIdx}`} className="tt-cell tt-cell--break">
                                                    <UtensilsCrossed size={18} className="tt-break-icon" />
                                                </div>
                                            );
                                        }

                                        const entry = daySlots[slotIdx];

                                        // Empty slot
                                        if (!entry) {
                                            return (
                                                <div
                                                    key={`${day}-${slotIdx}`}
                                                    className="tt-cell tt-cell--empty"
                                                    onClick={() => {
                                                        if (isEditing) {
                                                            setEditingSlot({ day, slotIdx, subject: subjects[0], teacher: teachers[0].name, room: rooms[0] });
                                                        }
                                                    }}
                                                >
                                                    <Plus size={18} className="tt-empty-icon" />
                                                </div>
                                            );
                                        }

                                        // Subject card
                                        const colors = subjectColorMap[entry.subject] || subjectColorMap.Mathematics;

                                        return (
                                            <div
                                                key={`${day}-${slotIdx}`}
                                                className="tt-cell tt-subject-card group"
                                                style={{
                                                    '--card-accent': colors.accent,
                                                    '--card-shadow': colors.shadow,
                                                }}
                                            >
                                                <div className="tt-subject-accent" style={{ background: colors.accent }} />

                                                {isEditing && (
                                                    <button
                                                        className="tt-slot-edit-btn"
                                                        onClick={() => setEditingSlot({ day, slotIdx, ...entry })}
                                                    >
                                                        <Pencil size={12} />
                                                    </button>
                                                )}

                                                <h3 className="tt-subject-name">{entry.subject}</h3>
                                                <p className="tt-subject-teacher">{entry.teacher}</p>
                                                <p className="tt-subject-room">{entry.room}</p>
                                            </div>
                                        );
                                    })}
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editingSlot && (
                <div className="tt-modal-overlay">
                    <div className="tt-modal">
                        <div className="tt-modal-header">
                            <h3>Edit Slot - {editingSlot.day} {timeSlots[editingSlot.slotIdx].time}</h3>
                            <button className="tt-modal-close" onClick={() => setEditingSlot(null)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveSlot} className="tt-modal-body">
                            <div className="tt-form-group">
                                <label>Subject</label>
                                <select name="subject" defaultValue={editingSlot.subject} required className="tt-input">
                                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="tt-form-group">
                                <label>Teacher</label>
                                <select name="teacher" defaultValue={editingSlot.teacher} required className="tt-input">
                                    {teachers.map(t => <option key={t.id} value={t.name}>{t.name} ({t.subject})</option>)}
                                </select>
                            </div>
                            <div className="tt-form-group">
                                <label>Room (Optional)</label>
                                <select name="room" defaultValue={editingSlot.room || ''} className="tt-input">
                                    <option value="">-- No Room --</option>
                                    {rooms.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="tt-modal-footer">
                                <button type="button" className="tt-btn tt-btn--secondary" onClick={() => setEditingSlot(null)}>
                                    Cancel
                                </button>
                                <button type="submit" className="tt-btn tt-btn--primary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
