import { useState } from "react"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { SideBar } from "./SideBar"
import { Outlet } from "react-router-dom"

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div className="flex flex-row h-screen overflow-hidden">
                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar — always visible on lg+, slide-in drawer on mobile */}
                <div
                    className={`
                        fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
                        lg:relative lg:z-auto lg:translate-x-0
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    `}
                >
                    <SideBar onClose={() => setSidebarOpen(false)} />
                </div>

                {/* Main content area */}
                <div className="flex flex-col flex-1 min-w-0 min-h-0">
                    <div className="shrink-0">
                        <Header onMenuToggle={() => setSidebarOpen(true)} />
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <Outlet />
                    </div>

                    <div className="shrink-0">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout