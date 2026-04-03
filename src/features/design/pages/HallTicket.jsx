import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './design.css';

export default function HallTicket() {
    const navigate = useNavigate();
    return (
        <div className="design-page-container">
            <header className="design-page-header">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <h2>Hall Ticket / Admit Card Generator</h2>
            </header>
            <main className="design-page-content">
                <p>Hall Ticket Generator Page (Placeholder)</p>
            </main>
        </div>
    );
}
