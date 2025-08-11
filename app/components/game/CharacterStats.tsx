import type { Game } from "~/api/game";
import { useAuth } from "~/contexts/AuthContext";

export const HUNGER_COLOR = '#FFC94C'
export const THIRST_COLOR = '#4C9BFF'
export const HEALTH_COLOR = '#FF4C4C'

export default function CharacterStats({ game }: { game: Game }) {
    const { user } = useAuth()

    function statLevel(color: string, stat: number) {
        return (<div className="relative rounded-full w-[90%] overflow-hidden h-[20px]">
            <div className="absolute left-0 h-full flex items-center text-white justify-center" style={{ backgroundColor: color, width: `${stat}%` }}>
                {stat}%
            </div>
        </div>)
    }
    return (
        <div>
            <h4>
                {user?.display_name} Stats
            </h4>
            <div className="flex flex-col gap-y-3 mt-4">
                {statLevel(HUNGER_COLOR, game.hunger)}
                {statLevel(THIRST_COLOR, game.thirst)}
                {statLevel(HEALTH_COLOR, game.health)}
            </div>
        </div>
    )
}