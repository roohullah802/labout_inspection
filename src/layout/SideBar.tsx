import { Building2, FileText, LayoutGrid, LogOut, Settings, Users, UserSquare2, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItem {
    label: string;
    icon: React.ReactNode;
    active?: boolean;
    navigation?: string;
}

const navItems: NavItem[] = [
    { label: "Dashboard", icon: <LayoutGrid size={18} />, navigation: "/admin" },
    { label: "Administration", icon: <Users size={18} />, navigation: "/admin/administration" },
    { label: "Companies", icon: <Building2 size={18} />, navigation: "/admin/companies" },
    { label: "Challans", icon: <FileText size={18} />, navigation: "/admin/challans" },
    { label: "Report", icon: <UserSquare2 size={18} />, navigation: "/admin/report" },
    { label: "Settings", icon: <Settings size={18} />, navigation: "/admin/settings" },
];

interface SideBarProps {
    onClose?: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <aside className="w-52 h-screen bg-[#33105a] text-white flex flex-col shrink-0">
            {/* Logo + close button on mobile */}
            <div className="flex flex-col items-center py-6 px-4 border-b border-white/10 relative">
                {/* Close button — only visible on mobile */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={18} />
                    </button>
                )}

                <div className="w-12 h-12 flex items-center justify-center mb-2">
                    <img
                        src="../src/assets/dashboard-logo-green.svg"
                        alt="Dashboard Logo"
                        className="w-full h-full object-contain"
                    />
                </div>

                <h1 className="text-base font-semibold text-center">
                    Inspection System
                </h1>

                <p className="text-[11px] text-teal-300 tracking-wide mt-1 text-center">
                    Labour Department
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = item.navigation === "/admin"
                        ? location.pathname === item.navigation
                        : item.navigation ? location.pathname.startsWith(item.navigation) : false
                    return (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3  px-3 py-2 text-xs font-medium transition-all duration-200 ${isActive
                                ? "bg-linear-to-r from-[#8f74ac] to-[#33105a] text-white"
                                : "text-[#dddbdf] hover:bg-white/10 hover:bg-linear-to-r from-[#8f74ac] to-[#33105a]"
                                }`}
                            onClick={() => {
                                navigate(item.navigation)
                                onClose?.()
                            }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-white/10">
                <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-xs font-semibold text-red-500 transition hover:bg-red-50">
                    <LogOut size={15} />
                    Logout
                </button>
            </div>
        </aside>
    )
}