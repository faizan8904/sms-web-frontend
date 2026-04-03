import React, { useState } from 'react';
import { ArrowLeft, Save, User, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './design.css';
import './idCard.css';

// A simple dummy QR Code component using SVG paths
const DummyQRCode = () => (
    <svg viewBox="0 0 33 33" stroke="none" fill="currentColor" style={{ width: '100%', height: '100%', padding: '10%' }}>
        <path d="M0,0 h14 v14 h-14 z M2,2 v10 h10 v-10 z M4,4 h6 v6 h-6 z M19,0 h14 v14 h-14 z M21,2 v10 h10 v-10 z M23,4 h6 v6 h-6 z M0,19 h14 v14 h-14 z M2,21 v10 h10 v-10 z M4,23 h6 v6 h-6 z M17,17 h4 v4 h-4 z M23,17 h4 v4 h-4 z M29,17 h4 v4 h-4 z M17,23 h4 v4 h-4 z M25,23 h4 v4 h-4 z M21,27 h4 v4 h-4 z M27,27 h4 v2 h-4 z M17,29 h4 v4 h-4 z M23,31 h6 v2 h-6 z" />
    </svg>
);

export default function IdCard() {
    const navigate = useNavigate();

    // State
    const [cardType, setCardType] = useState('student');
    const [orientation, setOrientation] = useState('portrait');
    const [cardSize, setCardSize] = useState('standard');
    const [viewSide, setViewSide] = useState('front');
    const [theme, setTheme] = useState('purple');

    const [schoolLogo, setSchoolLogo] = useState(null);
    const [signature, setSignature] = useState(null);

    const [fields, setFields] = useState({
        photo: true,
        qr: true,
        name: true,
        session: true,
        studentClass: true,
        section: true,
        rollNo: true,
        dob: true,
        fatherName: true,
        bloodGroup: true,
        phone: true,
        address: true,
    });

    const handleFieldChange = (field) => {
        setFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleImageUpload = (e, setter) => {
        if (e.target.files && e.target.files[0]) {
            setter(URL.createObjectURL(e.target.files[0]));
        }
    };

    const themeOptions = [
        { id: 'purple', label: 'Purple Palette' },
        { id: 'green', label: 'Green Palette' },
        { id: 'pink', label: 'Pink Palette' },
        { id: 'black', label: 'Black Palette' },
        { id: 'golden', label: 'Golden Palette' }
    ];

    const dummyData = {
        name: 'John Doe',
        session: '2023-2024',
        studentClass: '10th',
        section: 'A',
        rollNo: '24',
        dob: '15/08/2005',
        fatherName: 'Robert Doe',
        bloodGroup: 'O+',
        phone: '+1 234 567 890',
        address: '123 Education Lane, Knowledge City, State - 12345'
    };

    return (
        <div className="design-page-container id-designer-wrapper">
            <header className="design-page-header">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <h2>ID Card Designer</h2>
            </header>

            <main className="id-designer-combined-box">
                {/* Left Panel: Live Preview */}
                <section className="id-preview-panel">
                    <div className="preview-toolbar">
                        <div className="designer-toggle-group">
                            <button
                                className={`designer-toggle-btn ${viewSide === 'front' ? 'active' : ''}`}
                                onClick={() => setViewSide('front')}
                            >
                                Front View
                            </button>
                            <button
                                className={`designer-toggle-btn ${viewSide === 'back' ? 'active' : ''}`}
                                onClick={() => setViewSide('back')}
                            >
                                Back View
                            </button>
                        </div>
                    </div>

                    <div className="preview-canvas">
                        <div className={`id-card-preview theme-${theme} ${orientation} ${cardSize} ${cardType} ${viewSide}`}>
                            {viewSide === 'front' ? (
                                <div className="id-card-content front">
                                    <div className="card-header">
                                        {schoolLogo ? (
                                            <img src={schoolLogo} alt="School Logo" className="school-logo-img" />
                                        ) : (
                                            <div className="school-logo-placeholder">Logo</div>
                                        )}
                                        <div className="school-name">SMS School</div>
                                    </div>

                                    <div className="card-body">
                                        <div className="photo-qr-row">
                                            {fields.photo && (
                                                <div className="card-photo">
                                                    <User size={36} className="photo-icon" />
                                                </div>
                                            )}
                                            {fields.qr && (
                                                <div className="card-qr">
                                                    <DummyQRCode />
                                                </div>
                                            )}
                                        </div>

                                        <div className="card-details">
                                            <div className="details-grid">
                                                {fields.name && (
                                                    <div className="grid-cell col-span-2 title-cell">
                                                        <h3>{dummyData.name}</h3>
                                                    </div>
                                                )}

                                                {fields.session && (
                                                    <div className="grid-cell">
                                                        <span className="cell-label">Session</span>
                                                        <span className="cell-value">{dummyData.session}</span>
                                                    </div>
                                                )}
                                                {fields.rollNo && cardType === 'student' && (
                                                    <div className="grid-cell">
                                                        <span className="cell-label">Roll No</span>
                                                        <span className="cell-value">{dummyData.rollNo}</span>
                                                    </div>
                                                )}
                                                {fields.studentClass && cardType === 'student' && (
                                                    <div className="grid-cell">
                                                        <span className="cell-label">Class</span>
                                                        <span className="cell-value">{dummyData.studentClass}</span>
                                                    </div>
                                                )}
                                                {fields.section && cardType === 'student' && (
                                                    <div className="grid-cell">
                                                        <span className="cell-label">Section</span>
                                                        <span className="cell-value">{dummyData.section}</span>
                                                    </div>
                                                )}
                                                {fields.dob && (
                                                    <div className="grid-cell">
                                                        <span className="cell-label">D.O.B</span>
                                                        <span className="cell-value">{dummyData.dob}</span>
                                                    </div>
                                                )}
                                                {fields.phone && (
                                                    <div className="grid-cell">
                                                        <span className="cell-label">Phone</span>
                                                        <span className="cell-value">{dummyData.phone}</span>
                                                    </div>
                                                )}

                                                {/* Father Name and Blood Group Side by Side */}
                                                {fields.fatherName && (
                                                    <div className={`grid-cell ${fields.bloodGroup ? 'col-span-1' : 'col-span-2'}`}>
                                                        <span className="cell-label">Father's Name</span>
                                                        <span className="cell-value">{dummyData.fatherName}</span>
                                                    </div>
                                                )}
                                                {fields.bloodGroup && (
                                                    <div className={`grid-cell ${fields.fatherName ? 'col-span-1' : 'col-span-2'}`}>
                                                        <span className="cell-label">Blood Group</span>
                                                        <span className="cell-value">{dummyData.bloodGroup}</span>
                                                    </div>
                                                )}

                                                {fields.address && (
                                                    <div className="grid-cell col-span-2">
                                                        <span className="cell-label">Address</span>
                                                        <span className="cell-value">{dummyData.address}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thin curved line */}
                                    <div className="curved-footer"></div>
                                </div>
                            ) : (
                                <div className="id-card-content back">
                                    <div className="card-header">
                                        {schoolLogo ? (
                                            <img src={schoolLogo} alt="School Logo" className="school-logo-img" />
                                        ) : (
                                            <div className="school-logo-placeholder">Logo</div>
                                        )}
                                        <div className="school-name">SMS School</div>
                                    </div>

                                    <div className="back-body">
                                        <div className="back-address-block">
                                            <p className="back-school-address">456 Education Ave, Knowledge City, ST 12345</p>
                                            <p className="back-school-contact">Phone: (555) 123-4567 | Email: admin@smsschool.edu</p>
                                        </div>

                                        <div className="back-rules-container">
                                            <h5 className="rules-title">Card Instructions:</h5>
                                            <ul className="back-rules-list">
                                                <li>Always wear this ID card on campus.</li>
                                                <li>Report loss immediately to administration.</li>
                                                <li>Do not bend or expose to high heat.</li>
                                                <li>This card is non-transferable.</li>
                                            </ul>
                                        </div>

                                        <div className="back-footer-content">
                                            <div className="signature-area">
                                                {signature ? (
                                                    <img src={signature} alt="Signature" className="signature-img" />
                                                ) : (
                                                    <div className="signature-line"></div>
                                                )}
                                                <p>Authorized Signature</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="curved-footer"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Right Panel: Form / Controls */}
                <aside className="id-designer-controls">
                    <div className="designer-controls-row">
                        <div className="control-group">
                            <label>Card Type</label>
                            <select value={cardType} onChange={e => setCardType(e.target.value)} className="designer-input">
                                <option value="student">Student ID</option>
                                <option value="staff">Staff ID</option>
                            </select>
                        </div>

                        <div className="control-group">
                            <label>Card Size</label>
                            <select value={cardSize} onChange={e => setCardSize(e.target.value)} className="designer-input">
                                <option value="standard">Standard (CR80)</option>
                                <option value="compact">Compact</option>
                            </select>
                        </div>
                    </div>

                    <div className="designer-controls-row">
                        <div className="control-group">
                            <label>Theme</label>
                            <div className="theme-selector">
                                {themeOptions.map(t => (
                                    <button
                                        key={t.id}
                                        className={`theme-btn ${theme === t.id ? 'active' : ''} theme-btn-${t.id}`}
                                        onClick={() => setTheme(t.id)}
                                        title={t.label}
                                    >
                                        {theme === t.id && <div className="theme-btn-indicator" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="control-group">
                            <label>Orientation</label>
                            <div className="designer-toggle-group">
                                <button
                                    className={`designer-toggle-btn ${orientation === 'portrait' ? 'active' : ''}`}
                                    onClick={() => setOrientation('portrait')}
                                >
                                    Port.
                                </button>
                                <button
                                    className={`designer-toggle-btn ${orientation === 'landscape' ? 'active' : ''}`}
                                    onClick={() => setOrientation('landscape')}
                                >
                                    Land.
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="upload-grid">
                        <div className="control-group">
                            <label>School Logo</label>
                            <div className="file-upload-wrapper">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setSchoolLogo)}
                                    className="designer-file-input"
                                    id="logoUpload"
                                />
                                <label htmlFor="logoUpload" className="file-upload-label">
                                    <Upload size={14} /> Upload
                                </label>
                                {schoolLogo && <span className="upload-success-text">Set</span>}
                            </div>
                        </div>

                        <div className="control-group">
                            <label>Principal Signature</label>
                            <div className="file-upload-wrapper">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setSignature)}
                                    className="designer-file-input"
                                    id="signatureUpload"
                                />
                                <label htmlFor="signatureUpload" className="file-upload-label">
                                    <Upload size={14} /> Upload
                                </label>
                                {signature && <span className="upload-success-text">Set</span>}
                            </div>
                        </div>
                    </div>

                    <div className="control-group fields-group">
                        <label>Show Elements</label>
                        <div className="fields-grid-checkboxes">
                            {Object.entries(fields).map(([key, value]) => {
                                const labelText = key === 'studentClass' ? 'Class' :
                                    key === 'rollNo' ? 'Roll No' :
                                        key === 'fatherName' ? "Father's Name" :
                                            key === 'bloodGroup' ? "Blood Group" :
                                                key === 'dob' ? 'DOB' :
                                                    key === 'qr' ? 'QR Code' :
                                                        key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

                                return (
                                    <label key={key} className="designer-checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={() => handleFieldChange(key)}
                                        />
                                        <span>{labelText}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="designer-actions">
                        <button className="designer-save-btn">
                            <Save size={18} />
                            Save Design
                        </button>
                    </div>
                </aside>
            </main>
        </div>
    );
}
