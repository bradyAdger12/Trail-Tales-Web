import { useSearchParams, useNavigate, Link } from "react-router";
import { ErrorAlert } from "~/components/alerts/Alerts";
import { APP_NAME } from "~/lib/constants";
import type { Route } from "./+types/strava";
import { authorizeStravaAccount, fetchStravaActivities, importStravaActivity } from "~/api/strava";
import { useAuth } from "~/contexts/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { metersToMiles, secondsToHHMMSS } from "~/lib/conversions";
import { fetchActivitiesBySourceIds } from "~/api/activity";
import { validActivities } from "~/lib/validation";
import { useState } from "react";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: `Strava - ${APP_NAME}` },
        { name: "description", content: "Strava integration" },
    ];
}

export default function Strava() {
    const { updateMeRequest } = useAuth()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code')
    const [activityBeingImported, setActivityBeingImported] = useState<string | null>(null)
    const { data } = useQuery({
        queryKey: ['strava_authorization'], queryFn: async () => {
            const stravaAuthorization = await authorizeStravaAccount({ code: code! })
            if (stravaAuthorization) {
                await updateMeRequest({ strava_access_token: stravaAuthorization.access_token, strava_refresh_token: stravaAuthorization.refresh_token })
                navigate('/integration/strava', { replace: true, state: { refresh: true } })
            }
            return stravaAuthorization
        },
        enabled: !!code
    })
    const { data: stravaActivities, error: stravaActivitiesError, isLoading: isStravaActivitiesLoading } = useQuery({
        retry: false,
        queryKey: ['strava_activities'],
        queryFn: fetchStravaActivities,
        enabled: !code
    })

    const { data: importedActivities, error: importedActivitiesError, isLoading: isImportedActivitiesLoading } = useQuery({
        retry: false,
        queryKey: ['imported_activities'],
        queryFn: () => fetchActivitiesBySourceIds({ sourceIds: stravaActivities?.map((activity: any) => activity.id) || [] }),
        enabled: !!stravaActivities?.length
    })

    const { mutate: importActivity, isPending: isImporting } = useMutation({
        mutationFn: ({ activityId }: { activityId: string }) => importStravaActivity({ activityId }),
        onMutate: ({ activityId }) => {
            setActivityBeingImported(activityId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['imported_activities'] })
            setActivityBeingImported(null)
        },
        onError: () => {
            setActivityBeingImported(null)
        }
    })
    const error = searchParams.get("error") || stravaActivitiesError?.message;
    if (error) {
        return <div><ErrorAlert message={error} /></div>
    } else if (isStravaActivitiesLoading || isImportedActivitiesLoading) {
        return <div className="flex justify-center items-center h-full mt-24"><span className="loading loading-ring loading-2xl" /></div>
    }
    return (
        <>
            <h2 className="mb-4">Strava Activities</h2>
            <ul className="flex flex-col gap-y-3">
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
                                    {metersToMiles(activity.distance).toFixed(2)} mi
                                </p>
                            </div>
                            {!importedActivities?.find(item => item.source_id === activity.id.toString()) ? (
                            <button
                                disabled={!validActivities.includes(activity.type.toLowerCase())}
                                className="btn btn-sm btn-primary text-base-100 shadow-none" 
                                onClick={() => importActivity({ activityId: activity.id })}
                            >
                                Import
                                {activityBeingImported === activity.id && <span className="loading loading-spinner loading-xs" />}
                            </button>
                        ) : (
                            <Link
                                to={`/activity/${importedActivities?.find(item => item.source_id === activity.id.toString())?.id}`}
                                className="btn btn-sm btn-success text-base-100"
                            >
                                View
                            </Link>
                        )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}


