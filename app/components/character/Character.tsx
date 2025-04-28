import { useAuth } from "~/contexts/AuthContext";
import CharacterStat from "./CharacterStat";
import Items from "../items/Items";
export default function Character() {
    const { user } = useAuth()
    return (
        <div>
            <p className="text-2xl font-bold">{user?.display_name}</p>
            <CharacterStat stat={user?.health} color="text-red-400" bgColor="bg-red-400" icon="fas fa-heart" />
            <div className="bg-gray-800 p-4 rounded-lg mt-5">
                <div className="flex items-center gap-2 mb-3">
                    <i className="fas fa-backpack text-gray-300 text-xl"></i>
                    <h3 className="text-lg font-semibold">Backpack</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Items items={user?.items || []} />
                </div>
                {(!user?.items || user.items.length === 0) && (
                    <p className="text-gray-400 text-center py-1 text-xs">Your backpack is empty</p>
                )}
            </div>
        </div>
    )
}