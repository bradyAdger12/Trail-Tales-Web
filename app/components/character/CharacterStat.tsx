export default function CharacterStat({ stat, color, icon, bgColor }: { stat: number | undefined, color: string, icon: string, bgColor: string }) {
    return (
        <div className="flex items-center gap-2 mt-4">
            <i className={`fas ${icon} ${color}`}></i>
            <div className="w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full ${bgColor} transition-all duration-300`}
                    style={{ width: `${stat}%` }}
                ></div>
            </div>
            <span className="text-sm">{stat}%</span>
        </div>
    )
}
