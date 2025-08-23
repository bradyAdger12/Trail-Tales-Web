import type { Character } from "~/api/character";
import { useAuth } from "~/contexts/AuthContext";
import CharacterStat from "./CharacterStat";
import { useGame } from "~/contexts/GameContext";
import StatLoss from "./StatLoss";

export const HUNGER_COLOR = '#FFC94C'
export const THIRST_COLOR = '#4C9BFF'
export const HEALTH_COLOR = '#FF4C4C'

export default function CharacterStats({ character }: { character: Character }) {
    const { user } = useAuth()
    const { game } = useGame()
    return (
        <div className="w-full">
            <h4>
                {user?.display_name} Stats
            </h4>
            <div className="flex flex-col gap-y-6 mt-4">
                <CharacterStat stat={character.health} color={HEALTH_COLOR} icon="fa-heart" />
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <CharacterStat stat={character.food} color={HUNGER_COLOR} icon="fa-utensils" />
                    </div>
                    <StatLoss stat={character.food} loss={game?.daily_food_loss || 0} />
                </div>
                <div className="flex items-center gap-x-2">
                    <div className="flex-1">
                        <CharacterStat stat={character.water} color={THIRST_COLOR} icon="fa-water" />
                    </div>
                    <StatLoss stat={character.water} loss={game?.daily_water_loss || 0} />
                </div>
            </div>
        </div>
    )
}