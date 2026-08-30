// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import leftBg from "../assets/left-bg.svg"
import logoWhite from "../assets/logo-icon-white.svg";
import logoColor from "../assets/logo-icon-color.svg";
import leftSideLogo from "../assets/left-side-logo.svg";

interface UserData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        email: "",
        password: ""
    });

    const handleLogin: React.SubmitEventHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex min-h-screen w-full flex-col overflow-hidden bg-white md:h-screen md:flex-row">
            {/* LEFT PANEL */}
            <div className="relative hidden w-full max-w-[52%] flex-col justify-between overflow-hidden md:flex">
                {/* Background image */}
                <img
                    src={leftBg}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Purple gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-[#6d4a9c]/40 via-[#2D0D4D]/92 to-[#2D0D4D]" />

                {/* Center content */}
                <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-10 text-center">
                    <img src={leftSideLogo} alt="Inspection System" className="h-24 w-24 lg:h-32 lg:w-32" />

                    <h1 className="mt-6 text-3xl lg:text-4xl font-extrabold text-(--bright-teal)">
                        Inspection System
                    </h1>
                    <p className="mt-2 text-base lg:text-lg font-medium text-white">Labour Department</p>

                    {/* Icon badges */}
                    <div>
                        <img src={logoWhite} alt="Inspection System" className="w-40 lg:w-56 mt-8 lg:mt-12" />
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 flex flex-col items-center gap-2 border-t border-white/15 px-6 py-4 text-xs text-white/70 lg:flex-row lg:justify-between lg:px-8">
                    <span>
                        © 2026 - <span className="text-(--bright-teal)">Inspection System</span> Dashboard
                    </span>
                    <div className="flex items-center gap-4">
                        <span className="h-1 w-1 rounded-full bg-white/40 hidden lg:block" />
                        <span>
                            Made by <span className="font-semibold text-yellow-400">KPITB</span>
                        </span>
                        <a href="#" className="hover:text-white">About</a>
                        <a href="#" className="hover:text-white">Policy</a>
                        <a href="#" className="hover:text-white">Contact</a>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-1 flex-col overflow-auto justify-between bg-[#F8FAFE] px-5 py-6 sm:px-8 sm:py-8 md:px-12 lg:px-24">
                {/* Header logo */}
                <div className="flex items-center gap-3">
                    <img src={logoColor} alt="Inspection System" className="mb-3 h-16 w-48 sm:h-22 sm:w-66 ml-0 sm:ml-4" />
                </div>

                {/* Form */}
                <div className="mx-auto w-full max-w-sm flex-1 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-[#2D0D4D]">Sign In</h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Please Enter your login and password
                    </p>
                    <div className="my-6 border-t border-dashed border-gray-200" />

                    <form onSubmit={handleLogin} className="space-y-5">

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500">
                                ENTER EMAIL
                            </label>
                            <input
                                type="text"
                                value={userData.email}
                                onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="Example@gmail.com"
                                className="w-full rounded-lg bg-[#EEF1F8] px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none ring-1 ring-transparent focus:ring-2 focus:ring-(--bright-teal)"
                            />
                        </div>


                        <div>
                            <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500">
                                ENTER PASSWORD
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={userData.password}
                                    onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
                                    placeholder="********"
                                    className="w-full rounded-lg bg-[#EEF1F8] px-4 py-3 pr-11 text-sm text-gray-700 placeholder:text-gray-400 outline-none ring-1 ring-transparent focus:ring-2 focus:ring-(--bright-teal)"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((p) => !p)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-2 w-full rounded-lg bg-(--bright-teal) py-3.5 text-sm font-semibold text-white transition-colors hover:bg-(--bright-teal)"
                        >
                            Login
                        </button>
                    </form>
                </div>

                <div />
            </div>
        </div>
    );
}