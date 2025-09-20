import { useQuery } from "@tanstack/react-query";
import { useGame } from "~/contexts/GameContext";
import { fetchGameStats } from "~/api/game";
import StatDisplay from "./StatDisplay";
import { distanceLabel, formatDistance, metersToMiles, secondsToHHMMSS } from "~/lib/conversions";
import { useAuth } from "~/contexts/AuthContext";

export default function GameStats() {
    const { game } = useGame()
    const { user } = useAuth()
    const { data, isLoading } = useQuery({
        queryKey: ['game-stats', game?.id],
        queryFn: () => fetchGameStats(game?.id || ''),
    })
    return (
        <>
            {isLoading ? <div className="skeleton h-32 w-full"></div> :
                <div className="flex flex-col md:flex-row w-full gap-4">
                    <StatDisplay title="Total Distance" value={formatDistance(data?.distance_in_meters || 0, user?.unit)} description={distanceLabel(user?.unit, 'long')} />
                    <StatDisplay title="Total Time" value={secondsToHHMMSS(data?.elapsed_time_in_seconds || 0) || '0'} description="Duration" />
                    <StatDisplay title="Rested" value={data?.days_rested || 0} description="Days" />
                    <StatDisplay title="Explored" value={data?.days_not_rested || 0} description="Days" />
                </div>
            }
        </>
    )
}