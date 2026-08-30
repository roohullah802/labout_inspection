import { useState } from "react";
import {
    Home,
    FileText,
    Download,
    TrendingUp,
    TrendingDown,
    Building2,
    AlertTriangle,
    CheckCircle2,
    Clock,
    Users,
    MapPin,
    Filter,
    Printer,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import Path from "../../components/Path";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

/* ─── Types ─── */
type TimePeriod = "This Month" | "This Quarter" | "This Year" | "All Time";

/* ─── Mock Data ─── */
const monthlyInspections = [
    { month: "Jan", inspections: 18, violations: 8, resolved: 5 },
    { month: "Feb", inspections: 24, violations: 12, resolved: 9 },
    { month: "Mar", inspections: 20, violations: 6, resolved: 6 },
    { month: "Apr", inspections: 32, violations: 14, resolved: 10 },
    { month: "May", inspections: 28, violations: 10, resolved: 8 },
    { month: "Jun", inspections: 35, violations: 15, resolved: 12 },
    { month: "Jul", inspections: 22, violations: 9, resolved: 7 },
    { month: "Aug", inspections: 40, violations: 18, resolved: 14 },
    { month: "Sep", inspections: 30, violations: 11, resolved: 9 },
    { month: "Oct", inspections: 26, violations: 13, resolved: 11 },
    { month: "Nov", inspections: 38, violations: 16, resolved: 13 },
    { month: "Dec", inspections: 34, violations: 12, resolved: 10 },
];

const districtData = [
    { district: "Peshawar", inspections: 85, violations: 32, companies: 45 },
    { district: "Mardan", inspections: 42, violations: 14, companies: 22 },
    { district: "Nowshera", inspections: 38, violations: 18, companies: 19 },
    { district: "Abbottabad", inspections: 30, violations: 8, companies: 15 },
    { district: "Swat", inspections: 28, violations: 15, companies: 12 },
    { district: "Buner", inspections: 18, violations: 10, companies: 8 },
];

const recentReports = [
    {
        id: "RPT-2024-0045",
        title: "Monthly Inspection Summary — October 2024",
        type: "Monthly",
        generatedBy: "System",
        date: "01.11.2024",
        status: "Ready" as const,
    },
    {
        id: "RPT-2024-0042",
        title: "District-wise Violation Analysis — Q3 2024",
        type: "Quarterly",
        generatedBy: "Admin",
        date: "05.10.2024",
        status: "Ready" as const,
    },
    {
        id: "RPT-2024-0040",
        title: "Company Compliance Report — Peshawar",
        type: "Custom",
        generatedBy: "Kashif Khan",
        date: "28.09.2024",
        status: "Ready" as const,
    },
    {
        id: "RPT-2024-0038",
        title: "Challan Collection Summary — September 2024",
        type: "Monthly",
        generatedBy: "System",
        date: "01.10.2024",
        status: "Processing" as const,
    },
    {
        id: "RPT-2024-0035",
        title: "Annual Inspection Performance Report — 2024",
        type: "Annual",
        generatedBy: "Admin",
        date: "15.09.2024",
        status: "Ready" as const,
    },
];

const topInspectors = [
    { name: "Kashif Khan", inspections: 48, violations: 22, resolved: 18 },
    { name: "Adnan Shah", inspections: 42, violations: 18, resolved: 15 },
    { name: "Imran Ali", inspections: 38, violations: 15, resolved: 14 },
    { name: "Saeed Ahmad", inspections: 35, violations: 12, resolved: 10 },
    { name: "Farhan Gul", inspections: 30, violations: 10, resolved: 8 },
];

/* ─── Summary Stat Card ─── */
function SummaryCard({
    icon,
    iconBg,
    iconColor,
    value,
    label,
    trend,
    trendValue,
}: {
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    value: number | string;
    label: string;
    trend?: "up" | "down";
    trendValue?: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm">
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
            >
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-slate-800 leading-tight">{value}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{label}</p>
            </div>
            {trend && trendValue && (
                <div
                    className={`flex items-center gap-0.5 text-[10px] font-semibold shrink-0 rounded-full px-2 py-0.5 ${trend === "up"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-500"
                        }`}
                >
                    {trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {trendValue}
                </div>
            )}
        </div>
    );
}

/* ─── Report Type Badge ─── */
function TypeBadge({ type }: { type: string }) {
    const styles: Record<string, string> = {
        Monthly: "bg-blue-50 text-blue-600",
        Quarterly: "bg-violet-50 text-violet-600",
        Annual: "bg-amber-50 text-amber-600",
        Custom: "bg-slate-100 text-slate-600",
    };
    return (
        <span
            className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-semibold ${styles[type] || styles.Custom
                }`}
        >
            {type}
        </span>
    );
}

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: "Ready" | "Processing" }) {
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold ${status === "Ready"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-amber-50 text-amber-500"
                }`}
        >
            {status === "Ready" ? <CheckCircle2 size={10} /> : <Clock size={10} />}
            {status}
        </span>
    );
}


/* ─── Main Page ─── */
export default function ReportPage() {
    const location = useLocation();
    const [period, setPeriod] = useState<TimePeriod>("This Year");

    return (
        <div className="flex h-full flex-1 flex-col bg-linear-to-b from-(--linear-top) to-(--linear-bottom)">
            <main className="flex-1 overflow-auto px-3 py-3 sm:px-5 sm:py-4">
                {/* Breadcrumb + actions */}
                <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-1 text-[12px] bg-white p-2 border rounded-[5px] border-zinc-200 text-slate-500">
                        <Home size={12} />
                        <Path location={location} />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Filter
                                size={13}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value as TimePeriod)}
                                className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-8 text-[12px] font-medium text-slate-600 outline-none focus:ring-2 focus:ring-[#14B8A6]/40 transition cursor-pointer"
                            >
                                <option>This Month</option>
                                <option>This Quarter</option>
                                <option>This Year</option>
                                <option>All Time</option>
                            </select>
                        </div>
                        <button className="flex items-center gap-1.5 rounded-lg bg-[#14B8A6] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#0f9d8d]">
                            <Download size={13} /> Export
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-600 transition-colors hover:bg-gray-50">
                            <Printer size={13} /> Print
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                    <SummaryCard
                        icon={<FileText size={18} />}
                        iconBg="bg-blue-100"
                        iconColor="text-blue-600"
                        value={327}
                        label="Total Inspections"
                    />
                    <SummaryCard
                        icon={<AlertTriangle size={18} />}
                        iconBg="bg-rose-100"
                        iconColor="text-rose-500"
                        value={144}
                        label="Violations Found"
                    />
                    <SummaryCard
                        icon={<CheckCircle2 size={18} />}
                        iconBg="bg-emerald-100"
                        iconColor="text-emerald-600"
                        value={114}
                        label="Cases Resolved"
                    />
                    <SummaryCard
                        icon={<Building2 size={18} />}
                        iconBg="bg-violet-100"
                        iconColor="text-violet-600"
                        value={121}
                        label="Companies Inspected"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-5">
                    {/* Monthly Inspections Bar Chart */}
                    <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-slate-800">
                                    Monthly Inspections & Violations
                                </h3>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                    Overview of inspection activity throughout the year
                                </p>
                            </div>
                        </div>
                        <div className="h-65 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyInspections} barGap={2} barCategoryGap="15%">
                                    <CartesianGrid vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                                        width={28}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "rgba(0,0,0,0.03)" }}
                                        contentStyle={{
                                            fontSize: 11,
                                            borderRadius: 8,
                                            border: "1px solid #e2e8f0",
                                        }}
                                    />
                                    <Bar
                                        dataKey="inspections"
                                        name="Inspections"
                                        fill="#818cf8"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="violations"
                                        name="Violations"
                                        fill="#f43f5e"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="resolved"
                                        name="Resolved"
                                        fill="#10b981"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center justify-center gap-5 pt-3 border-t border-gray-50 text-[10px] text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8]" />
                                Inspections
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
                                Violations
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                                Resolved
                            </span>
                        </div>
                    </div>

                    {/* District Performance */}
                    <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                                    <MapPin size={14} className="text-[#2D0D4D]" />
                                    District Performance
                                </h3>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                    Inspections & violations by district
                                </p>
                            </div>
                        </div>
                        <div className="h-55 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={districtData}
                                    layout="vertical"
                                    barGap={2}
                                    barCategoryGap="20%"
                                >
                                    <CartesianGrid horizontal={false} stroke="#f1f5f9" />
                                    <XAxis
                                        type="number"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                                    />
                                    <YAxis
                                        type="category"
                                        dataKey="district"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontSize: 10, fill: "#64748b" }}
                                        width={65}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            fontSize: 11,
                                            borderRadius: 8,
                                            border: "1px solid #e2e8f0",
                                        }}
                                    />
                                    <Bar
                                        dataKey="inspections"
                                        name="Inspections"
                                        fill="#818cf8"
                                        radius={[0, 4, 4, 0]}
                                    />
                                    <Bar
                                        dataKey="violations"
                                        name="Violations"
                                        fill="#f43f5e"
                                        radius={[0, 4, 4, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center justify-center gap-5 pt-3 border-t border-gray-50 text-[10px] text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8]" />
                                Inspections
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
                                Violations
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Recent Reports + Top Inspectors */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-5">
                    {/* Recent Reports Table */}
                    <div className="lg:col-span-2 rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                                <FileText size={14} className="text-[#2D0D4D]" />
                                Recent Reports
                            </h3>
                            <button className="text-[11px] font-medium text-[#14B8A6] hover:underline">
                                View All
                            </button>
                        </div>

                        {/* Mobile cards */}
                        <div className="space-y-3 md:hidden">
                            {recentReports.map((r) => (
                                <div
                                    key={r.id}
                                    className="rounded-lg border border-gray-100 p-3 space-y-2"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="text-[10px] text-slate-400 font-medium">
                                                {r.id}
                                            </p>
                                            <p className="text-xs font-semibold text-slate-800 mt-0.5 leading-tight truncate">
                                                {r.title}
                                            </p>
                                        </div>
                                        <StatusBadge status={r.status} />
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <TypeBadge type={r.type} />
                                            <span>{r.date}</span>
                                        </div>
                                        {r.status === "Ready" && (
                                            <button className="text-[#2D0D4D] hover:text-[#3d1568] transition-colors">
                                                <Download size={13} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-gray-100 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                        <th className="pb-3 pr-4">Report ID</th>
                                        <th className="pb-3 pr-4">Title</th>
                                        <th className="pb-3 pr-4">Type</th>
                                        <th className="pb-3 pr-4">Date</th>
                                        <th className="pb-3 pr-4">Status</th>
                                        <th className="pb-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentReports.map((r) => (
                                        <tr
                                            key={r.id}
                                            className="border-b border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                                        >
                                            <td className="py-3 pr-4 font-semibold text-[#2D0D4D]">
                                                {r.id}
                                            </td>
                                            <td className="py-3 pr-4 text-slate-700 max-w-62.5 truncate">
                                                {r.title}
                                            </td>
                                            <td className="py-3 pr-4">
                                                <TypeBadge type={r.type} />
                                            </td>
                                            <td className="py-3 pr-4 text-slate-500">{r.date}</td>
                                            <td className="py-3 pr-4">
                                                <StatusBadge status={r.status} />
                                            </td>
                                            <td className="py-3">
                                                {r.status === "Ready" && (
                                                    <button
                                                        className="p-1.5 rounded-md text-slate-400 hover:text-[#2D0D4D] hover:bg-slate-100 transition"
                                                        title="Download"
                                                    >
                                                        <Download size={14} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Top Inspectors */}
                    <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-4">
                            <Users size={14} className="text-[#2D0D4D]" />
                            Top Inspectors
                        </h3>
                        <div className="space-y-3">
                            {topInspectors.map((inspector, i) => (
                                <div
                                    key={inspector.name}
                                    className="flex items-center gap-3 rounded-lg border border-gray-50 p-3 hover:bg-slate-50/50 transition-colors"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2D0D4D] text-[10px] font-bold text-white">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-slate-700 truncate">
                                            {inspector.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                                            <span>{inspector.inspections} inspections</span>
                                            <span>·</span>
                                            <span className="text-rose-400">
                                                {inspector.violations} violations
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-xs font-bold text-emerald-600">
                                            {Math.round(
                                                (inspector.resolved / inspector.violations) * 100
                                            )}
                                            %
                                        </p>
                                        <p className="text-[9px] text-slate-400">resolved</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
