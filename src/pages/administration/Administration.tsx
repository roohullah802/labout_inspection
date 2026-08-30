import { useState } from "react";
import {
    Home,
    Search,
    Users,
    Shield,
    Phone,
    MapPin,
    CheckCircle2,
    XCircle,
    Clock,
    Eye,
    Pencil,
    Trash2,
    Filter,
    ClipboardList,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import Path from "../../components/Path";

/* ─── Types ─── */
type UserRole = "Secretary" | "Admin" | "Inspector" | "Viewer";
type UserStatus = "Active" | "Inactive" | "Suspended";

interface SystemUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    district: string;
    status: UserStatus;
    joinedDate: string;
    lastActive: string;
    inspections: number;
    avatar: string;
}

/* ─── Mock Data ─── */
const users: SystemUser[] = [
    {
        id: "1",
        name: "Fazal Manan",
        email: "fazal.manan@labour.gov.pk",
        phone: "0345-1112233",
        role: "Secretary",
        district: "Peshawar",
        status: "Active",
        joinedDate: "01.01.2023",
        lastActive: "Today",
        inspections: 0,
        avatar: "FM",
    },
    {
        id: "2",
        name: "Kashif Khan",
        email: "kashif.khan@labour.gov.pk",
        phone: "0333-4455667",
        role: "Inspector",
        district: "Peshawar",
        status: "Active",
        joinedDate: "15.03.2023",
        lastActive: "Today",
        inspections: 48,
        avatar: "KK",
    },
    {
        id: "3",
        name: "Adnan Shah",
        email: "adnan.shah@labour.gov.pk",
        phone: "0321-9876543",
        role: "Inspector",
        district: "Mardan",
        status: "Active",
        joinedDate: "22.06.2023",
        lastActive: "Yesterday",
        inspections: 42,
        avatar: "AS",
    },
    {
        id: "4",
        name: "Imran Ali",
        email: "imran.ali@labour.gov.pk",
        phone: "0300-1122334",
        role: "Inspector",
        district: "Nowshera",
        status: "Active",
        joinedDate: "08.01.2024",
        lastActive: "2 days ago",
        inspections: 38,
        avatar: "IA",
    },
    {
        id: "5",
        name: "Saeed Ahmad",
        email: "saeed.ahmad@labour.gov.pk",
        phone: "0312-7788990",
        role: "Inspector",
        district: "Abbottabad",
        status: "Inactive",
        joinedDate: "03.04.2024",
        lastActive: "1 week ago",
        inspections: 35,
        avatar: "SA",
    },
    {
        id: "6",
        name: "Farhan Gul",
        email: "farhan.gul@labour.gov.pk",
        phone: "0346-3344556",
        role: "Inspector",
        district: "Swat",
        status: "Active",
        joinedDate: "19.11.2023",
        lastActive: "Today",
        inspections: 30,
        avatar: "FG",
    },
    {
        id: "7",
        name: "Bilal Afridi",
        email: "bilal.afridi@labour.gov.pk",
        phone: "0301-9988776",
        role: "Admin",
        district: "Peshawar",
        status: "Active",
        joinedDate: "10.02.2023",
        lastActive: "Today",
        inspections: 0,
        avatar: "BA",
    },
    {
        id: "8",
        name: "Waqar Hussain",
        email: "waqar.hussain@labour.gov.pk",
        phone: "0345-5566778",
        role: "Admin",
        district: "Mardan",
        status: "Active",
        joinedDate: "05.05.2023",
        lastActive: "3 days ago",
        inspections: 0,
        avatar: "WH",
    },
    {
        id: "9",
        name: "Noman Baig",
        email: "noman.baig@labour.gov.pk",
        phone: "0333-2244668",
        role: "Viewer",
        district: "Peshawar",
        status: "Active",
        joinedDate: "14.07.2024",
        lastActive: "Today",
        inspections: 0,
        avatar: "NB",
    },
    {
        id: "10",
        name: "Tariq Mehmood",
        email: "tariq.m@labour.gov.pk",
        phone: "0300-8877665",
        role: "Inspector",
        district: "Buner",
        status: "Suspended",
        joinedDate: "20.09.2023",
        lastActive: "2 weeks ago",
        inspections: 12,
        avatar: "TM",
    },
];

/* ─── Role Badge ─── */
function RoleBadge({ role }: { role: UserRole }) {
    const styles: Record<UserRole, string> = {
        Secretary: "bg-purple-50 text-purple-600",
        Admin: "bg-blue-50 text-blue-600",
        Inspector: "bg-teal-50 text-teal-600",
        Viewer: "bg-slate-100 text-slate-500",
    };
    const icons: Record<UserRole, React.ReactNode> = {
        Secretary: <Shield size={10} />,
        Admin: <Shield size={10} />,
        Inspector: <Eye size={10} />,
        Viewer: <Eye size={10} />,
    };
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold ${styles[role]}`}
        >
            {icons[role]} {role}
        </span>
    );
}

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: UserStatus }) {
    const config: Record<UserStatus, { style: string; icon: React.ReactNode }> = {
        Active: {
            style: "bg-emerald-50 text-emerald-600",
            icon: <CheckCircle2 size={10} />,
        },
        Inactive: {
            style: "bg-slate-100 text-slate-500",
            icon: <Clock size={10} />,
        },
        Suspended: {
            style: "bg-rose-50 text-rose-500",
            icon: <XCircle size={10} />,
        },
    };
    const s = config[status];
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold ${s.style}`}
        >
            {s.icon} {status}
        </span>
    );
}

/* ─── Avatar ─── */
function Avatar({ initials, role }: { initials: string; role: UserRole }) {
    const bgColors: Record<UserRole, string> = {
        Secretary: "bg-purple-500",
        Admin: "bg-blue-500",
        Inspector: "bg-teal-500",
        Viewer: "bg-slate-400",
    };
    return (
        <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${bgColors[role]}`}
        >
            {initials}
        </div>
    );
}

/* ─── Summary Card ─── */
function SummaryCard({
    icon,
    iconBg,
    iconColor,
    value,
    label,
}: {
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    value: number | string;
    label: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm">
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
            >
                {icon}
            </div>
            <div>
                <p className="text-lg font-bold text-slate-800 leading-tight">{value}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{label}</p>
            </div>
        </div>
    );
}

/* ─── Mobile User Card ─── */
function UserCard({ user }: { user: SystemUser }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                    <Avatar initials={user.avatar} role={user.role} />
                    <div>
                        <p className="text-sm font-semibold text-slate-800 leading-tight">
                            {user.name}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{user.email}</p>
                    </div>
                </div>
                <StatusBadge status={user.status} />
            </div>

            <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                    <span className="text-gray-400">Role</span>
                    <RoleBadge role={user.role} />
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Phone</span>
                    <span className="font-medium text-gray-700">{user.phone}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">District</span>
                    <span className="font-medium text-gray-700">{user.district}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Joined</span>
                    <span className="font-medium text-gray-700">{user.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Last Active</span>
                    <span className="font-medium text-gray-700">{user.lastActive}</span>
                </div>
                {user.role === "Inspector" && (
                    <div className="flex justify-between">
                        <span className="text-gray-400">Inspections</span>
                        <span className="font-bold text-[#2D0D4D]">{user.inspections}</span>
                    </div>
                )}
            </div>

            <div className="flex gap-2 pt-1">
                <button className="flex-1 flex items-center justify-center gap-1 rounded-md bg-[#2D0D4D] px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#3d1568]">
                    <Pencil size={11} /> Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 rounded-md border border-gray-200 px-3 py-2 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-gray-50">
                    <Eye size={11} /> View
                </button>
            </div>
        </div>
    );
}

/* ─── Main Page ─── */
export default function AdministrationPage() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<"All" | UserRole>("All");
    const [statusFilter, setStatusFilter] = useState<"All" | UserStatus>("All");

    const filtered = users.filter((u) => {
        const matchSearch =
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.district.toLowerCase().includes(searchQuery.toLowerCase());
        const matchRole = roleFilter === "All" || u.role === roleFilter;
        const matchStatus = statusFilter === "All" || u.status === statusFilter;
        return matchSearch && matchRole && matchStatus;
    });

    // Aggregate stats
    const totalUsers = users.length;
    const totalAdmins = users.filter((u) => u.role === "Admin" || u.role === "Secretary").length;
    const totalInspectors = users.filter((u) => u.role === "Inspector").length;
    const activeUsers = users.filter((u) => u.status === "Active").length;

    return (
        <div className="flex h-full flex-1 flex-col bg-linear-to-b from-(--linear-top) to-(--linear-bottom)">
            <main className="flex-1 overflow-auto px-3 py-3 sm:px-5 sm:py-4">
                {/* Breadcrumb + action */}
                <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-1 text-[12px] bg-white p-2 border rounded-[5px] border-zinc-200 text-slate-500">
                        <Home size={12} />
                        <Path location={location} />
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    <SummaryCard
                        icon={<Users size={18} />}
                        iconBg="bg-blue-100"
                        iconColor="text-blue-600"
                        value={totalUsers}
                        label="Total Users"
                    />
                    <SummaryCard
                        icon={<Shield size={18} />}
                        iconBg="bg-purple-100"
                        iconColor="text-purple-600"
                        value={totalAdmins}
                        label="Admins & Secretary"
                    />
                    <SummaryCard
                        icon={<Eye size={18} />}
                        iconBg="bg-teal-100"
                        iconColor="text-teal-600"
                        value={totalInspectors}
                        label="Inspectors"
                    />
                    <SummaryCard
                        icon={<CheckCircle2 size={18} />}
                        iconBg="bg-emerald-100"
                        iconColor="text-emerald-600"
                        value={activeUsers}
                        label="Active Users"
                    />
                </div>

                {/* Search + Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                    <div className="relative flex-1">
                        <Search
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="Search by name, email, or district..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#14B8A6]/40 transition"
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Shield
                                size={13}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <select
                                value={roleFilter}
                                onChange={(e) =>
                                    setRoleFilter(e.target.value as "All" | UserRole)
                                }
                                className="appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-8 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-[#14B8A6]/40 transition cursor-pointer"
                            >
                                <option value="All">All Roles</option>
                                <option value="Secretary">Secretary</option>
                                <option value="Admin">Admin</option>
                                <option value="Inspector">Inspector</option>
                                <option value="Viewer">Viewer</option>
                            </select>
                        </div>
                        <div className="relative">
                            <Filter
                                size={13}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value as "All" | UserStatus)
                                }
                                className="appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-8 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-[#14B8A6]/40 transition cursor-pointer"
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Mobile: card list (< md) ─── */}
                <div className="space-y-3 md:hidden">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                            <Users size={40} className="mb-3 opacity-40" />
                            <p className="text-sm font-medium">No users found</p>
                            <p className="text-xs mt-1">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        filtered.map((u) => <UserCard key={u.id} user={u} />)
                    )}
                </div>

                {/* ─── Desktop: table (≥ md) ─── */}
                <div className="hidden md:block overflow-hidden rounded-xl border border-gray-100 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-212.5 table-fixed text-left text-sm">
                            <thead>
                                <tr className="border-b text-xs border-gray-100 bg-[#eff3fb] font-semibold uppercase tracking-wide text-slate-800">
                                    <th className="w-55 px-4 py-4 lg:px-5">User</th>
                                    <th className="w-22.5 px-4 py-4 lg:px-5">Role</th>
                                    <th className="w-25 px-4 py-4 lg:px-5">District</th>
                                    <th className="w-30 px-4 py-4 lg:px-5">Contact</th>
                                    <th className="w-20 px-4 py-4 lg:px-5">
                                        <span className="flex items-center gap-1">
                                            <ClipboardList size={11} /> Tasks
                                        </span>
                                    </th>
                                    <th className="w-25 px-4 py-4 lg:px-5">Last Active</th>
                                    <th className="w-20 px-4 py-4 lg:px-5">Status</th>
                                    <th className="w-25 px-4 py-4 lg:px-5">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-4 py-12 text-center text-sm text-slate-400"
                                        >
                                            <div className="flex flex-col items-center">
                                                <Users size={36} className="mb-2 opacity-40" />
                                                <p className="font-medium">No users found</p>
                                                <p className="text-xs mt-1">
                                                    Try adjusting your search or filters
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((u) => (
                                        <tr
                                            key={u.id}
                                            className="border-b text-xs border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                                        >
                                            {/* User */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5">
                                                <div className="flex items-center gap-2.5">
                                                    <Avatar
                                                        initials={u.avatar}
                                                        role={u.role}
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-slate-800 truncate">
                                                            {u.name}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                                                            {u.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* Role */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5">
                                                <RoleBadge role={u.role} />
                                            </td>
                                            {/* District */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5 text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <MapPin
                                                        size={10}
                                                        className="text-slate-400 shrink-0"
                                                    />
                                                    {u.district}
                                                </span>
                                            </td>
                                            {/* Contact */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5 text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Phone size={9} className="text-slate-400" />
                                                    {u.phone}
                                                </div>
                                            </td>
                                            {/* Inspections */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5 font-semibold text-[#2D0D4D]">
                                                {u.role === "Inspector"
                                                    ? u.inspections
                                                    : "—"}
                                            </td>
                                            {/* Last Active */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5 text-gray-500">
                                                <div className="flex flex-col">
                                                    <span>{u.lastActive}</span>
                                                    <span className="text-[9px] text-slate-400 mt-0.5">
                                                        Joined {u.joinedDate}
                                                    </span>
                                                </div>
                                            </td>
                                            {/* Status */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5">
                                                <StatusBadge status={u.status} />
                                            </td>
                                            {/* Actions */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                                                        title="Edit user"
                                                    >
                                                        <Pencil size={13} />
                                                    </button>
                                                    <button
                                                        className="p-1.5 rounded-md text-slate-400 hover:text-[#2D0D4D] hover:bg-purple-50 transition"
                                                        title="View details"
                                                    >
                                                        <Eye size={13} />
                                                    </button>
                                                    <button
                                                        className="p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition"
                                                        title="Delete user"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
