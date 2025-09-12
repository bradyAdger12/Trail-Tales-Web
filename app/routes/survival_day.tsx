import { useQuery } from "@tanstack/react-query"
import { data, useNavigate, useParams, useSearchParams, type LoaderFunctionArgs } from "react-router"
import { fetchSurvivalDay } from "~/api/survival_day"
import ReactMarkdown from "react-markdown"
import SurvivalDayOption from "~/components/survival-day/SurvivalDayOption"
import { useGame } from "~/contexts/GameContext"
import { fetchGame } from "~/api/game"
import { useEffect } from "react"
import ProtectedRoute from "~/components/ProtectedRoute"
import CharacterStats from "~/components/character/CharacterVitals"
import ActivityMap from "~/components/map/ActivityMap"
import { APP_NAME } from "~/lib/constants"
import StatDisplay from "~/components/stats/StatDisplay"
import { distanceLabel, formatDistance, metersToMiles, secondsToHHMMSS } from "~/lib/conversions"
import { useAuth } from "~/contexts/AuthContext"
export function meta() {
    return [
        { title: `Day - ${APP_NAME}` },
        { name: "description", content: "View your survival day" },
    ];
}

export default function SurivalDayPage() {
    const { survivalDayId } = useParams();
    const { user } = useAuth()
    const { data: survivalDay } = useQuery({
        queryKey: ['survival_day_id', survivalDayId],
        enabled: !!survivalDayId,
        queryFn: () => fetchSurvivalDay(survivalDayId!)
    })
    const { setGame } = useGame()
    const navigate = useNavigate()
    const { data: game, error, isLoading } = useQuery({ queryKey: ['game'], queryFn: fetchGame })
    useEffect(() => {
        if (game) {
            setGame(game)
        }
    }, [game])
    return (
        <ProtectedRoute>
            {!game?.id && !isLoading ? <div>No game found</div> :
                <div className="flex flex-col gap-8">
                    <button className="btn btn-primary max-w-xs" onClick={() => navigate(`/me`)}>
                        <i className="fas fa-arrow-left"></i>
                        Back
                    </button>
                    {game?.character && <div className="flex justify-start w-full md:w-lg"><CharacterStats character={game?.character} /></div>}
                    {!survivalDay ? <div>No survival day found</div> :
                        <div className="flex flex-col gap-7">
                            <div>
                                <h1 className="text-2xl font-bold">Day {survivalDay?.day}</h1>
                                <p className="text-sm text-gray-400 mt-1">
                                    {new Date(survivalDay?.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                {survivalDay?.options
                                    .sort((a, b) => {
                                        const difficultyOrder = { 'easy': 0, 'medium': 1, 'hard': 2, 'rest': 3 };
                                        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                                    })
                                    .map((option) => (
                                        <SurvivalDayOption key={option.difficulty} option={option} completedDifficulty={survivalDay.completed_difficulty} />
                                    ))}
                            </div>
                            {survivalDay?.activity &&
                                <div className="flex flex-col md:flex-row w-full gap-4">
                                    <StatDisplay title="Total Distance" value={formatDistance(survivalDay.activity.distance_in_meters || 0, user?.unit)} description={distanceLabel(user?.unit, 'long')} />
                                    <StatDisplay title="Total Time" value={secondsToHHMMSS(survivalDay.activity.elapsed_time_in_seconds || 0) || '0'} description="Duration" />
                                </div>
                            }
                            {survivalDay?.activity_id && survivalDay.activity?.polyline && <ActivityMap polyline={survivalDay.activity.polyline} />}
                        </div>
                    }
                </div>
            }
        </ProtectedRoute>
    )
}