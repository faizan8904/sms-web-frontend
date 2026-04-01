import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './layout.css';

export default function MainLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Track viewport width
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Lock body scroll when mobile sidebar is open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileOpen]);

    const handleToggle = () => setIsCollapsed((prev) => !prev);
    const handleMobileOpen = () => setIsMobileOpen(true);
    const handleMobileClose = () => setIsMobileOpen(false);

    return (
        <div className="layout">
            <Sidebar
                isCollapsed={isCollapsed}
                isMobileOpen={isMobileOpen}
                onToggle={handleToggle}
                onMobileClose={handleMobileClose}
            />

            <Topbar
                isCollapsed={isCollapsed}
                onToggle={handleToggle}
                onMobileOpen={handleMobileOpen}
            />

            <main
                className={`content ${isMobile
                    ? ''
                    : isCollapsed
                        ? 'content--sidebar-collapsed'
                        : 'content--sidebar-expanded'
                    }`}
            >
                <Outlet />
            </main>
        </div>
    );
}
