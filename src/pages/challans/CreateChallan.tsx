import React from "react";
import { useLocation } from "react-router-dom";
import { Home, ChevronDown } from "lucide-react";
import Path from "../../components/Path";

// Helper component for form inputs
function FormInput({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-slate-400">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="rounded-md border-0 bg-slate-50/50 px-3 py-2.5 text-xs text-slate-700 outline-none ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-[#14B8A6] transition-all"
            />
        </div>
    );
}

// Helper component for form selects
function FormSelect({ label, placeholder }: { label: string; placeholder: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-slate-400">{label}</label>
            <div className="relative">
                <select className="w-full appearance-none rounded-md border-0 bg-slate-50/50 px-3 py-2.5 pr-8 text-xs text-slate-700 outline-none ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-[#14B8A6] transition-all cursor-pointer">
                    <option value="" disabled selected>{placeholder}</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
        </div>
    );
}


export default function CreateChallan() {
    const location = useLocation();

    return (
        <div className="flex h-full flex-1 flex-col bg-linear-to-b from-(--linear-top) to-(--linear-bottom)">
            <main className="flex-1 overflow-auto px-3 py-3 sm:px-5 sm:py-4">
                {/* Breadcrumb */}
                <div className="mb-4 sm:mb-5">
                    <div className="inline-flex items-center gap-1.5 text-sm bg-white p-2.5 px-3 border rounded-lg border-zinc-200 text-slate-500 shadow-sm">
                        <Home size={14} />
                        <Path location={location} />
                    </div>
                </div>

                <div className="mx-auto max-w-5xl space-y-4 sm:space-y-5 pb-8">
                    {/* First Card */}
                    <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-7 shadow-sm">
                        <h2 className="text-lg sm:text-xl font-bold text-[#1e293b] mb-6 leading-tight">
                            WEIGHTS & MEASURES UNDER THE KP STANDARD WEIGHTS & MEASURES ENFORCEMENT ACT, 1976
                        </h2>

                        <div className="space-y-8">
                            {/* Header Row */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                                <FormInput label="Name:" placeholder="Kashif Khan" />
                                <FormInput label="Designation" placeholder="Enter here" />
                                <FormSelect label="Location" placeholder="District Malakand" />
                                <FormSelect label="Start Date" placeholder="02 / 07 / 2024" />
                            </div>

                            {/* Section 1 */}
                            <div>
                                <h3 className="text-[13px] font-bold text-[#14B8A6] mb-4">Weights/Measures Verification work</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                                    <FormInput label="Total No. of Weights Verified." placeholder="Enter here" />
                                    <FormInput label="Total No. of Scales Verified." placeholder="Enter here" />
                                    <FormInput label="Total No. of Measures Verifi ed." placeholder="Enter here" />
                                    <FormInput label="Total No. of Scales Verified." placeholder="Enter here" />
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h3 className="text-[13px] font-bold text-[#14B8A6] mb-4">Government Revenue from CNG Stations</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                                    <FormInput label="Total No. of CNG station verified" placeholder="Enter here" />
                                    <FormInput label="No. of CNG Dispensing Units Verified" placeholder="Enter here" />
                                    <FormInput label="Target for CNG Rs." placeholder="Enter here" />
                                    <FormInput label="Fee realized from CNG Rs." placeholder="Enter here" />
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h3 className="text-[13px] font-bold text-[#14B8A6] mb-4">Government Revenue from POL + Shops etc</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                                    <FormInput label="POL Station s verified" placeholder="Enter here" />
                                    <FormInput label="POL Dispensing units verified" placeholder="Enter here" />
                                    <FormInput label="Individual Monthly Receipt Target other than CNG Rs." placeholder="Enter here" />
                                    <FormInput label="Verification fee other than CNG Rs." placeholder="Enter here" />
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <h3 className="text-[13px] font-bold text-[#14B8A6] mb-4">Revenue</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                                    <FormInput label="POL Station s verified" placeholder="Enter here" />
                                    <FormInput label="POL Dispensing units verified" placeholder="Enter here" />
                                    <FormInput label="Individual Monthly Receipt Target other than CNG Rs." placeholder="Enter here" />
                                    <FormInput label="Verification fee other than CNG Rs." placeholder="Enter here" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Card */}
                    <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-7 shadow-sm">
                        <h2 className="text-lg font-bold text-[#1e293b] mb-6">
                            Inspection work / Prosecution + Cases + Fines
                        </h2>

                        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-4">
                            <FormInput label="Inspection made" placeholder="Enter here" />
                            <FormInput label="Prosecution carried out" placeholder="Enter here" />
                            <FormInput label="Cases Filed" placeholder="Enter here" />
                            <FormInput label="Previous Pendency" placeholder="Enter here" />

                            <FormInput label="Total cases in the Courts" placeholder="Enter here" />
                            <FormInput label="Cases decided" placeholder="Enter here" />
                            <FormInput label="Cases Left Pending at the end of present month" placeholder="Enter here" />
                            <FormInput label="Fine Imposed Rs." placeholder="Enter here" />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-end">
                            <button className="rounded-lg bg-[#14B8A6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0f9d8d] shadow-sm">
                                Submit Challan
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
