import {
    LayoutDashboard,
    GraduationCap,
    Users,
    UserCog,
    CalendarClock,
    Sparkles,
    ClipboardCheck,
    FileText,
    ScrollText,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: GraduationCap, label: 'Student' },
    { icon: Users, label: 'Teacher' },
    { icon: UserCog, label: 'Staff' },
    { icon: CalendarClock, label: 'Time Table' },
    { icon: Sparkles, label: 'Generator' },
    { icon: ClipboardCheck, label: 'Attendance' },
    { icon: FileText, label: 'Exam' },
    { icon: ScrollText, label: 'Logs' },
    { icon: Settings, label: 'Setting' },
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
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.label}
                                className={`sidebar__menu-item ${index === 0 ? 'sidebar__menu-item--active' : ''}`}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <Icon className="sidebar__menu-icon" />
                                <span className="sidebar__menu-label">{item.label}</span>
                            </button>
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
