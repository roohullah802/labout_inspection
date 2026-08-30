import { useState } from "react";
import { Home, Download, Trash2, ChevronRight, ExternalLink } from "lucide-react";
import { useLocation } from "react-router-dom";
import Path from "../../components/Path";
import cnicFront from "../../assets/cnic-front.png";
import cnicBack from "../../assets/cnic-back.png";

/* ─── Mock Data ─── */
interface CaseData {
    caseId: string;
    businessName: string;
    category: string;
    managerName: string;
    contact: string;
    district: string;
    address: string;
    violation: {
        statusOfViolation: string;
        violationSection: string;
        actionTaken: string;
        location: string;
        googleMapLink: string;
    };
    attachments: {
        id: string;
        name: string;
        size: string;
        date: string;
    }[];
}

const caseData: CaseData = {
    caseId: "2665D9",
    businessName: "Jan Petrol Pump",
    category: "Petrol Pump",
    managerName: "Jan Wali Khan",
    contact: "0345 12345666",
    district: "Peshawar",
    address: "Hayatabad, Phase 1, Sector 2B, Peshawar",
    violation: {
        statusOfViolation: "Yes",
        violationSection: "Under Act 001",
        actionTaken: "Warning",
        location: "Lat 3235488 , Long 5458554",
        googleMapLink: "#",
    },
    attachments: [
        { id: "1", name: "File Title.pdf", size: "313 KB", date: "31 Aug, 2022" },
        { id: "2", name: "File Title.pdf", size: "313 KB", date: "31 Aug, 2022" },
        { id: "3", name: "File Title.pdf", size: "313 KB", date: "31 Aug, 2022" },
        { id: "4", name: "File Title.pdf", size: "313 KB", date: "31 Aug, 2022" },
        { id: "5", name: "File Title.pdf", size: "313 KB", date: "31 Aug, 2022" },
    ],
};

/* ─── PDF Icon ─── */
function PdfIcon() {
    return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
            <div className="flex h-7 w-6 flex-col items-center justify-center rounded-[3px] bg-white border border-slate-200 relative">
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 rounded-xs bg-red-500 px-1 text-[5px] font-bold text-white leading-tight">
                    PDF
                </span>
            </div>
        </div>
    );
}

/* ─── Attachment Row ─── */
function AttachmentRow({ attachment }: { attachment: CaseData["attachments"][0] }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-3 sm:px-4">
            <PdfIcon />
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-700 truncate">{attachment.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                    {attachment.size} . {attachment.date}
                </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
                <button
                    className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                    aria-label="Download"
                >
                    <Download size={14} />
                </button>
                <button
                    className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                    aria-label="Delete"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}

/* ─── Info Row Helper ─── */
function InfoRow({
    label,
    value,
    valueColor,
}: {
    label: string;
    value: string;
    valueColor?: string;
}) {
    return (
        <div>
            <p className="text-[11px] text-slate-400 mb-0.5">{label}</p>
            <p className={`text-sm font-semibold ${valueColor || "text-slate-800"}`}>{value}</p>
        </div>
    );
}

/* ─── Main Page Component ─── */
export default function CaseDetail() {
    const location = useLocation();
    const [remarks, setRemarks] = useState("");

    return (
        <div className="flex h-full flex-col bg-linear-to-b from-(--linear-top) to-(--linear-bottom)">
            {/* Breadcrumb + action */}
            <div className="flex shrink-0 flex-col gap-3 px-3 pt-3 sm:px-5 sm:pt-4 md:flex-row md:items-center md:justify-between">
                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-1 rounded-[5px] border border-zinc-200 bg-white p-2 text-[12px] text-slate-500"
                >
                    <Home size={11} className="shrink-0" />
                    <Path location={location} />
                </nav>

                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#14B8A6] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#0d9488] sm:w-auto sm:justify-start">
                    <span className="text-lg leading-none">+</span> Create Challan
                </button>
            </div>

            {/* Page body — fills remaining height */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 sm:gap-5 px-3 py-4 sm:px-5 sm:py-5 overflow-y-auto lg:overflow-hidden">
                {/* ─── Left Column — independent scroll ─── */}
                <div className="flex-1 min-w-0 overflow-y-auto lg:pr-2">
                    {/* ─── Left Column ─── */}
                    {/* Case ID Title */}
                    <h1 className="text-lg sm:text-xl font-bold text-[#2D0D4D] mb-4 sm:mb-5">
                        Case ID: {caseData.caseId}
                    </h1>

                    <div className="space-y-4 sm:space-y-5">
                        {/* Business Information Card */}
                        <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
                            {/* Row 1: Business Name / Category / Manager */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pb-5 border-b border-gray-100">
                                <InfoRow label="Business Name" value={caseData.businessName} />
                                <InfoRow label="Category" value={caseData.category} />
                                <InfoRow label="Manager Name" value={caseData.managerName} />
                            </div>

                            {/* Row 2: Contact / District */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 py-5 border-b border-gray-100">
                                <InfoRow label="Contact" value={caseData.contact} />
                                <InfoRow label="District" value={caseData.district} />
                            </div>

                            {/* Row 3: Address */}
                            <div className="pt-5">
                                <InfoRow label="Address" value={caseData.address} />
                            </div>
                        </div>

                        {/* Violation Details Card */}
                        <div className="rounded-xl border border-gray-100 bg-white p-4 sm:p-6">
                            <h2 className="text-sm font-bold text-slate-800 mb-5">
                                Violation Details
                            </h2>

                            {/* Violation Row 1 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pb-5 border-b border-gray-100">
                                <div>
                                    <p className="text-[11px] text-slate-400 mb-0.5">Status of</p>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Violation
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-slate-400 mb-0.5">Status</p>
                                    <p className="text-sm font-semibold text-emerald-500">
                                        {caseData.violation.statusOfViolation}
                                    </p>
                                </div>
                            </div>

                            {/* Violation Row 2 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 py-5 border-b border-gray-100">
                                <div>
                                    <p className="text-[11px] text-slate-400 mb-0.5">Violation</p>
                                    <p className="text-sm font-semibold text-slate-800">Section</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-slate-400 mb-0.5">Status</p>
                                    <p className="text-sm font-semibold text-emerald-500">
                                        {caseData.violation.violationSection}
                                    </p>
                                </div>
                            </div>

                            {/* Violation Row 3 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 py-5 border-b border-gray-100">
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Action Taken
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-slate-400 mb-0.5">Status</p>
                                    <p className="text-sm font-semibold text-orange-500">
                                        {caseData.violation.actionTaken}
                                    </p>
                                </div>
                            </div>

                            {/* Violation Row 4: Location / Google Map */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-5">
                                <InfoRow label="Location" value={caseData.violation.location} />
                                <div>
                                    <p className="text-[11px] text-slate-400 mb-0.5">Google Map</p>
                                    <a
                                        href={caseData.violation.googleMapLink}
                                        className="text-sm font-semibold text-emerald-500 hover:underline inline-flex items-center gap-1"
                                    >
                                        Link
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Remarks Card */}
                        <div className="rounded-xl border-2 border-orange-200 bg-orange-50/40 p-4 sm:p-6">
                            <h2 className="text-sm font-bold text-slate-800 mb-3">Remarks</h2>
                            <textarea
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder="Enter your remarks here"
                                rows={3}
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#14B8A6] transition resize-none"
                            />
                        </div>
                    </div>

                    {/* ─── Action Buttons — inside left column ─── */}
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 pb-2">
                        <button className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-gray-50">
                            Revert Back
                        </button>
                        <button className="w-full sm:w-auto rounded-lg bg-red-500 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-red-600">
                            Decline
                        </button>
                        <button className="w-full sm:w-auto rounded-lg bg-[#14B8A6] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0d9488] flex items-center justify-center gap-1.5">
                            Forward
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* ─── Right Column — independent scroll ─── */}
                <div className="w-full lg:w-70 xl:w-[320px] shrink-0 overflow-y-auto lg:pl-2">
                    <div className="space-y-4 sm:space-y-5">
                        {/* CNIC Photos */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                                CNIC Photos
                            </h3>
                            <div className="space-y-3">
                                <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                    <img
                                        src={cnicFront}
                                        alt="CNIC Front"
                                        className="w-full h-auto object-cover"
                                    />
                                    <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white">
                                        Front
                                    </span>
                                </div>
                                <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                    <img
                                        src={cnicBack}
                                        alt="CNIC Back"
                                        className="w-full h-auto object-cover"
                                    />
                                    <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white">
                                        Back
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Attachments */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                                Attachments
                            </h3>
                            <div className="space-y-2.5">
                                {caseData.attachments.map((att) => (
                                    <AttachmentRow key={att.id} attachment={att} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
