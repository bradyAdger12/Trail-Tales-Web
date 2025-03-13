import { metersToMiles } from '~/lib/conversions'
import { type Chapter } from '~/models/chapter'
export default function Chapter({ chapter }: { chapter: Chapter }) {
    return (
        <div>
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>
                <div className="bg-base-200 p-6 rounded-lg mb-8">
                    <p className="text-lg whitespace-pre-line">{chapter.description}</p>
                </div>
                
                <h2 className="text-2xl font-semibold mb-4">Choose Your Next Action</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {chapter.actions.map((action) => (
                        <div key={action.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            <div className="card-body">
                                <h3 className="card-title text-lg">{action.description}</h3>
                                <p className="text-sm mb-2">Difficulty: <span className="font-medium">{action.difficulty}</span></p>
                                <div className="stats stats-vertical shadow">
                                    <div className="stat">
                                        <div className="stat-title">Food</div>
                                        <div className="stat-value text-success">{action.food > 0 ? '+' : ''}{action.food}</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-title">Water</div>
                                        <div className="stat-value text-info">{action.water > 0 ? '+' : ''}{action.water}</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-title">Health</div>
                                        <div className="stat-value text-error">{action.health > 0 ? '+' : ''}{action.health}</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-title">Distance</div>
                                        <div className="stat-value text-primary">{metersToMiles(action.distance_in_meters).toFixed(2)} miles</div>
                                    </div>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary">Choose</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
