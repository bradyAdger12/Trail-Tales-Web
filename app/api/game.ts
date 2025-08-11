import type { GameDifficulty } from "~/contexts/GameConfigContext";
import { authApi } from "~/lib/axios";
import type { SurvivalDay } from "./survival_day";
export interface Game {
    id: string;
    days_to_survive: number
    survival_days: SurvivalDay[]
    difficulty: string
    health: number
    thirst: number
    hunger: number
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
export async function startGame(difficulty: GameDifficulty): Promise<Game> {
    try {
        const response = await authApi.post('/games/start', { difficulty });
        return response.data;
    } catch (error) {
        throw error;
    }
}