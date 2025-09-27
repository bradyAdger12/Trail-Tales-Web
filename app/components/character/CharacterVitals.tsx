import type { Character } from "~/api/character";
import { useAuth } from "~/contexts/AuthContext";
import CharacterStat from "./CharacterVital";
import { useGame } from "~/contexts/GameContext";
import StatLoss from "./StatLoss";
import { FOOD_COLOR, HEALTH_COLOR, WATER_COLOR } from "~/lib/colors";

export default function CharacterVitals({ character }: { character: Character }) {
    const { user } = useAuth()
    const { game } = useGame()

    const totalLoss = (character.food <= 0 ? 5 : 0) + (character.water <= 0 ? 5 : 0)
    const lossHint = totalLoss > 0 && 'You are losing health due to starvation and/or dehydration.'
    return (
        <div className="w-full">
            <h4>
                {user?.display_name} Vitals
            </h4>
            <div className="flex flex-col gap-y-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <CharacterStat stat={character.health} color={HEALTH_COLOR} icon="fa-heart" />
                    </div>
                    <div className="tooltip min-w-19" data-tip={lossHint}>
                        {totalLoss > 0 && <StatLoss stat={character.health} loss={totalLoss} />}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <CharacterStat stat={character.food} color={FOOD_COLOR} icon="fa-utensils" />
                    </div>
                    <div className="min-w-16">
                        <StatLoss stat={character.food} loss={game?.daily_food_loss || 0} />
                    </div>
                </div>
                <div className="flex items-center gap-x-2">
                    <div className="flex-1">
                        <CharacterStat stat={character.water} color={WATER_COLOR} icon="fa-water" />
                    </div>
                    <div className="min-w-16">
                        <StatLoss stat={character.water} loss={game?.daily_water_loss || 0} />
                    </div>
                </div>
            </div>
        </div>
    )
}