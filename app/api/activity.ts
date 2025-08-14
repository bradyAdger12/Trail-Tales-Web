import { authApi } from "~/lib/axios";

export interface Activity {
    id: string,
    name: string,
    distance_in_meters: number,
    elapsed_time_in_seconds: number,
    polyline: string,
    user_id: string,
    source: string,
    source_id: string,
    source_created_at: string,
    created_at: string
}


export async function fetchActivitiesBySourceIds({ sourceIds }: { sourceIds: string[] }): Promise<Activity[]> {
    try {
        const response = await authApi.get(`/activities/imported?source_ids=${sourceIds.join(',')}`);
        return response.data || [];
    } catch (error) {
        throw error;
    }
}

export async function importActivity({ source_id, source }: { source_id: string, source: string }): Promise<any> {
    try {
        const response = await authApi.post(`/activities/import`, { source_id, source })
        return response.data
    } catch (e) {
        throw e
    }
}