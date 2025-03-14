import { useSearchParams, useNavigate, redirect, useLoaderData } from "react-router";
import { ErrorAlert } from "~/components/alerts/Alerts";
import { APP_NAME } from "~/lib/constants";
import type { Route } from "./+types/strava";
import { authorizeStravaAccount } from "~/api/strava";
import { useAuth } from "~/contexts/AuthContext";
import { useEffect } from "react";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: `Strava - ${APP_NAME}` },
        { name: "description", content: "Strava integration" },
    ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    try {
        if (code) {
            const response = await authorizeStravaAccount({ code })
            return { stravaAuthorization: response}
        }
    } catch (error: any) {
        return { error: error.message }
    }
    return { error: 'No code provided' }
}

export default function Strava() {
    const { updateMeRequest } = useAuth()
    const [searchParams] = useSearchParams();
    const { stravaAuthorization } = useLoaderData<typeof clientLoader>()
    useEffect(() => {
        if (stravaAuthorization) {
            console.log(stravaAuthorization)
            updateMeRequest({ strava_access_token: stravaAuthorization.access_token, strava_refresh_token: stravaAuthorization.refresh_token })
        }
    }, [stravaAuthorization])
    const navigate = useNavigate();
    const error = searchParams.get("error");
    if (error) {
        return <div><ErrorAlert message={error} />
            <button className="btn btn-primary mt-4" onClick={() => navigate("/profile", { replace: true })}>Go to Profile</button>
        </div>
    }
}


