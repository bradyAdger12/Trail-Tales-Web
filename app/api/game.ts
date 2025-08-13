import { authApi } from "~/lib/axios";
import type { SurvivalDay } from "./survival_day";
import type { Character, CharacterTemplate } from "./character";
export interface Game {
    id: string;
    days_to_survive: number,
    character: Character
    survival_days: SurvivalDay[]
}

export interface StartGameRequest {
    weekly_distance_in_kilometers: number
    threshold_pace_minutes: number
    threshold_pace_seconds: number
    character: CharacterTemplate
}

/**
 * Fetch a game
 * @returns The game object
 */
export async function fetchGame(): Promise<Game> {
    try {
        const response = await authApi.get('/games/me');
        return response.data;
    } catch (error) {
        throw error;
    }
}


/**
 * Start a new game if not exists
 * @returns The game object
 */
export async function startGame(request: StartGameRequest): Promise<Game> {
    try {
        const response = await authApi.post('/games/start', request);
        return response.data;
    } catch (error) {
        throw error;
    }
}