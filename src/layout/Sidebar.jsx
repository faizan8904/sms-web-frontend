import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
    ChevronDown,
    UserPlus,
    Library
} from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    {
        icon: GraduationCap,
        label: 'Student',
        href: '/student',
        subItems: [
            { icon: Users, label: 'Students', href: '/student/all' },
            { icon: UserPlus, label: 'Add Students', href: '/student/add' },
        ]
    },
    {
        icon: GraduationCap,
        label: 'Teacher',
        href: '/teacher',
        subItems: [
            { icon: Users, label: 'All Teachers', href: '/teacher/all' },
            { icon: UserPlus, label: 'Add Teacher', href: '/teacher/add' },
        ]
    },
    {
        icon: UserCog,
        label: 'Staff',
        href: '/staff',
        subItems: [
            { icon: Users, label: 'All Staff', href: '/staff/all' },
            { icon: UserPlus, label: 'Add Staff', href: '/staff/add' },
        ]
    },
    {
        icon: Library,
        label: 'Academic',
        href: '/academic',
        subItems: [
            { icon: LayoutDashboard, label: 'Academic Structure', href: '/academic/structure' },
            { icon: GraduationCap, label: 'Classes', href: '/academic/classes' },
            { icon: Users, label: 'Sections', href: '/academic/sections' },
        ]
    },
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
    const location = useLocation();
    const [openSubMenus, setOpenSubMenus] = useState({});

    const toggleSubMenu = (label) => {
        setOpenSubMenus(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    const isSubMenuActive = (subItems) => {
        return subItems.some(item => location.pathname.startsWith(item.href));
    };

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
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        const isOpen = openSubMenus[item.label] || isSubMenuActive(item.subItems || []);

                        if (hasSubItems) {
                            return (
                                <div key={item.label} className="sidebar__menu-group">
                                    <button
                                        onClick={() => toggleSubMenu(item.label)}
                                        className={`sidebar__menu-item ${isOpen ? 'sidebar__menu-item--open' : ''} ${isSubMenuActive(item.subItems) ? 'sidebar__menu-item--active' : ''}`}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        <div className="sidebar__menu-item-main">
                                            <Icon className="sidebar__menu-icon" />
                                            {!isCollapsed && <span className="sidebar__menu-label">{item.label}</span>}
                                        </div>
                                        {!isCollapsed && (
                                            <ChevronDown
                                                size={16}
                                                className={`sidebar__chevron ${isOpen ? 'sidebar__chevron--rotated' : ''}`}
                                            />
                                        )}
                                    </button>

                                    {isOpen && !isCollapsed && (
                                        <div className="sidebar__sub-menu">
                                            {item.subItems.map((subItem) => {
                                                const SubIcon = subItem.icon;
                                                return (
                                                    <NavLink
                                                        key={subItem.label}
                                                        to={subItem.href}
                                                        className={({ isActive }) =>
                                                            `sidebar__sub-menu-item ${isActive ? 'sidebar__sub-menu-item--active' : ''}`
                                                        }
                                                        onClick={onMobileClose}
                                                    >
                                                        <SubIcon className="sidebar__sub-menu-icon" />
                                                        <span className="sidebar__sub-menu-label">{subItem.label}</span>
                                                    </NavLink>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

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
