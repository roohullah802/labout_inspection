export const Footer: React.FC = () => (
    <footer className="flex flex-col items-center gap-2 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:justify-between sm:px-5 sm:py-5">
        <p className="text-center sm:text-left">
            © {new Date().getFullYear()} - Inspection System Dashboard • Made by{" "}
            <span className="text-teal-500 font-medium">KPITB</span>
        </p>
        <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-slate-600">
                About
            </a>
            <a href="#" className="hover:text-slate-600">
                Policy
            </a>
            <a href="#" className="hover:text-slate-600">
                Contact
            </a>
        </div>
    </footer>
);