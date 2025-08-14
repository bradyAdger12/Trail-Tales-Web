import { authApi } from "~/lib/axios";
import type { Activity } from "./activity";
export interface SurvivalDayOption {
    description: string,
    difficulty: 'easy' | 'medium' | 'hard'
    distance_in_kilometers: number,
    chance_to_find_items: number,
    activity_id: string,
    activity: Activity
    health_loss: number
}
export interface SurvivalDay {
    id: string,
    game_id: string,
    description: string,
    day: number
    options: SurvivalDayOption[]
}
export async function fetchSurvivalDay(id: string): Promise<SurvivalDay> {
    try {
        const response = await authApi.get('/survival-days/' + id);
        return response.data;
    } catch (error) {
        throw error;
    }
}