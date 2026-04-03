import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './design.css';

export default function Certificate() {
    const navigate = useNavigate();
    return (
        <div className="design-page-container">
            <header className="design-page-header">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <h2>Certificate Generator</h2>
            </header>
            <main className="design-page-content">
                <p>Certificate Generator Page (Placeholder)</p>
            </main>
        </div>
    );
}
