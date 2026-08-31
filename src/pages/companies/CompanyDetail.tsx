import { useState } from "react";
import {
    Home,
    Building2,
    AlertTriangle,
    CheckCircle2,
    Clock,
    ChevronRight,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Users,
    FileText,
    ExternalLink,
    ArrowLeft,
    Shield,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Path from "../../components/Path";

/* ─── Types ─── */
type CaseStatus = "Active" | "Resolved" | "Pending";

interface ViolationCase {
    id: string;
    caseId: string;
    title: string;
    section: string;
    inspectedBy: string;
    dateReported: string;
    dateResolved?: string;
    status: CaseStatus;
    actionTaken: string;
    fineAmount?: string;
}

interface CompanyDetail {
    id: string;
    registrationNo: string;
    name: string;
    category: string;
    owner: string;
    contact: string;
    email: string;
    cnic: string;
    district: string;
    address: string;
    registeredDate: string;
    licenseExpiry: string;
    employees: number;
    status: "Active" | "Suspended" | "Under Review";
    description: string;
    violationCases: ViolationCase[];
}

/* ─── Mock Data ─── */
const companyData: CompanyDetail = {
    id: "1",
    registrationNo: "LBR-2024-0012",
    name: "Jan Petrol Pump",
    category: "Petrol Pump",
    owner: "Jan Wali Khan",
    contact: "0345-1234566",
    email: "info@janpetrol.pk",
    cnic: "17301-5678901-1",
    district: "Peshawar",
    address: "Hayatabad, Phase 1, Sector 2B, Peshawar, KPK",
    registeredDate: "15.03.2023",
    licenseExpiry: "15.03.2026",
    employees: 24,
    status: "Active",
    description:
        "Jan Petrol Pump is a registered fuel distribution business operating in the Hayatabad area of Peshawar. The company has been registered with the Labour Department since March 2023.",
    violationCases: [
        {
            id: "1",
            caseId: "VIO-2024-0045",
            title: "Unauthorized fuel price increase",
            section: "Under Act 001, Section 12",
            inspectedBy: "Kashif Khan",
            dateReported: "12.09.2024",
            status: "Active",
            actionTaken: "Notice Issued",
            fineAmount: "PKR 50,000",
        },
        {
            id: "2",
            caseId: "VIO-2024-0032",
            title: "Safety equipment not maintained",
            section: "Under Act 003, Section 7",
            inspectedBy: "Adnan Shah",
            dateReported: "05.07.2024",
            status: "Active",
            actionTaken: "Warning",
        },
        {
            id: "3",
            caseId: "VIO-2024-0021",
            title: "Employee working without safety gear",
            section: "Under Act 002, Section 15",
            inspectedBy: "Kashif Khan",
            dateReported: "22.04.2024",
            dateResolved: "10.05.2024",
            status: "Resolved",
            actionTaken: "Fine Paid",
            fineAmount: "PKR 25,000",
        },
        {
            id: "4",
            caseId: "VIO-2024-0018",
            title: "Improper waste disposal near pump area",
            section: "Under Act 005, Section 3",
            inspectedBy: "Imran Ali",
            dateReported: "15.03.2024",
            dateResolved: "28.03.2024",
            status: "Resolved",
            actionTaken: "Corrective Action Taken",
        },
        {
            id: "5",
            caseId: "VIO-2024-0055",
            title: "Pending fire safety inspection renewal",
            section: "Under Act 004, Section 9",
            inspectedBy: "Saeed Ahmad",
            dateReported: "20.10.2024",
            status: "Pending",
            actionTaken: "Under Review",
            fineAmount: "PKR 15,000",
        },
    ],
};

/* ─── Case Status Badge ─── */
function CaseStatusBadge({ status }: { status: CaseStatus }) {
    const config: Record<CaseStatus, { bg: string; text: string; icon: React.ReactNode }> = {
        Active: {
            bg: "bg-rose-50",
            text: "text-rose-500",
            icon: <AlertTriangle size={10} />,
        },
        Resolved: {
            bg: "bg-emerald-50",
            text: "text-emerald-600",
            icon: <CheckCircle2 size={10} />,
        },
        Pending: {
            bg: "bg-amber-50",
            text: "text-amber-500",
            icon: <Clock size={10} />,
        },
    };
    const s = config[status];

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold ${s.bg} ${s.text}`}
        >
            {s.icon} {status}
        </span>
    );
}

/* ─── Info Row ─── */
function InfoRow({
    label,
    value,
    valueColor,
    icon,
}: {
    label: string;
    value: string;
    valueColor?: string;
    icon?: React.ReactNode;
}) {
    return (
        <div>
            <p className="text-[11px] text-slate-400 mb-0.5">{label}</p>
            <p className={`text-sm font-semibold flex items-center gap-1.5 ${valueColor || "text-slate-800"}`}>
                {icon}
                {value}
            </p>
        </div>
    );
}

/* ─── Violation Case Card (Mobile) ─── */
function CaseCard({ violation }: { violation: ViolationCase }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-2.5 shadow-sm">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-[10px] text-slate-400 font-medium">{violation.caseId}</p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5 leading-tight">
                        {violation.title}
                    </p>
                </div>
                <CaseStatusBadge status={violation.status} />
            </div>

            <div className="space-y-1 text-[11px] text-gray-600">
                <div className="flex justify-between">
                    <span className="text-gray-400">Section</span>
                    <span className="font-medium text-gray-700">{violation.section}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Inspector</span>
                    <span className="font-medium text-gray-700">{violation.inspectedBy}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Date Reported</span>
                    <span className="font-medium text-gray-700">{violation.dateReported}</span>
                </div>
                {violation.dateResolved && (
                    <div className="flex justify-between">
                        <span className="text-gray-400">Date Resolved</span>
                        <span className="font-medium text-emerald-600">
                            {violation.dateResolved}
                        </span>
                    </div>
                )}
                <div className="flex justify-between">
                    <span className="text-gray-400">Action</span>
                    <span className="font-medium text-gray-700">{violation.actionTaken}</span>
                </div>
                {violation.fineAmount && (
                    <div className="flex justify-between">
                        <span className="text-gray-400">Fine</span>
                        <span className="font-semibold text-rose-500">{violation.fineAmount}</span>
                    </div>
                )}
            </div>

            <Link
                to={`/admin/case/${violation.caseId}`}
                className="flex w-full items-center justify-center gap-1 rounded-md bg-[#2D0D4D] px-3 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-[#3d1568]"
            >
                View Case <ChevronRight size={10} />
            </Link>
        </div>
    );
}

/* ─── Main Page Component ─── */
export default function CompanyDetail() {
    const location = useLocation();
    // const { companyId } = useParams();
    const [caseFilter, setCaseFilter] = useState<"All" | CaseStatus>("All");

    // In real app, fetch by companyId
    const company = companyData;

    const filteredCases =
        caseFilter === "All"
            ? company.violationCases
            : company.violationCases.filter((c) => c.status === caseFilter);

    const activeCases = company.violationCases.filter((c) => c.status === "Active").length;
    const resolvedCases = company.violationCases.filter((c) => c.status === "Resolved").length;
    const pendingCases = company.violationCases.filter((c) => c.status === "Pending").length;

    return (
        <div className="flex h-full flex-col bg-linear-to-b from-(--linear-top) to-(--linear-bottom) overflow-hidden">
            {/* Breadcrumb + action */}
            <div className="flex shrink-0 flex-col gap-3 px-3 pt-3 sm:px-5 sm:pt-4 md:flex-row md:items-center md:justify-between">
                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-1 rounded-[5px] border border-zinc-200 bg-white p-2 text-[12px] text-slate-500"
                >
                    <Home size={11} className="shrink-0" />
                    <Path location={location} />
                </nav>

                <div className="flex items-center gap-2">
                    <Link
                        to="/admin/companies"
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-600 transition-colors hover:bg-gray-50"
                    >
                        <ArrowLeft size={13} /> Back
                    </Link>
                    <Link 
                        to="/admin/challans/create"
                        className="flex items-center justify-center gap-2 rounded-lg bg-[#14B8A6] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#0d9488]"
                    >
                        <span className="text-lg leading-none">+</span> Create Challan
                    </Link>
                </div>
            </div>

            {/* Page body */}
            <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5 space-y-5">
                {/* Company Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#2D0D4D]/10">
                        <Building2 size={28} className="text-[#2D0D4D]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5 mb-1">
                            <h1 className="text-lg sm:text-xl font-bold text-[#2D0D4D]">
                                {company.name}
                            </h1>
                            <span
                                className={`inline-block rounded-md px-3 py-1 text-[10px] font-semibold ${company.status === "Active"
                                        ? "bg-emerald-50 text-emerald-600"
                                        : company.status === "Suspended"
                                            ? "bg-rose-50 text-rose-500"
                                            : "bg-amber-50 text-amber-500"
                                    }`}
                            >
                                {company.status}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5">
                            <Shield size={11} /> Reg. No: {company.registrationNo}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                            <Calendar size={11} /> Since {company.registeredDate}
                        </span>
                        <span className="flex items-center gap-1">
                            <Users size={11} /> {company.employees} employees
                        </span>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                    {/* Business Information */}
                    <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
                            <Building2 size={14} className="text-[#2D0D4D]" /> Business
                            Information
                        </h2>
                        <div className="space-y-4">
                            <InfoRow label="Business Name" value={company.name} />
                            <InfoRow label="Category" value={company.category} />
                            <InfoRow label="Owner / Manager" value={company.owner} />
                            <InfoRow label="CNIC" value={company.cnic} />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
                            <Phone size={14} className="text-[#2D0D4D]" /> Contact Details
                        </h2>
                        <div className="space-y-4">
                            <InfoRow
                                label="Phone"
                                value={company.contact}
                                icon={<Phone size={11} className="text-slate-400" />}
                            />
                            <InfoRow
                                label="Email"
                                value={company.email}
                                icon={<Mail size={11} className="text-slate-400" />}
                            />
                            <InfoRow
                                label="District"
                                value={company.district}
                                icon={<MapPin size={11} className="text-slate-400" />}
                            />
                            <InfoRow label="Full Address" value={company.address} />
                        </div>
                    </div>

                    {/* Registration & Compliance */}
                    <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2">
                            <FileText size={14} className="text-[#2D0D4D]" /> Registration &
                            Compliance
                        </h2>
                        <div className="space-y-4">
                            <InfoRow label="Registration No." value={company.registrationNo} />
                            <InfoRow label="Registered Date" value={company.registeredDate} />
                            <InfoRow label="License Expiry" value={company.licenseExpiry} />
                            <InfoRow
                                label="Total Employees"
                                value={String(company.employees)}
                            />
                        </div>
                    </div>
                </div>

                {/* Violation Cases Section */}
                <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <AlertTriangle size={14} className="text-rose-500" /> Violation Cases
                            <span className="text-xs font-normal text-slate-400 ml-1">
                                ({company.violationCases.length} total)
                            </span>
                        </h2>

                        {/* Case counters + filter */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <button
                                onClick={() => setCaseFilter("All")}
                                className={`rounded-md px-3 py-1.5 text-[10px] font-semibold transition-colors ${caseFilter === "All"
                                        ? "bg-[#2D0D4D] text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                All ({company.violationCases.length})
                            </button>
                            <button
                                onClick={() => setCaseFilter("Active")}
                                className={`rounded-md px-3 py-1.5 text-[10px] font-semibold transition-colors ${caseFilter === "Active"
                                        ? "bg-rose-500 text-white"
                                        : "bg-rose-50 text-rose-500 hover:bg-rose-100"
                                    }`}
                            >
                                Active ({activeCases})
                            </button>
                            <button
                                onClick={() => setCaseFilter("Resolved")}
                                className={`rounded-md px-3 py-1.5 text-[10px] font-semibold transition-colors ${caseFilter === "Resolved"
                                        ? "bg-emerald-500 text-white"
                                        : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                    }`}
                            >
                                Resolved ({resolvedCases})
                            </button>
                            <button
                                onClick={() => setCaseFilter("Pending")}
                                className={`rounded-md px-3 py-1.5 text-[10px] font-semibold transition-colors ${caseFilter === "Pending"
                                        ? "bg-amber-500 text-white"
                                        : "bg-amber-50 text-amber-500 hover:bg-amber-100"
                                    }`}
                            >
                                Pending ({pendingCases})
                            </button>
                        </div>
                    </div>

                    {/* ─── Mobile: case cards (< md) ─── */}
                    <div className="space-y-3 md:hidden">
                        {filteredCases.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                                <CheckCircle2 size={32} className="mb-2 opacity-40" />
                                <p className="text-xs font-medium">No cases found</p>
                            </div>
                        ) : (
                            filteredCases.map((v) => <CaseCard key={v.id} violation={v} />)
                        )}
                    </div>

                    {/* ─── Desktop: table (≥ md) ─── */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full min-w-187.5 table-fixed text-left text-sm">
                            <thead>
                                <tr className="border-b text-[10px] border-gray-100 bg-[#eff3fb]/60 font-semibold uppercase tracking-wide text-slate-700">
                                    <th className="w-30 px-4 py-3">Case ID</th>
                                    <th className="w-50 px-4 py-3">Violation</th>
                                    <th className="w-37.5 px-4 py-3">Section</th>
                                    <th className="w-25 px-4 py-3">Inspector</th>
                                    <th className="w-22.5 px-4 py-3">Date</th>
                                    <th className="w-27.5 px-4 py-3">Action Taken</th>
                                    <th className="w-20 px-4 py-3">Fine</th>
                                    <th className="w-20 px-4 py-3">Status</th>
                                    <th className="w-17.5 px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCases.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-4 py-10 text-center text-xs text-slate-400"
                                        >
                                            <div className="flex flex-col items-center">
                                                <CheckCircle2
                                                    size={28}
                                                    className="mb-2 opacity-40"
                                                />
                                                <p className="font-medium">No cases found</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCases.map((v) => (
                                        <tr
                                            key={v.id}
                                            className="border-b text-xs border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                                        >
                                            <td className="px-4 py-3.5 font-semibold text-[#2D0D4D]">
                                                {v.caseId}
                                            </td>
                                            <td className="px-4 py-3.5 text-gray-700">
                                                <div className="truncate">{v.title}</div>
                                            </td>
                                            <td className="px-4 py-3.5 text-gray-500">
                                                {v.section}
                                            </td>
                                            <td className="px-4 py-3.5 text-gray-600 font-medium">
                                                {v.inspectedBy}
                                            </td>
                                            <td className="px-4 py-3.5 text-gray-500">
                                                <div>{v.dateReported}</div>
                                                {v.dateResolved && (
                                                    <div className="text-[9px] text-emerald-500 mt-0.5">
                                                        ✓ {v.dateResolved}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <span
                                                    className={`text-[10px] font-medium ${v.actionTaken === "Warning"
                                                            ? "text-amber-500"
                                                            : v.actionTaken === "Notice Issued"
                                                                ? "text-rose-500"
                                                                : v.actionTaken === "Fine Paid"
                                                                    ? "text-emerald-500"
                                                                    : "text-slate-600"
                                                        }`}
                                                >
                                                    {v.actionTaken}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3.5 font-semibold text-slate-700">
                                                {v.fineAmount || "—"}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <CaseStatusBadge status={v.status} />
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <Link
                                                    to={`/admin/case/${v.caseId}`}
                                                    className="text-[#2D0D4D] hover:text-[#3d1568] transition-colors"
                                                    title="View case"
                                                >
                                                    <ExternalLink size={13} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
