import { useState } from 'react'
import { useToast } from '~/contexts/ToastContext'
import { metersToMiles } from '~/lib/conversions'
import { selectAction, type Action, type Chapter } from '~/api/chapter'
import Character from '../character/Character'
import { useDialog } from '~/contexts/DialogContext'
import StravaImportActivies from '../strava/StravaImportActivies'
import { ImportActivityDialog } from '../dialogs/ImportActivityDialog'
import type { Activity } from '~/api/activity'
import { useQueryClient } from '@tanstack/react-query'
export default function Chapter({ chapter }: { chapter: Chapter }) {
    const { showToast } = useToast()
    const { openDialog, closeDialog } = useDialog()
    const queryClient = useQueryClient()
    const [actions, setActions] = useState(chapter.actions)
    async function select(action: Action) {
        if (chapter.activity_id) {
            return
        }
        action.selected = true
        actions.forEach((item) => {
            if (item.id !== action.id) {
                item.selected = false
            }
        })
        setActions([...actions])
        try {
            await selectAction(chapter.id, action.id)
            openDialog(<ImportActivityDialog onImport={handleImport} />)
        } catch (e: any) {
            console.log(e)
            showToast(e.message, 'error')
        }
    }
    function handleImport(activity: Activity) {
        chapter.activity_id = activity.id
        queryClient.invalidateQueries({ queryKey: ['chapter', chapter.id] })
        closeDialog()
    }
    return (
        <div>
            <div className="p-4 flex flex-wrap md:flex-nowrap gap-10">
                <Character />
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">{chapter.title}</h1>
                    <div className="bg-base-200 p-6 rounded-lg mb-8">
                        <p className="text-sm md:text-lg whitespace-pre-line">{chapter.description}</p>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">Choose Your Next Action</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {actions.map((action) => (
                            <div key={action.id} onClick={() => select(action)} className={`card bg-base-100 border-2 ${action.selected && 'border-green-400'} shadow-xl transition-all duration-300 hover:scale-102 cursor-pointer`}>
                                <div className="card-body">
                                    <h3 className="card-title text-lg">{action.description}</h3>
                                    <p className="text-sm mb-2">Difficulty: <span className="font-medium">{action.difficulty}</span></p>
                                    <div>
                                        <div className="flex gap-5">
                                            <div>
                                                <div className="stat-title flex items-center gap-1">
                                                    <i className="fas fa-heart"></i> Health
                                                </div>
                                                <div className="stat-value text-red-400 text-lg">{action.health}</div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="stat-title">Distance</div>
                                            <div className="stat-value text-primary">{metersToMiles(action.distance_in_meters).toFixed(2)} miles</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
