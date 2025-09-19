import type { Character } from "~/api/character";
import { useAuth } from "~/contexts/AuthContext";
import CharacterStat from "./CharacterVital";
import { useGame } from "~/contexts/GameContext";
import StatLoss from "./StatLoss";
import { FOOD_COLOR, HEALTH_COLOR, WATER_COLOR } from "~/lib/colors";

export default function CharacterVitals({ character }: { character: Character }) {
    const { user } = useAuth()
    const { game } = useGame()
    return (
        <div className="w-full">
            <h4>
                {user?.display_name} Vitals
            </h4>
            <div className="flex flex-col gap-y-6 mt-4">
                <CharacterStat stat={character.health} color={HEALTH_COLOR} icon="fa-heart" />
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <CharacterStat stat={character.food} color={FOOD_COLOR} icon="fa-utensils" />
                    </div>
                    <StatLoss stat={character.food} loss={game?.daily_food_loss || 0} />
                </div>
                <div className="flex items-center gap-x-2">
                    <div className="flex-1">
                        <CharacterStat stat={character.water} color={WATER_COLOR} icon="fa-water" />
                    </div>
                    <StatLoss stat={character.water} loss={game?.daily_water_loss || 0} />
                </div>
            </div>
        </div>
    )
}