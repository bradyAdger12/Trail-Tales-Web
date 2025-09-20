import { useGame } from "~/contexts/GameContext";
import { useQuery } from "@tanstack/react-query";
import { fetchGameNotifications } from "~/api/game";
import GameNotificationsDisplay from "./GameNotificationsDisplay";
import { useEffect, useState } from "react";

export default function GameNotifications() {
    const { game } = useGame()
    const [hoursAgo, setHoursAgo] = useState(24)
    const [page, setPage] = useState(1)
    const limit = 10
    const { data: response, isLoading, refetch } = useQuery({
        queryKey: ['game-notifications'],
        queryFn: async () => {
            return fetchGameNotifications(game?.id || '', limit, page * limit)
        },
    })

    useEffect(() => {
        refetch()
    }, [page])

    return (
        <>
            {isLoading ? <div className="skeleton h-32 w-full"></div> :
                <div className="flex flex-col gap-4">
                    {
                        response?.data && response.data.length === 0
                            ?
                            <div className="text-sm text-base-content/50 italic">No notifications yet.</div>
                            :
                            <div className="w-full md:w-8/12">
                                <GameNotificationsDisplay notifications={response?.data || []} />
                                <div className="join mt-2">
                                    {response?.pagination.total &&
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {Array.from({ length: Math.floor(response?.pagination.total / limit) }).map((_, index) => (
                                                <button className={`join-item btn btn-sm ${page === index + 1 ? 'bg-primary text-primary-content border-2 border-primary' : 'btn-outline'}`} key={index} onClick={() => setPage(index + 1)}>{index + 1}</button>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                    }
                </div>
            }
        </>
    )
}