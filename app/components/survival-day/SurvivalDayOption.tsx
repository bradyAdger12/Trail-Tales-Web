import { useGame } from "~/contexts/GameContext";
import type { SurvivalDayDifficulty, SurvivalDayOption } from "~/api/survival_day";
import { kilometersToMiles } from "~/lib/conversions";
import { FOOD_COLOR, HEALTH_COLOR, WATER_COLOR } from "~/lib/colors";
import { ResourceDisplay } from "../resource/ResourceDisplay";

export default function SurvivalDayOption({ option, completedDifficulty }: { option: SurvivalDayOption, completedDifficulty?: SurvivalDayDifficulty }) {
    const { game } = useGame()
    function getDifficultyColor(difficulty: SurvivalDayDifficulty) {
        if (difficulty === 'easy') return 'bg-green-700 border-green-500 text-green-100'
        if (difficulty === 'medium') return 'bg-yellow-700 border-yellow-500 text-yellow-100'
        if (difficulty === 'hard') return 'bg-red-700 border-red-500 text-red-100'
        return 'bg-gray-700 border-gray-500 text-gray-100'
    }
    return (
        <div className={`p-6 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors ${completedDifficulty === option.difficulty ? 'bg-green-900/20' : ''}`}>
            <div className="flex flex-wrap items-center gap-y-4 justify-between mb-3">
                <p className="text-gray-200 mr-4">{option.description}</p>
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-sm rounded-full border ${getDifficultyColor(option.difficulty)}`}>
                        {option.difficulty}
                    </span>
                    <div className="text-gray-300 font-medium">
                        {kilometersToMiles(option.distance_in_kilometers).toFixed(2)} mi
                    </div>
                </div>
            </div>
            <div className="w-full mt-6">
                {option.difficulty !== 'rest' && <div className="flex flex-wrap items-center gap-y-4 gap-x-2">
                    <div className="flex gap-x-2 items-center">
                        <div className="flex items-center gap-1 bg-purple-800/30 px-2 py-1 rounded-md">
                            <i className="fas fa-dice text-purple-400"></i>
                            <span className="text-purple-300">{option.chance_to_find_items}%</span>
                        </div>
                        <span className="text-gray-400">chance of</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ResourceDisplay resource="food" value={option.item_gain_percentage} />
                        <ResourceDisplay resource="water" value={option.item_gain_percentage} />
                        <ResourceDisplay resource="health" value={option.health_change_percentage} />
                    </div>
                </div>
                }
                { option.difficulty === 'rest' && <div className="flex items-center gap-2"><ResourceDisplay resource="health" value={option.health_change_percentage} /></div> }
            </div>
        </div>
    )
}