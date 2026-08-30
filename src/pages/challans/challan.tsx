// src/pages/ChallansPage.tsx
import { Home, Paperclip, MessageSquare } from "lucide-react";
import { useLocation } from "react-router-dom";
import Path from "../../components/Path";
import { Link } from "react-router-dom";

type ChallanStatus = "Unpaid" | "Pending" | "Approved";

interface Challan {
    id: string;
    challanId: string;
    business: string;
    reason: string;
    dateTime: string;
    inspectedBy: string;
    attachments: number;
    comments: number;
    status: ChallanStatus;
}

const challans: Challan[] = [
    {
        id: "1",
        challanId: "2665D9",
        business: "Petrol Pump",
        reason: "Scamming Tricks by Petrol Pump Scamming Tricks by Petrol Pump Scamming Tricks by Petrol Pump",
        dateTime: "12.09.2019, 12:53 PM",
        inspectedBy: "Kashif Khan",
        attachments: 2,
        comments: 12,
        status: "Unpaid",
    },
    {
        id: "2",
        challanId: "2665D9",
        business: "Petrol Pump",
        reason: "Scamming Tricks by Petrol Pump",
        dateTime: "12.09.2019, 12:53 PM",
        inspectedBy: "Kashif Khan",
        attachments: 2,
        comments: 12,
        status: "Pending",
    },
    {
        id: "3",
        challanId: "2665D9",
        business: "Petrol Pump",
        reason: "Scamming Tricks by Petrol Pump",
        dateTime: "12.09.2019, 12:53 PM",
        inspectedBy: "Kashif Khan",
        attachments: 2,
        comments: 12,
        status: "Approved",
    },
    {
        id: "4",
        challanId: "2665D9",
        business: "Petrol Pump",
        reason: "Scamming Tricks by Petrol Pump",
        dateTime: "12.09.2019, 12:53 PM",
        inspectedBy: "Kashif Khan",
        attachments: 2,
        comments: 12,
        status: "Unpaid",
    },
];

function StatusBadge({ status }: { status: ChallanStatus }) {
    const styles: Record<ChallanStatus, string> = {
        Unpaid: "bg-rose-50 text-rose-500",
        Pending: "bg-amber-50 text-amber-500",
        Approved: "bg-emerald-50 text-emerald-600",
    };

    return (
        <span
            className={`inline-block rounded-md px-3 py-1 text-xs font-semibold ${styles[status]}`}
        >
            {status}
        </span>
    );
}

/* ─── Mobile card view for a single challan ─── */
function ChallanCard({ c }: { c: Challan }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#2D0D4D]">#{c.challanId}</span>
                <StatusBadge status={c.status} />
            </div>

            <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                    <span className="text-gray-400">Business</span>
                    <span className="font-medium text-gray-700">{c.business}</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span className="text-gray-400 shrink-0">Reason</span>
                    <span className="font-medium text-gray-700 text-right truncate">{c.reason}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="font-medium text-gray-700">{c.dateTime}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Inspector</span>
                    <span className="font-medium text-gray-700">{c.inspectedBy}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 pt-1">
                    <span className="flex items-center gap-1">
                        <Paperclip className="h-3.5 w-3.5" /> {c.attachments}
                    </span>
                    <span className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5" /> {c.comments}
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
                <Link to={`/admin/case/${c.challanId}`} className="flex-1 rounded-md bg-[#2D0D4D] px-3 py-2 text-[11px] text-center font-semibold text-white transition-colors hover:bg-[#3d1568]">
                    View Details
                </Link>
                <button className="flex-1 rounded-md bg-[#14B8A6] px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#0f9d8d]">
                    Resolve
                </button>
                <button className="flex-1 rounded-md border border-[#14B8A6] px-3 py-2 text-[11px] font-semibold text-[#14B8A6] transition-colors hover:bg-[#14B8A6]/5">
                    Comment
                </button>
            </div>
        </div>
    );
}

export default function ChallansPage() {
    const location = useLocation();

    return (
        <div className="flex h-full flex-1 flex-col bg-linear-to-b from-white to-[#e7edf9]">

            {/* Body */}
            <main className="flex-1 overflow-auto px-3 py-3 sm:px-5 sm:py-4">
                {/* Breadcrumb + action */}
                <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-1 text-[12px] bg-white p-2 border rounded-[5px] border-zinc-200 text-slate-500">
                        <Home size={12} />
                        <Path location={location} />
                    </div>

                    <Link to="/admin/challans/create" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#14B8A6] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#0f9d8d] sm:w-auto">
                        <span className="text-lg leading-none">+</span> Create Challan
                    </Link>
                </div>

                {/* ─── Mobile: card list (< md) ─── */}
                <div className="space-y-3 md:hidden">
                    {challans.map((c) => (
                        <ChallanCard key={c.id} c={c} />
                    ))}
                </div>

                {/* ─── Desktop: table (≥ md) ─── */}
                <div className="hidden md:block overflow-hidden rounded-xl border border-gray-100 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-175 table-fixed text-left text-sm">
                            <thead>
                                <tr className="border-b text-xs border-gray-100 bg-[#eff3fb] font-semibold uppercase tracking-wide text-slate-800">
                                    <th className="px-4 py-4 lg:px-6">Challan ID</th>
                                    <th className="px-4 py-4 lg:px-6">Business</th>
                                    <th className="px-4 py-4 lg:px-6">Reason</th>
                                    <th className="px-4 py-4 lg:px-6">Date - Time</th>
                                    <th className="px-4 py-4 lg:px-6">Inspected by</th>
                                    <th className="px-4 py-4 lg:px-6">Status</th>
                                    <th className="px-4 py-4 lg:px-6">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {challans.map((c) => (
                                    <tr key={c.id} className="border-b truncate text-xs border-gray-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-4 py-5 lg:px-6 lg:py-6 font-semibold text-[#2D0D4D]">
                                            {c.challanId}
                                        </td>
                                        <td className="px-4 py-5 lg:px-6 lg:py-6 text-gray-600">{c.business}</td>
                                        <td className="px-4 py-5 lg:px-6 lg:py-6 text-gray-600"><div className="w-30 truncate">{c.reason}</div></td>
                                        <td className="px-4 py-5 lg:px-6 lg:py-6 text-gray-600">
                                            {c.dateTime.split(", ")[0]}
                                            <br />
                                            {c.dateTime.split(", ")[1]}
                                        </td>
                                        <td className="px-4 py-5 lg:px-6 lg:py-6 text-gray-600">
                                            <p className="font-medium text-gray-700">{c.inspectedBy}</p>
                                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <Paperclip className="h-3.5 w-3.5" /> {c.attachments}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MessageSquare className="h-3.5 w-3.5" /> {c.comments}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 lg:px-6 lg:py-6">
                                            <StatusBadge status={c.status} />
                                        </td>
                                        <td className="px-4 py-5 lg:px-6 lg:py-6">
                                            <div className="flex flex-col gap-2">
                                                <Link to={`/admin/case/${c.challanId}`} className="rounded-md bg-[#2D0D4D] px-4 py-2 text-[12px] text-center font-semibold text-white transition-colors hover:bg-[#3d1568]">
                                                    View Details
                                                </Link>
                                                <button className="rounded-md bg-[#14B8A6] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#0f9d8d]">
                                                    Resolve
                                                </button>
                                                <button className="rounded-md border border-[#14B8A6] px-4 py-2 text-[12px] font-semibold text-[#14B8A6] transition-colors hover:bg-[#14B8A6]/5">
                                                    Comment
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}