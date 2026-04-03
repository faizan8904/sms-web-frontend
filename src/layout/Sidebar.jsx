import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    GraduationCap,
    Users,
    UserCog,
    CalendarClock,
    Palette,
    ClipboardCheck,
    FileText,
    ScrollText,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: GraduationCap, label: 'Student', href: '/student' },
    { icon: Users, label: 'Teacher', href: '/teacher' },
    { icon: UserCog, label: 'Staff', href: '/staff' },
    { icon: CalendarClock, label: 'Time Table', href: '/timetable' },
    { icon: Palette, label: 'Design', href: '/design' },
    { icon: ClipboardCheck, label: 'Attendance', href: '/attendance' },
    { icon: FileText, label: 'Exam', href: '/exam' },
    { icon: ScrollText, label: 'Logs', href: '/logs' },
    { icon: Settings, label: 'Setting', href: '/settings' },
];

export default function Sidebar({
    isCollapsed,
    isMobileOpen,
    onToggle,
    onMobileClose,
}) {
    const sidebarClasses = [
        'sidebar',
        isCollapsed ? 'sidebar--collapsed' : 'sidebar--expanded',
        isMobileOpen ? 'sidebar--mobile-open' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <>
            {/* Mobile overlay */}
            <div
                className={`sidebar-overlay ${isMobileOpen ? 'sidebar-overlay--visible' : ''}`}
                onClick={onMobileClose}
            />

            <aside className={sidebarClasses}>
                {/* Header */}
                <div className="sidebar__header">
                    <div className="sidebar__logo">S</div>
                    <span className="sidebar__school-name">SMS School</span>

                    {/* Desktop toggle */}
                    <button
                        className="sidebar__toggle"
                        onClick={onToggle}
                        aria-label="Toggle sidebar"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Mobile close */}
                    <button
                        className="sidebar__close"
                        onClick={onMobileClose}
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="sidebar__nav">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.label}
                                to={item.href}
                                className={({ isActive }) =>
                                    `sidebar__menu-item ${isActive ? 'sidebar__menu-item--active' : ''}`
                                }
                                title={isCollapsed ? item.label : undefined}
                                onClick={onMobileClose}
                            >
                                <Icon className="sidebar__menu-icon" />
                                <span className="sidebar__menu-label">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="sidebar__footer">
                    <button className="sidebar__logout" title={isCollapsed ? 'Logout' : undefined}>
                        <LogOut className="sidebar__menu-icon" />
                        <span className="sidebar__menu-label">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
