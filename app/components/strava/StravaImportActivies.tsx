import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { fetchActivitiesBySourceIds, importActivity, type Activity } from "~/api/activity"
import { fetchStravaActivities } from "~/api/strava"
import { validActivities } from "~/lib/validation"
import { distanceLabel, formatDistance, secondsToHHMMSS } from "~/lib/conversions"
import type { Item } from "~/api/item"
import { useAuth } from "~/contexts/AuthContext"

export default function StravaImportActivies({ onImport }: { onImport: ({ activity, items }: { activity: Activity, items: Item[] }) => void }) {
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const [activityBeingImported, setActivityBeingImported] = useState<string | null>(null)
    const { data: stravaActivities, error: stravaActivitiesError, isLoading: isStravaActivitiesLoading } = useQuery({
        retry: false,
        queryKey: ['strava_activities'],
        queryFn: fetchStravaActivities
    })

    const { data: importedActivities = [], error: importedActivitiesError, isLoading: isImportedActivitiesLoading } = useQuery({
        retry: false,
        queryKey: ['imported_activities'],
        queryFn: () => fetchActivitiesBySourceIds({ sourceIds: stravaActivities?.map((activity: any) => activity.id) || [] }),
        enabled: !!stravaActivities?.length
    })

    const { mutate: importStravaActivity, isPending: isImporting } = useMutation({
        mutationFn: ({ source_id, source }: { source_id: string, source: string }) => importActivity({ source_id, source }),
        onMutate: ({ source_id }) => {
            setActivityBeingImported(source_id)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['strava_activities'] })
            queryClient.invalidateQueries({ queryKey: ['imported_activities'] })
            setActivityBeingImported(null)
            onImport(data)
        },
        onError: () => {
            setActivityBeingImported(null)
        }
    })
    if (isStravaActivitiesLoading || isImportedActivitiesLoading) {
        return <div className="flex justify-center items-center h-full"><span className="loading loading-ring loading-2xl" /></div>
    }
    return (
        <>
            <ul className="flex flex-col gap-y-3">
                {stravaActivitiesError && <div className="text-red-500">{stravaActivitiesError.message}</div>}
                {stravaActivities?.length === 0 && <div className="text-gray-400">No Strava activities found. Please check your Strava account and try again.</div>}
                {stravaActivities?.map((activity: any) => (
                    <li
                        key={activity.id}
                        className="flex flex-wrap md:flex-nowrap gap-x-5 gap-y-4 justify-between items-center shadow-xl p-5 rounded-lg cursor-pointer"
                    >
                        <p className="font-bold text-xl">
                            {activity.name} <span
                                className="border border-gray-400 text-gray-400 font-normal text-xs p-1 rounded-lg">
                                {activity.type}
                            </span>
                        </p>
                        <div className="flex flex-wrap md:flex-nowrap gap-x-6 gap-y-2">
                            <div>
                                <p className="font-bold text-sm">
                                    Date
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {new Date(activity.start_date).toDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="font-bold text-sm">
                                    Time
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {secondsToHHMMSS(activity.elapsed_time)}
                                </p>
                            </div>
                            <div>
                                <p className="font-bold text-sm">
                                    Distance
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {formatDistance(activity.distance, user?.unit)} {distanceLabel(user?.unit, 'short')}
                                </p>
                            </div>
                            {!importedActivities?.find(item => item.source_id === activity.id.toString()) && (
                                <button
                                    disabled={!validActivities.includes(activity.type.toLowerCase())}
                                    className="btn btn-sm btn-primary text-base-100 shadow-none"
                                    onClick={() => importStravaActivity({ source_id: activity.id, source: 'strava' })}
                                >
                                    Import
                                    {activityBeingImported === activity.id && <span className="loading loading-spinner loading-xs" />}
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
