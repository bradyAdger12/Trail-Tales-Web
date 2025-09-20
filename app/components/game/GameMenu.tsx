import type { Game } from "~/api/game"
import { useAuth } from "~/contexts/AuthContext"
import CharacterStats from "../character/CharacterVitals"
import { Link } from "react-router"
import BrushedX from "~/assets/images/brushed_x.png"
import Countdown from "../Countdown"
import GameStats from "../stats/GameStats"
import GameNotifications from "../game_notifications/GameNotifications"

export default function GameMenu({ game }: { game: Game }) {
    return (
        <div className="flex flex-col-reverse md:flex-row gap-8 justify-between">
            <div className="flex flex-col gap-8 flex-1">
                <div className="w-full md:w-lg">
                    <CharacterStats character={game.character} />
                </div>
                <GameStats />
                <div>
                    <h4 className="mb-3">
                        Days
                    </h4>
                    <div className="flex-1 flex flex-wrap gap-4 w-full">
                        {game.survival_days.map((item, i) => (
                            <div key={item.id} className={`relative w-22 h-22 rounded-lg border ${i < game.survival_days.length - 1 ? 'border-gray-600' : 'border-primary border-2'}  `}>
                                {i < game.survival_days.length - 1 && <img src={BrushedX} alt="brushed x" className="absolute top-0 right-0 w-full h-full opacity-50 z-10 pointer-events-none" />}
                                <Link to={`/game/${item.game_id}/survival_day/${item.id}`}>
                                    <div key={item.id} className={`w-full h-full relative rounded-lg bg-black/10 flex flex-col items-center justify-center`}>
                                        <p className="font-bold text-md">{item.day}</p>
                                        <p className="text-xs">{new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-4xl">
                    <h4 className="mb-3">
                        Notifications
                    </h4>
                    <GameNotifications />
                </div>
            </div>
            <div>
                <Countdown />
            </div>
        </div>
    )
}