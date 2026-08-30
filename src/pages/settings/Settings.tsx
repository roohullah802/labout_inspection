import React from "react";
import { useLocation } from "react-router-dom";
import { Home, Camera, Save } from "lucide-react";
import Path from "../../components/Path";

export default function Settings() {
    const location = useLocation();

    return (
        <div className="flex h-full flex-1 flex-col bg-linear-to-b from-white to-[#e7edf9]">
            <main className="flex-1 overflow-auto px-3 py-3 sm:px-5 sm:py-4">
                {/* Breadcrumb */}
                <div className="mb-4 sm:mb-5">
                    <div className="inline-flex items-center gap-1.5 text-sm bg-white p-2.5 px-3 border rounded-lg border-zinc-200 text-slate-500 shadow-sm">
                        <Home size={14} />
                        <Path location={location} />
                    </div>
                </div>

                <div className="mx-auto max-w-4xl">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">Account Settings</h1>

                    {/* Profile Settings */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-lg font-semibold text-slate-800">Profile Information</h2>
                            <p className="text-sm text-slate-500 mt-1">Update your personal information and photo.</p>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Avatar Upload */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                                <div className="relative group shrink-0">
                                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm hover:text-[#14B8A6] transition-colors">
                                        <Camera size={14} />
                                    </button>
                                </div>
                                <div>
                                    <button className="px-4 py-2 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">
                                        Change Photo
                                    </button>
                                    <p className="text-xs text-slate-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-medium text-slate-500">First Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Fazal"
                                        className="rounded-md border-0 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 outline-none ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-[#14B8A6] transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-medium text-slate-500">Last Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Manan"
                                        className="rounded-md border-0 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 outline-none ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-[#14B8A6] transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-medium text-slate-500">Email Address</label>
                                    <input
                                        type="email"
                                        defaultValue="fazal.manan@kp.gov.pk"
                                        className="rounded-md border-0 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 outline-none ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-[#14B8A6] transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-medium text-slate-500">Phone Number</label>
                                    <input
                                        type="tel"
                                        defaultValue="+92 300 1234567"
                                        className="rounded-md border-0 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 outline-none ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-[#14B8A6] transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                            <button className="flex items-center gap-2 rounded-lg bg-[#14B8A6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0f9d8d] shadow-sm">
                                <Save size={16} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
