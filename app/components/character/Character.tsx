import { useAuth } from "~/contexts/AuthContext";
import CharacterStat from "./CharacterStat";

export default function Character() {
    const { user } = useAuth()
    return (
        <div>
            <p className="text-2xl font-bold">{user?.display_name}</p>
            <CharacterStat stat={user?.health} color="text-red-400" bgColor="bg-red-400" icon="fas fa-heart" />
            <CharacterStat stat={user?.hunger} color="text-yellow-400" bgColor="bg-yellow-400" icon="fas fa-utensils" />
            <CharacterStat stat={user?.thirst} color="text-blue-400" bgColor="bg-blue-400" icon="fas fa-tint" />
        </div>
    )
}