import type { Character } from "~/api/character";
import { useAuth } from "~/contexts/AuthContext";
import CharacterStat from "../character/CharacterStat";
import { useGame } from "~/contexts/GameContext";

export const HUNGER_COLOR = '#FFC94C'
export const THIRST_COLOR = '#4C9BFF'
export const HEALTH_COLOR = '#FF4C4C'

export default function CharacterStats({ character }: { character: Character }) {
    const { user } = useAuth()
    const { game } = useGame()    
    return (
        <div>
            <h4>
                {user?.display_name} Stats
            </h4>
            <div className="flex flex-col gap-y-3 mt-4">
                <CharacterStat stat={character.health} color={HEALTH_COLOR} icon="fa-heart" />
                <CharacterStat stat={character.food} color={HUNGER_COLOR} icon="fa-utensils" />
                <CharacterStat stat={character.water} color={THIRST_COLOR} icon="fa-water" />
            </div>
        </div>
    )
}