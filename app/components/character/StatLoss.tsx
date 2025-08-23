export default function StatLoss({ stat, loss }: { stat: number, loss: number }) {
    return (
        <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
            <i className="fas fa-arrow-down text-red-400"></i>
            <span>{loss}%/day</span>
        </div>
    )
}