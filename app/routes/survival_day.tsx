import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams, useSearchParams } from "react-router"
import { fetchSurvivalDay } from "~/api/survival_day"
import ReactMarkdown from "react-markdown"
import SurvivalDayOption from "~/components/survival-day/SurvivalDayOption"
import { useGame } from "~/contexts/GameContext"
import { fetchGame } from "~/api/game"
import { useEffect } from "react"
import ProtectedRoute from "~/components/ProtectedRoute"
import CharacterStats from "~/components/character/CharacterStats"
import ActivityMap from "~/components/map/ActivityMap"

export default function SurivalDayPage() {
    const { survivalDayId } = useParams();
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
                    {game?.character && <div className="flex justify-start w-lg"><CharacterStats character={game?.character} /></div>}
                    <div>
                        <h1 className="text-2xl font-bold">Day {survivalDay?.day}</h1>
                        <p className="text-sm text-gray-400 mt-1">
                            {new Date(survivalDay?.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                    </div>
                    <div>
                        <ReactMarkdown>{survivalDay?.description}</ReactMarkdown>
                    </div>
                    <div className="flex flex-col gap-4">
                        {survivalDay?.options
                            .sort((a, b) => {
                                const difficultyOrder = { 'easy': 0, 'medium': 1, 'hard': 2 };
                                return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                            })
                            .map((option) => (
                                <SurvivalDayOption key={option.difficulty} option={option} completedDifficulty={survivalDay.completed_difficulty} />
                            ))}
                    </div>
                    {survivalDay?.activity && <ActivityMap polyline={survivalDay.activity.polyline} />}
                </div>
            }
        </ProtectedRoute>
    )
}