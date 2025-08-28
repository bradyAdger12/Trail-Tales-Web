import { authApi } from "~/lib/axios";
import type { Activity } from "./activity";

export type SurvivalDayDifficulty = 'easy' | 'medium' | 'hard' | 'rest'
export type Resource = 'food' | 'water' | 'health'
export interface SurvivalDayOption {
    description: string,
    difficulty: SurvivalDayDifficulty
    distance_in_kilometers: number,
    health_change_percentage: number,
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
    completed_difficulty?: SurvivalDayDifficulty,
    day: number
    options: SurvivalDayOption[]
}
export async function fetchSurvivalDay(id: string): Promise<SurvivalDay> {
    try {
        const response = await authApi.get('/survival-days/' + id);
        return response.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}