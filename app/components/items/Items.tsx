import type { Item } from "~/api/auth";
import { metersToMiles } from "~/lib/conversions";

export default function Items({ items }: { items: Item[] }) {
    return (
        <>
            {items?.map((item) => (
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
            ))
            }
        </>
    )
}
