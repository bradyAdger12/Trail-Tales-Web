import { authApi } from "~/lib/axios";
import type { Activity } from "./activity";
export interface SurvivalDayOption {
    description: string,
    difficulty: 'easy' | 'medium' | 'hard'
    distance_in_kilometers: number,
    chance_to_find_items: number,
    item_gain_percentage: number,
    health_loss: number
}
export interface SurvivalDay {
    id: string,
    game_id: string,
    activity_id?: string,
    activity?: Activity
    description: string,
    created_at: string,
    completed_difficulty?: 'easy' | 'medium' | 'hard',
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