import { authApi } from "~/lib/axios";
import type { SurvivalDay } from "./survival_day";
import type { Character, CharacterTemplate } from "./character";
export interface Game {
    id: string;
    days_to_survive: number,
    character: Character
    difficulty: GameDifficulty
    daily_food_loss: number,
    daily_water_loss: number,
    min_distance_in_kilometers: number,
    max_distance_in_kilometers: number
    survival_days: SurvivalDay[]
}

export type GameDifficulty = 'easy' | 'medium' | 'hard'

export interface StartGameRequest {
    difficulty: GameDifficulty
}

export type GameDifficultyOption = {
    [key in GameDifficulty]: {
        food: number,
        water: number,
        health: number,
        dailyFoodLoss: number,
        dailyWaterLoss: number,
        minDistanceInKilometers: number,
        maxDistanceInKilometers: number,
        description: string,
    };
};

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

export async function getGameDifficultyOptions(): Promise<GameDifficultyOption> {
    try {
        const response = await authApi.get('/games/difficulty');
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