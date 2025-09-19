import type { Resource } from "~/api/survival_day"
import { FOOD_COLOR, FOOD_COLOR_BG, HEALTH_COLOR, HEALTH_COLOR_BG, WATER_COLOR, WATER_COLOR_BG } from "~/lib/colors"

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
                return FOOD_COLOR_BG
            case 'water':
                return WATER_COLOR_BG
            case 'health':
                return HEALTH_COLOR_BG
            default:
                return {}
        }
    }

    return (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-md border`} style={getColor(resource)}>
            <span className="font-medium">{value > 0 ? '+' : ''}{value}%</span>
            <div className="flex items-center gap-1">
                {getIcon(resource)}
            </div>
        </div>
    )
}