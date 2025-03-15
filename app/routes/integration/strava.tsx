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
                navigate('/profile', { replace: true })
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
    if (error) {
        return <div><ErrorAlert message={error} /></div>
    }
    
}


