import { useGameConfig } from "~/contexts/GameConfigContext"
import type { GameConfig, GameDifficulty } from "~/contexts/GameConfigContext"
export default function GameDifficulty() {
    const { config, setConfig } = useGameConfig()
    const difficultyOptions = [
        {
            name: "Easy",
            description: "Surviving takes minimal effort.",
            daysToSurvive: 7
        },
        {
            name: "Medium",
            description: "Surviving takes more effort.",
            daysToSurvive: 15
        },
        {
            name: "Hard",
            description: "Surviving takes more effort.",
            daysToSurvive: 30
        }
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-9">
            {difficultyOptions.map((option) => (
                <div key={option.name} className={`card w-full shadow-md p-4 border hover:border-primary ${config.difficulty === option.name.toLowerCase() ? 'border-primary' : 'border-transparent'} cursor-pointer`} onClick={() => setConfig((prev) => { return { ...prev, difficulty: option.name.toLowerCase() as GameDifficulty } })}>
                    <h3>{option.name}</h3>
                    <p>
                        {option.description}
                    </p>
                    <div className="mt-4">
                        <p>
                            Days to survive: {option.daysToSurvive}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
