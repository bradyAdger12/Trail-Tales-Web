import { authApi } from "~/lib/axios"

interface StravaAuthorizeResponse {
    access_token: string,
    refresh_token: string,
}

export async function authorizeStravaAccount({ code }: { code: string }): Promise<StravaAuthorizeResponse> {
    try {
        const response = await authApi.post('/strava/authorize', { code })
        return response.data
    } catch (e) {
        throw e
    }
}

export async function fetchStravaActivities(): Promise<any> {
    try {
        const response = await authApi.get('/strava/activities?page=1&per_page=10')
        return response.data || []
    } catch (e) {
        throw e
    }
}