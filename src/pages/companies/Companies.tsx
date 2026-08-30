import { useState } from "react";
import {
    Home,
    Search,
    Building2,
    AlertTriangle,
    CheckCircle2,
    Clock,
    ChevronRight,
    Filter,
    MapPin,
    Phone,
    Users,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Path from "../../components/Path";

/* ─── Types ─── */
type CompanyStatus = "Active" | "Suspended" | "Under Review";

interface ViolationSummary {
    total: number;
    active: number;
    resolved: number;
    pending: number;
}

interface Company {
    id: string;
    registrationNo: string;
    name: string;
    category: string;
    owner: string;
    contact: string;
    district: string;
    address: string;
    registeredDate: string;
    employees: number;
    status: CompanyStatus;
    violations: ViolationSummary;
}

/* ─── Mock Data ─── */
const companies: Company[] = [
    {
        id: "1",
        registrationNo: "LBR-2024-0012",
        name: "Jan Petrol Pump",
        category: "Petrol Pump",
        owner: "Jan Wali Khan",
        contact: "0345-1234566",
        district: "Peshawar",
        address: "Hayatabad, Phase 1, Sector 2B",
        registeredDate: "15.03.2023",
        employees: 24,
        status: "Active",
        violations: { total: 5, active: 2, resolved: 2, pending: 1 },
    },
    {
        id: "2",
        registrationNo: "LBR-2024-0034",
        name: "Al-Noor Textiles",
        category: "Textile Mill",
        owner: "Muhammad Akbar",
        contact: "0321-9876543",
        district: "Mardan",
        address: "Industrial Estate, Zone 3",
        registeredDate: "22.06.2023",
        employees: 156,
        status: "Active",
        violations: { total: 3, active: 0, resolved: 3, pending: 0 },
    },
    {
        id: "3",
        registrationNo: "LBR-2024-0056",
        name: "Frontier Steel Works",
        category: "Steel Factory",
        owner: "Syed Imran Shah",
        contact: "0333-4455667",
        district: "Nowshera",
        address: "GT Road, Industrial Area",
        registeredDate: "08.01.2024",
        employees: 89,
        status: "Suspended",
        violations: { total: 8, active: 4, resolved: 2, pending: 2 },
    },
    {
        id: "4",
        registrationNo: "LBR-2024-0078",
        name: "Green Valley Foods",
        category: "Food Processing",
        owner: "Zahid Hussain",
        contact: "0300-1122334",
        district: "Abbottabad",
        address: "Supply Road, Near Cantt",
        registeredDate: "11.09.2023",
        employees: 45,
        status: "Active",
        violations: { total: 1, active: 0, resolved: 1, pending: 0 },
    },
    {
        id: "5",
        registrationNo: "LBR-2024-0091",
        name: "Khan Marble Industries",
        category: "Marble Factory",
        owner: "Amir Khan",
        contact: "0312-7788990",
        district: "Buner",
        address: "Main Daggar Road",
        registeredDate: "03.04.2024",
        employees: 67,
        status: "Under Review",
        violations: { total: 6, active: 1, resolved: 3, pending: 2 },
    },
    {
        id: "6",
        registrationNo: "LBR-2024-0103",
        name: "Pak Pharma Labs",
        category: "Pharmaceutical",
        owner: "Dr. Farhan Ali",
        contact: "0345-5566778",
        district: "Peshawar",
        address: "University Road, Phase 5",
        registeredDate: "19.11.2023",
        employees: 112,
        status: "Active",
        violations: { total: 2, active: 1, resolved: 0, pending: 1 },
    },
    {
        id: "7",
        registrationNo: "LBR-2024-0117",
        name: "Swat Timber House",
        category: "Timber & Wood",
        owner: "Bakht Zaman",
        contact: "0346-3344556",
        district: "Swat",
        address: "Mingora Bypass Road",
        registeredDate: "27.02.2024",
        employees: 32,
        status: "Suspended",
        violations: { total: 10, active: 5, resolved: 3, pending: 2 },
    },
    {
        id: "8",
        registrationNo: "LBR-2024-0129",
        name: "Peshawar Auto Parts",
        category: "Automobile",
        owner: "Noor Muhammad",
        contact: "0301-9988776",
        district: "Peshawar",
        address: "Kohat Road, Faqirabad",
        registeredDate: "14.07.2023",
        employees: 18,
        status: "Active",
        violations: { total: 0, active: 0, resolved: 0, pending: 0 },
    },
];

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: CompanyStatus }) {
    const styles: Record<CompanyStatus, string> = {
        Active: "bg-emerald-50 text-emerald-600",
        Suspended: "bg-rose-50 text-rose-500",
        "Under Review": "bg-amber-50 text-amber-500",
    };

    return (
        <span
            className={`inline-block rounded-md px-3 py-1 text-[10px] font-semibold whitespace-nowrap ${styles[status]}`}
        >
            {status}
        </span>
    );
}

/* ─── Violation Mini Bar ─── */
function ViolationBar({ violations }: { violations: ViolationSummary }) {
    const total = violations.total || 1;
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-500">
                    <AlertTriangle size={13} /> {violations.active}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    <CheckCircle2 size={13} /> {violations.resolved}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-500">
                    <Clock size={13} /> {violations.pending}
                </span>
            </div>
            {violations.total > 0 && (
                <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                        className="bg-rose-400 transition-all"
                        style={{ width: `${(violations.active / total) * 100}%` }}
                    />
                    <div
                        className="bg-emerald-400 transition-all"
                        style={{ width: `${(violations.resolved / total) * 100}%` }}
                    />
                    <div
                        className="bg-amber-300 transition-all"
                        style={{ width: `${(violations.pending / total) * 100}%` }}
                    />
                </div>
            )}
        </div>
    );
}

/* ─── Mobile Company Card ─── */
function CompanyCard({ company }: { company: Company }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2D0D4D]/10">
                        <Building2 size={16} className="text-[#2D0D4D]" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#2D0D4D] leading-tight">
                            {company.name}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                            {company.registrationNo}
                        </p>
                    </div>
                </div>
                <StatusBadge status={company.status} />
            </div>

            <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                    <span className="text-gray-400">Category</span>
                    <span className="font-medium text-gray-700">{company.category}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Owner</span>
                    <span className="font-medium text-gray-700">{company.owner}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">District</span>
                    <span className="font-medium text-gray-700">{company.district}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Employees</span>
                    <span className="font-medium text-gray-700">{company.employees}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Registered</span>
                    <span className="font-medium text-gray-700">{company.registeredDate}</span>
                </div>
            </div>

            {/* Violation summary */}
            <div className="pt-1 border-t border-gray-50">
                <p className="text-[10px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                    Violations ({company.violations.total})
                </p>
                <ViolationBar violations={company.violations} />
            </div>

            <Link
                to={`/admin/companies/${company.id}`}
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[#2D0D4D] px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#3d1568]"
            >
                View Details <ChevronRight size={12} />
            </Link>
        </div>
    );
}

/* ─── Summary Cards ─── */
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
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
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

/* ─── Main Page ─── */
export default function CompaniesPage() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | CompanyStatus>("All");

    const filtered = companies.filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.registrationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.district.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === "All" || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    // Aggregate stats
    const totalCompanies = companies.length;
    const totalViolations = companies.reduce((s, c) => s + c.violations.total, 0);
    const activeViolations = companies.reduce((s, c) => s + c.violations.active, 0);
    const resolvedViolations = companies.reduce((s, c) => s + c.violations.resolved, 0);

    return (
        <div className="flex h-full flex-1 flex-col bg-linear-to-b from-(--linear-top) to-(--linear-bottom)">
            <main className="flex-1 overflow-auto px-3 py-3 sm:px-5 sm:py-4">
                {/* Breadcrumb + action */}
                <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-1 text-[12px] bg-white p-2 border rounded-[5px] border-zinc-200 text-slate-500">
                        <Home size={12} />
                        <Path location={location} />
                    </div>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#14B8A6] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#0f9d8d] sm:w-auto">
                        <span className="text-lg leading-none">+</span> Register Company
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    <SummaryCard
                        icon={<Building2 size={18} />}
                        iconBg="bg-blue-100"
                        iconColor="text-blue-600"
                        value={totalCompanies}
                        label="Total Companies"
                    />
                    <SummaryCard
                        icon={<AlertTriangle size={18} />}
                        iconBg="bg-rose-100"
                        iconColor="text-rose-500"
                        value={activeViolations}
                        label="Active Violations"
                    />
                    <SummaryCard
                        icon={<CheckCircle2 size={18} />}
                        iconBg="bg-emerald-100"
                        iconColor="text-emerald-600"
                        value={resolvedViolations}
                        label="Resolved Cases"
                    />
                    <SummaryCard
                        icon={<AlertTriangle size={18} />}
                        iconBg="bg-amber-100"
                        iconColor="text-amber-500"
                        value={totalViolations}
                        label="Total Violations"
                    />
                </div>

                {/* Search + Filter */}
                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                    <div className="relative flex-1">
                        <Search
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="Search by name, registration no, owner or district..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#14B8A6]/40 transition"
                        />
                    </div>
                    <div className="relative">
                        <Filter
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value as "All" | CompanyStatus)
                            }
                            className="appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-8 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-[#14B8A6]/40 transition cursor-pointer"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                            <option value="Under Review">Under Review</option>
                        </select>
                    </div>
                </div>

                {/* ─── Mobile: card list (< md) ─── */}
                <div className="space-y-3 md:hidden">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                            <Building2 size={40} className="mb-3 opacity-40" />
                            <p className="text-sm font-medium">No companies found</p>
                            <p className="text-xs mt-1">Try adjusting your search or filter</p>
                        </div>
                    ) : (
                        filtered.map((c) => <CompanyCard key={c.id} company={c} />)
                    )}
                </div>

                {/* ─── Desktop: table (≥ md) ─── */}
                <div className="hidden md:block overflow-hidden rounded-xl border border-gray-100 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-225 table-fixed text-left text-sm">
                            <thead>
                                <tr className="border-b text-xs border-gray-100 bg-[#eff3fb] font-semibold uppercase tracking-wide text-slate-800">
                                    <th className="w-50 px-4 py-4 lg:px-5">Company</th>
                                    <th className="w-25 px-4 py-4 lg:px-5">Category</th>
                                    <th className="w-30 px-4 py-4 lg:px-5">Owner</th>
                                    <th className="w-22.5 px-4 py-4 lg:px-5">District</th>
                                    <th className="w-17.5 px-4 py-4 lg:px-5">
                                        <span className="flex items-center gap-1">
                                            <Users size={11} /> Staff
                                        </span>
                                    </th>
                                    <th className="w-50 px-4 py-4 lg:px-5">
                                        Violation Cases
                                    </th>
                                    <th className="w-22.5 px-4 py-4 lg:px-5">Status</th>
                                    <th className="w-22.5 px-4 py-4 lg:px-5">Action</th>
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
                                                <Building2
                                                    size={36}
                                                    className="mb-2 opacity-40"
                                                />
                                                <p className="font-medium">No companies found</p>
                                                <p className="text-xs mt-1">
                                                    Try adjusting your search or filter
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((c) => (
                                        <tr
                                            key={c.id}
                                            className="border-b text-xs border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                                        >
                                            {/* Company */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2D0D4D]/10">
                                                        <Building2
                                                            size={14}
                                                            className="text-[#2D0D4D]"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-[#2D0D4D] truncate">
                                                            {c.name}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 mt-0.5">
                                                            {c.registrationNo}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* Category */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5 text-gray-600">
                                                {c.category}
                                            </td>
                                            {/* Owner */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5">
                                                <p className="font-medium text-gray-700">
                                                    {c.owner}
                                                </p>
                                                <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-0.5">
                                                    <Phone size={8} /> {c.contact}
                                                </p>
                                            </td>
                                            {/* District */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5 text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <MapPin
                                                        size={10}
                                                        className="text-slate-400 shrink-0"
                                                    />
                                                    {c.district}
                                                </span>
                                            </td>
                                            {/* Employees */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5 text-gray-600 font-medium">
                                                {c.employees}
                                            </td>
                                            {/* Violations */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5">
                                                {c.violations.total === 0 ? (
                                                    <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                                                        <CheckCircle2 size={10} /> No violations
                                                    </span>
                                                ) : (
                                                    <ViolationBar violations={c.violations} />
                                                )}
                                            </td>
                                            {/* Status */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5">
                                                <StatusBadge status={c.status} />
                                            </td>
                                            {/* Action */}
                                            <td className="px-4 py-4 lg:px-5 lg:py-5">
                                                <Link
                                                    to={`/admin/companies/${c.id}`}
                                                    className="inline-flex items-center gap-1 rounded-md bg-[#2D0D4D] px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#3d1568]"
                                                >
                                                    Details
                                                    <ChevronRight size={11} />
                                                </Link>
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
