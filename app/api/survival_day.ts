import { authApi } from "~/lib/axios";
export interface SurvivalDay {
    id: string,
    game_id: string,
    description: string,
    day: number
}
export async function fetchSurvivalDay(id: number): Promise<SurvivalDay> {
    try {
        const response = await authApi.get('/survival_days/' + id);
        return response.data;
    } catch (error) {
        throw error;
    }
}