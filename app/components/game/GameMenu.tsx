import type { Game } from "~/api/game"
import { useAuth } from "~/contexts/AuthContext"
import CharacterStats from "./CharacterStats"
import { Link } from "react-router"

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
                        <Link to={`/game/${item.game_id}/survival_day/${item.id}`}>
                            <div key={item.id} className={`w-20 h-20 relative rounded-lg bg-black/20 flex items-center justify-center ${i === 1 && 'hover:bg-primary transition-all cursor-pointer'}`}>
                                {item.day}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}