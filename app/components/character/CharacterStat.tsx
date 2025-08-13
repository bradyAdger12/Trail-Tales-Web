export default function CharacterStat({ stat, color, icon }: { stat: number | undefined, color: string, icon: string }) {
    return (
        <div className="flex items-center gap-2 mt-4">
            <i className={`fas ${icon}`} style={{ color: color }}></i>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-300`}
                    style={{ width: `${stat}%`, color: color, backgroundColor: color }}
                ></div>
            </div>
            <p className="text-sm font-bold" style={{ color: color }}>{stat}%</p>
        </div>
    )
}
