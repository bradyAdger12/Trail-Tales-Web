import type { Game } from "~/api/game"
import { useAuth } from "~/contexts/AuthContext"
import CharacterStats from "./CharacterStats"
import { Link } from "react-router"
import BrushedX from "~/assets/images/brushed_x.png"

export default function GameMenu({ game }: { game: Game }) {

    return (
        <div className="flex flex-col gap-8">
            <div className="w-lg">
                <CharacterStats character={game.character} />
            </div>
            <div>
                <h4 className="mb-3">
                    Days
                </h4>
                <div className="flex-1 flex flex-wrap md:flex-nowrap gap-4">
                    {game.survival_days.map((item, i) => (
                        <div className="relative w-20 h-20">
                            { i < game.survival_days.length - 1 && <img src={BrushedX} alt="brushed x" className="absolute top-0 right-0 w-full h-full opacity-50" />}
                            <Link to={`/game/${item.game_id}/survival_day/${item.id}`}>
                                <div key={item.id} className={`w-20 h-20 relative rounded-lg bg-black/20 flex items-center justify-center`}>
                                    <span className="text-white font-bold text-md">{item.day}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}