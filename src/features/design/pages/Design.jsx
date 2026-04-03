import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MonitorOff } from 'lucide-react';
import DesignGrid from './DesignGrid';
import IdCard from './IdCard';
import Certificate from './Certificate';
import MarksCard from './MarksCard';
import HallTicket from './HallTicket';

const DesktopOnlyWrapper = ({ children }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return (
            <div className="desktop-only-warning">
                <div className="warning-content">
                    <div className="warning-icon-wrapper">
                        <MonitorOff size={48} />
                    </div>
                    <h1>Desktop Only Feature</h1>
                    <p>
                        Our design tools require a larger screen for precision editing and layout management.
                        Please switch to a desktop or laptop to access the designer.
                    </p>
                </div>
            </div>
        );
    }

    return children;
};

export default function Design() {
    return (
        <DesktopOnlyWrapper>
            <Routes>
                <Route index element={<DesignGrid />} />
                <Route path="id-card" element={<IdCard />} />
                <Route path="certificate" element={<Certificate />} />
                <Route path="marks-card" element={<MarksCard />} />
                <Route path="hall-ticket" element={<HallTicket />} />
            </Routes>
        </DesktopOnlyWrapper>
    );
}
