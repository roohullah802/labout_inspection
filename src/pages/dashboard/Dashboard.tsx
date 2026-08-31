import React from "react";
import {
    ChevronRight,
    Home,
    FileText,
    UserSquare2,
    ClipboardList,
    Clock,
    Eye,
    ClipboardCheck,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { StatCard } from "../../components/StatCard";
import { ChartCard } from "../../components/ChartCard";
import Path from "../../components/Path";


const LabourDashboard: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const roleParam = searchParams.get("role")?.toLowerCase() || "secretary";

    const renderCards = () => {
        if (roleParam === 'director') {
            return (
                <>
                    <StatCard icon={<ClipboardList size={16} />} iconBg="bg-blue-200" iconColor="text-blue-700" value={23} label="Total Challan Against You" />
                    <StatCard icon={<Clock size={16} />} iconBg="bg-orange-200" iconColor="text-red-500" value="04" label="Total Pending Challan" />
                    <StatCard icon={<Eye size={16} />} iconBg="bg-rose-200" iconColor="text-rose-600" value="06" label="Total Pending Approvals" />
                    <StatCard icon={<ClipboardCheck size={16} />} iconBg="bg-emerald-200" iconColor="text-emerald-600" value={13} label="Total Approved Appeals" />
                </>
            );
        }
        if (roleParam === 'district attorney' || roleParam === 'district_attorney') {
            return (
                <>
                    <StatCard icon={<ClipboardList size={16} />} iconBg="bg-indigo-200" iconColor="text-indigo-700" value={12} label="Cases for Review" />
                    <StatCard icon={<Clock size={16} />} iconBg="bg-amber-200" iconColor="text-amber-700" value="05" label="Pending Court Dates" />
                    <StatCard icon={<Eye size={16} />} iconBg="bg-cyan-200" iconColor="text-cyan-700" value="08" label="Appeals to Process" />
                    <StatCard icon={<ClipboardCheck size={16} />} iconBg="bg-teal-200" iconColor="text-teal-700" value={45} label="Total Closed Cases" />
                </>
            );
        }
        if (roleParam === 'labour_court' || roleParam === 'labour court') {
            return (
                <>
                    <StatCard icon={<ClipboardList size={16} />} iconBg="bg-purple-200" iconColor="text-purple-700" value={34} label="Total Cases Filed" />
                    <StatCard icon={<Clock size={16} />} iconBg="bg-amber-200" iconColor="text-amber-700" value="12" label="Pending Hearings" />
                    <StatCard icon={<Eye size={16} />} iconBg="bg-blue-200" iconColor="text-blue-700" value={19} label="Under Review" />
                    <StatCard icon={<ClipboardCheck size={16} />} iconBg="bg-emerald-200" iconColor="text-emerald-600" value={145} label="Cases Disposed" />
                </>
            );
        }
        // Default (Secretary)
        return (
            <>
                <StatCard icon={<ClipboardList size={16} />} iconBg="bg-blue-200" iconColor="text-blue-700" value={23} label="Total Challan Against You" />
                <StatCard icon={<Clock size={16} />} iconBg="bg-orange-200" iconColor="text-red-500" value="04" label="Total Pending Challan" />
                <StatCard icon={<Eye size={16} />} iconBg="bg-rose-200" iconColor="text-rose-600" value="06" label="Total Pending Approvals" />
                <StatCard icon={<ClipboardCheck size={16} />} iconBg="bg-emerald-200" iconColor="text-emerald-600" value={13} label="Total Approved Appeals" />
                <StatCard variant="plain" icon={<FileText size={24} />} value={103} label="Reports" labelColor="text-slate-700" />
                <StatCard variant="plain" icon={<UserSquare2 size={24} />} value={103} label="Inspectors" labelColor="text-slate-500" />
                <StatCard variant="plain" icon={<UserSquare2 size={24} />} value={10} label="Admin" labelColor="text-slate-500" />
            </>
        );
    };

    return (
        <div className="flex h-full min-h-full flex-col bg-linear-to-b from-(--linear-top) to-(--linear-bottom)">
            {/* Breadcrumb + primary action */}
            <div className="flex shrink-0 flex-col gap-3 px-3 pt-3 sm:px-4 sm:pt-4 md:flex-row md:items-center md:justify-between md:px-6">
                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-1 rounded-[5px] border border-zinc-200 bg-white p-2 text-[12px] text-slate-500"
                >
                    <Home size={11} className="shrink-0" />
                    <Path location={location} />
                </nav>

                {(roleParam !== 'director' && roleParam !== 'district_attorney' && roleParam !== 'district attorney' && roleParam !== 'labour_court' && roleParam !== 'labour court') && (
                    <Link to={"/admin/new-task"} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#14B8A6] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0d9488] sm:w-auto sm:justify-start">
                        Assign a Task
                        <ChevronRight size={14} />
                    </Link>
                )}
            </div>

            {/* Body */}
            <section className="flex flex-1 min-h-0 flex-col px-3 py-3 sm:px-4 sm:py-4">
                <div className="flex flex-col gap-4 xl:flex-row w-full">
                    {roleParam === 'secretary' ? (
                        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:flex-1">
                            {renderCards()}
                        </div>
                    ) : (
                        <div className="flex flex-col xl:flex-1 gap-4">
                            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                {renderCards()}
                            </div>
                            
                            {roleParam === 'director' && (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-4 bg-[#391054] text-white p-4 rounded-xl">
                                        <div className="flex items-center justify-center bg-white/20 p-2 rounded-lg">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm sm:text-base mb-2">A new Task assigned to Director Laboure by Secretary Labour</p>
                                            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-800">
                                                <span className="bg-white px-3 py-1 rounded-full flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Urgent</span>
                                                <span className="bg-white px-3 py-1 rounded-full flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Inspection</span>
                                                <span className="bg-white px-3 py-1 rounded-full flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Peshawar</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-[#2DD4BF] text-white p-4 rounded-xl">
                                        <div className="flex items-center justify-center bg-white/20 p-2 rounded-lg">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm sm:text-base mb-2">A new Task assigned to Director Laboure by Secretary Labour</p>
                                            <div className="flex flex-wrap gap-2 text-xs font-medium text-teal-900">
                                                <span className="bg-white px-3 py-1 rounded-full flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Urgent</span>
                                                <span className="bg-white px-3 py-1 rounded-full flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Inspection</span>
                                                <span className="bg-white px-3 py-1 rounded-full flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Peshawar</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="w-full min-h-75 xl:w-112.5 xl:shrink-0">
                        <ChartCard />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LabourDashboard;