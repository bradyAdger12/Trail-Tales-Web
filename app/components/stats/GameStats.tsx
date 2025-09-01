import { useQuery } from "@tanstack/react-query";
import { useGame } from "~/contexts/GameContext";
import { getGameStats } from "~/api/game";
import StatDisplay from "./StatDisplay";
import { metersToMiles, secondsToHHMMSS } from "~/lib/conversions";

export default function GameStats() {
    const { game } = useGame()
    const { data, isLoading } = useQuery({
        queryKey: ['game-stats', game.id],
        queryFn: () => getGameStats(game.id)
    })
    return (
        <>
            {isLoading ? <div className="skeleton h-32 w-full"></div> :
                <div className="flex flex gap-4">
                    <StatDisplay title="Total Distance" value={metersToMiles(data?.distance_in_meters || 0).toFixed(2) || '0'} description="Miles" />
                    <StatDisplay title="Total Time" value={secondsToHHMMSS(data?.elapsed_time_in_seconds || 0) || '0'} description="Duration" />
                    <StatDisplay title="Rested" value={data?.days_rested || 0} description="Days" />
                    <StatDisplay title="Adventured" value={data?.days_not_rested || 0} description="Days" />
                </div>
            }
        </>
    )
}