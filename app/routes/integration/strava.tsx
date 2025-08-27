import { useSearchParams, useNavigate } from "react-router";
import { ErrorAlert } from "~/components/alerts/Alerts";
import { APP_NAME } from "~/lib/constants";
import type { Route } from "./+types/strava";
import { authorizeStravaAccount } from "~/api/strava";
import { useAuth } from "~/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { updateMe } from "~/api/auth";
import { useToast } from "~/contexts/ToastContext";
import { useEffect } from "react";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: `Strava - ${APP_NAME}` },
        { name: "description", content: "Strava integration" },
    ];
}

export default function Strava() {
    const { user, setUser } = useAuth()
    const { showToast } = useToast()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code')
   
    const { data } = useQuery({
        queryKey: ['strava_authorization'], queryFn: async () => {
            const stravaAuthorization = await authorizeStravaAccount({ code: code! })
            if (stravaAuthorization) {
                await updateMe({ strava_access_token: stravaAuthorization.access_token, strava_refresh_token: stravaAuthorization.refresh_token })
                setUser({ ...user, strava_access_token: stravaAuthorization.access_token, strava_refresh_token: stravaAuthorization.refresh_token })
                showToast('Strava integration successful', 'success')
            }
            return stravaAuthorization
        },
        enabled: !!code
    })

    useEffect(() => {
        if (!code) {
            navigate(-1)
        }
    }, [])
   
    const error = searchParams.get("error")
    console.log(user?.strava_access_token)
    if (error) {
        return <div><ErrorAlert message={error} /></div>
    } else if (user?.strava_access_token) {
        return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="text-center">
                <i className="fas fa-check-circle text-green-500 text-6xl mb-4"></i>
                <h1 className="text-2xl font-bold mb-2">Strava Integration Successful!</h1>
                <p className="text-gray-600 mb-4">
                    Your Strava account has been successfully connected to {APP_NAME}.
                </p>
                <p className="text-sm text-gray-500">
                    You can now close this window and return to the game.
                </p>
            </div>
        </div>
        )
    }
    
}


