import { Bell, Menu } from 'lucide-react';

export default function Topbar({ isCollapsed, onToggle, onMobileOpen }) {
    const handleHamburgerClick = () => {
        if (window.innerWidth <= 768) {
            onMobileOpen();
        } else {
            onToggle();
        }
    };

    return (
        <header
            className={`topbar ${isCollapsed ? 'topbar--sidebar-collapsed' : 'topbar--sidebar-expanded'}`}
        >
            <div className="topbar__left">
                {/* Mobile hamburger */}
                <button
                    className="topbar__hamburger"
                    onClick={handleHamburgerClick}
                    aria-label="Toggle menu"
                >
                    <Menu size={22} />
                </button>
            </div>

            <div className="topbar__right">
                {/* Notification */}
                <button className="topbar__notification" aria-label="Notifications">
                    <Bell size={20} />
                    <span className="topbar__notification-dot" />
                </button>

                {/* Profile avatar */}
                <div className="topbar__avatar" title="Profile">
                    FA
                </div>
            </div>
        </header>
    );
}
