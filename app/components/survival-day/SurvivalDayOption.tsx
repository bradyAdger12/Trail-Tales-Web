import { useGame } from "~/contexts/GameContext";
import type { SurvivalDayOption } from "~/api/survival_day";
import { kilometersToMiles } from "~/lib/conversions";
import { FOOD_COLOR, WATER_COLOR } from "~/lib/colors";

export default function SurvivalDayOption({ option, completedDifficulty }: { option: SurvivalDayOption, completedDifficulty?: 'easy' | 'medium' | 'hard' }) {
    const { game } = useGame()
    return (
        <div className={`p-6 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors ${completedDifficulty === option.difficulty ? 'bg-green-900/20' : ''}`}>
            <div className="flex items-center justify-between mb-3">
                <p className="text-gray-200 flex-1 mr-4">{option.description}</p>
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-sm rounded-full border ${option.difficulty === 'easy' ? 'bg-green-700 border-green-500 text-green-100' :
                        option.difficulty === 'medium' ? 'bg-yellow-700 border-yellow-500 text-yellow-100' :
                            'bg-red-700 border-red-500 text-red-100'
                        }`}>
                        {option.difficulty}
                    </span>
                    <div className="text-gray-300 font-medium">
                        {kilometersToMiles(option.distance_in_kilometers).toFixed(2)} mi
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <p>
                            Travel {kilometersToMiles(option.distance_in_kilometers).toFixed(2)} mi for a
                        </p>
                        <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded-md">
                            <i className="fas fa-dice text-purple-400"></i>
                            <span className="text-purple-300">{option.chance_to_find_items}%</span>
                        </div>
                        <span className="text-gray-300">chance to find</span>
                        <div className="flex items-center gap-1 bg-green-800/30 px-2 py-1 rounded-md border border-green-600/30">
                            <span className="text-green-300 font-medium">+{option.item_gain_percentage}%</span>
                            <div className="flex items-center gap-1">
                                <span style={{ color: FOOD_COLOR }}><i className="fa-solid fa-utensils"></i></span>
                                <span className="text-gray-400">&</span>
                                <span style={{ color: WATER_COLOR }}><i className="fa-solid fa-water"></i></span>
                            </div>
                        </div>
                    </div>
                    {option.health_loss > 0 && <div className="flex items-center gap-1">
                        <span className="text-red-400">❤️</span>
                        <span>-{option.health_loss} health</span>
                    </div>}
                </div>
            </div>
        </div>
    )
}