import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 px-4 sm:px-6">
            <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 text-center shadow-xl">
                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-100">
                    <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
                </div>

                {/* 404 */}
                <h1 className="mt-6 sm:mt-8 text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold text-slate-800">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-7 text-slate-500">
                    Sorry, the page you are looking for doesn't exist, may have been
                    moved, or the URL is incorrect.
                </p>

                {/* Buttons */}
                <div className="mt-8 sm:mt-10 flex flex-col justify-center gap-3 sm:gap-4 sm:flex-row">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2D0D4D] px-5 sm:px-6 py-3 font-semibold text-white transition hover:bg-[#43206b] text-sm sm:text-base"
                    >
                        <Home className="h-5 w-5" />
                        Go to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 sm:px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 text-sm sm:text-base"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}