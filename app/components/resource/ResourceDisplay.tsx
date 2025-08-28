import type { Resource } from "~/api/survival_day"
import { FOOD_COLOR, HEALTH_COLOR, WATER_COLOR } from "~/lib/colors"

export const ResourceDisplay = ({ resource, value }: { resource: Resource, value: number }) => {
    function getIcon(resource: Resource) {
        switch (resource) {
            case 'food':
                return <span style={{ color: FOOD_COLOR }}><i className="fa-solid fa-utensils"></i></span>
            case 'water':
                return <span style={{ color: WATER_COLOR }}><i className="fa-solid fa-water"></i></span>
            case 'health':
                return <span style={{ color: HEALTH_COLOR }}><i className="fa-solid fa-heart"></i></span>
        }
    }

    function getColor(resource: Resource) {
        switch (resource) {
            case 'food':
                return 'bg-green-800/30 border-green-600/30 text-green-300'
            case 'water':
                return 'bg-blue-800/30 border-blue-600/30 text-blue-300'
            case 'health':
                return 'bg-red-800/30 border-red-600/30 text-red-300'
        }
    }

    return (
        <div className={`flex items-center gap-1 ${getColor(resource)} px-2 py-1 rounded-md border`}>
            <span className="font-medium">{value > 0 ? '+' : ''}{value}%</span>
            <div className="flex items-center gap-1">
                {getIcon(resource)}
            </div>
        </div>
    )
}