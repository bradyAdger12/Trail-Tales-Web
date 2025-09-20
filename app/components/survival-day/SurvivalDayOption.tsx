import type { SurvivalDayDifficulty, SurvivalDayOption } from "~/api/survival_day";
import { ResourceDisplay } from "../resource/ResourceDisplay";
import { EASY_DIFFICULTY_COLOR, HARD_DIFFICULTY_COLOR, MEDIUM_DIFFICULTY_COLOR, REST_DIFFICULTY_COLOR } from "~/lib/colors";

export default function SurvivalDayOption({ option, completedDifficulty }: { option: SurvivalDayOption, completedDifficulty?: SurvivalDayDifficulty }) {
    function getDifficultyColor(difficulty: SurvivalDayDifficulty) {
        if (difficulty === 'easy') return EASY_DIFFICULTY_COLOR
        if (difficulty === 'medium') return MEDIUM_DIFFICULTY_COLOR
        if (difficulty === 'hard') return HARD_DIFFICULTY_COLOR
        return REST_DIFFICULTY_COLOR
    }
    function getDifficultyText(difficulty: SurvivalDayDifficulty) {
        if (difficulty === 'easy') return 'short'
        if (difficulty === 'medium') return 'mid'
        if (difficulty === 'hard') return 'long'
        return 'rest'
    }
    return (
        <div className={`p-6 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors ${completedDifficulty === option.difficulty ? 'bg-primary/10 border-2' : ''}`}>
            <div className="flex flex-wrap items-center gap-y-4 justify-between mb-3">
                <p className=" text-xl font-bold mr-4">{option.description}</p>
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-sm rounded-full border ${getDifficultyColor(option.difficulty)}`}>
                        {getDifficultyText(option.difficulty)}
                    </span>
                    <div className=" font-medium">
                        {option.duration_in_seconds / 60} min
                    </div>
                </div>
            </div>
            <div className="w-full mt-6">
                <div className="flex flex-wrap items-center gap-2">
                    { option.food_gain_percentage > 0 && <ResourceDisplay resource="food" value={option.food_gain_percentage} /> }
                    { option.water_gain_percentage > 0 && <ResourceDisplay resource="water" value={option.water_gain_percentage} /> }
                    { option.health_gain_percentage > 0 && <ResourceDisplay resource="health" value={option.health_gain_percentage} /> }
                </div>
            </div>
        </div>
    )
}