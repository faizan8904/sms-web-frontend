import { useNavigate } from 'react-router-dom';
import { Contact, Award, FileSpreadsheet, Ticket } from 'lucide-react';
import './design.css';

const designOptions = [
    { id: 'id-card', title: 'ID Card', icon: Contact, path: '/design/id-card', description: 'Generate student or staff identity cards' },
    { id: 'certificate', title: 'Certificate', icon: Award, path: '/design/certificate', description: 'Create customizable achievement certificates' },
    { id: 'marks-card', title: 'Marks Card', icon: FileSpreadsheet, path: '/design/marks-card', description: 'Design standardized student mark sheets' },
    { id: 'hall-ticket', title: 'Hall Ticket / Admit Card', icon: Ticket, path: '/design/hall-ticket', description: 'Generate admit cards for examinations' },
];

export default function DesignGrid() {
    const navigate = useNavigate();

    return (
        <div className="design-container">
            <h1 className="design-title">Generate Documents</h1>
            <p className="design-subtitle">Select a document type to start designing</p>

            <div className="design-grid">
                {designOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                        <div
                            key={option.id}
                            className="design-card"
                            onClick={() => navigate(option.path)}
                        >
                            <div className="design-card-header">
                                <div className="design-card-icon-wrapper">
                                    <Icon className="design-card-icon" />
                                </div>
                                <h3 className="design-card-title">{option.title}</h3>
                            </div>
                            <p className="design-card-description">{option.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
