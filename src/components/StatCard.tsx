
interface StatCardProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    iconBg?: string;
    iconColor?: string;
    labelColor?: string;
    variant?: "circle" | "plain";
}
// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------
export const StatCard: React.FC<StatCardProps> = ({
    icon,
    value,
    label,
    iconBg = "bg-blue-200",
    iconColor = "text-blue-700",
    labelColor = "text-slate-400",
    variant = "circle",
}) => (
    <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-5 text-center text-xs flex flex-col items-center justify-center">
        {variant === "circle" ? (
            <div className="flex w-full justify-center">
                <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-3 sm:mb-4 ${iconBg} ${iconColor}`}
                >
                    {icon}
                </div>
            </div>
        ) : (
            <div className="text-slate-500 flex justify-center mb-3 sm:mb-4">{icon}</div>
        )}
        <div className="text-xl sm:text-2xl font-bold text-slate-700">{value}</div>
        <div className={`mt-1 font-medium leading-tight text-[10px] sm:text-xs ${labelColor}`}>
            {label}
        </div>
    </div>
);