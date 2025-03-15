import { useAuth } from "~/contexts/AuthContext";
import CharacterStat from "./CharacterStat";
import { metersToMiles } from "~/lib/conversions";

export default function Character() {
    const { user } = useAuth()
    return (
        <div>
            <p className="text-2xl font-bold">{user?.display_name}</p>
            <CharacterStat stat={user?.health} color="text-red-400" bgColor="bg-red-400" icon="fas fa-heart" />
            <div className="bg-gray-800 p-4 rounded-lg mt-5">
                <h3 className="text-lg font-semibold mb-3">Backpack</h3>
                <div className="grid grid-cols-2 gap-2">
                    {user?.items?.map((item) => (
                        <div className="tooltip" data-tip={`${item.benefit === 'health' ? '+' + item.value + ' health' : 'Reduces all distances by ' + metersToMiles(item.value).toFixed(2) + ' miles'}`}>
                            <button
                                key={item.id}
                                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 p-2 rounded-md transition-colors cursor-pointer text-xs"
                                onClick={() => console.log(`Using item: ${item.name}`)}
                            >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-gray-800 ${item.benefit === 'health' ? 'text-red-400' : 'text-blue-400'}`}>
                                    <i className={`fas ${item.benefit === 'health' ? 'fa-heart' : 'fa-running'}`}></i>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="font-medium">{item.name}</span>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
                {(!user?.items || user.items.length === 0) && (
                    <p className="text-gray-400 text-center py-1 text-xs">Your backpack is empty</p>
                )}
            </div>
        </div>
    )
}