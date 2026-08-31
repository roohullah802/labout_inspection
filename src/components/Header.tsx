import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu, User, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
    onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Determine role from URL
    const searchParams = new URLSearchParams(location.search);
    const roleParam = searchParams.get("role")?.toLowerCase() || "secretary";

    let title = "Secretary Labour Dashboard";
    let roleDisplay = "Secretary";

    if (roleParam === "director") {
        title = "Director - Dashboard";
        roleDisplay = "Director";
    } else if (roleParam === "district attorney" || roleParam === "district_attorney") {
        title = "District Attorney Dashboard";
        roleDisplay = "District Attorney";
    }

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-white px-3 py-3 sm:px-5 sm:py-4 flex items-center justify-between gap-3 relative">
            <div className="flex items-center gap-3 min-w-0">
                {/* Hamburger — visible only on mobile */}
                {onMenuToggle && (
                    <button
                        onClick={onMenuToggle}
                        className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition lg:hidden shrink-0"
                        aria-label="Open sidebar"
                    >
                        <Menu size={22} />
                    </button>
                )}

                <h2 className="text-base sm:text-xl font-semibold text-[#05264E] truncate">
                    {title}
                </h2>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 shrink-0 relative">
                <button className="relative text-slate-400 hover:text-slate-600">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Profile Section with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 sm:gap-3 hover:bg-slate-50 p-1.5 -m-1.5 rounded-lg transition-colors focus:outline-none"
                    >
                        <img
                            src="https://i.pravatar.cc/40?img=13"
                            alt="Fazal Manan"
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0"
                        />
                        <div className="text-sm leading-tight hidden sm:block text-left">
                            <p className="font-semibold text-slate-700">Fazal Manan</p>
                            <p className="text-xs text-slate-400">{roleDisplay}</p>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-slate-400 hidden sm:block transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {profileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-4 py-3 border-b border-slate-100 sm:hidden">
                                <p className="text-sm font-semibold text-slate-700">Fazal Manan</p>
                                <p className="text-xs text-slate-400">{roleDisplay}</p>
                            </div>
                            <div className="py-1">
                                <Link
                                    to="/admin/settings"
                                    onClick={() => setProfileOpen(false)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#14B8A6] transition-colors"
                                >
                                    <User size={15} />
                                    My Profile
                                </Link>
                            </div>
                            <div className="border-t border-slate-100 py-1">
                                <button
                                    onClick={() => {
                                        setProfileOpen(false);
                                        navigate('/sign-in');
                                    }}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={15} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};