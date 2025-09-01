export default function StatDisplay({ title, value, description }: { title: string, value: string | number, description?: string }) {
    return (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-title">{title}</div>
                <div className="stat-value text-sm md:text-2xl lg:text-4xl">{value}</div>
                {description && <div className="stat-desc">{description}</div>}
            </div>
        </div>
    )
}