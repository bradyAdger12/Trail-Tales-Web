import { authApi } from "~/lib/axios";
import type { SurvivalDay } from "./survival_day";
import type { Character, CharacterTemplate } from "./character";
import type { Activity } from "./activity";
export interface Game {
    id: string;
    days_to_survive: number,
    character: Character
    difficulty: GameDifficulty
    daily_food_loss: number,
    daily_water_loss: number,
    min_duration_in_seconds: number,
    max_duration_in_seconds: number,
    status: GameStatus
    survival_days: SurvivalDay[]
}

export type GameStats = {
    distance_in_meters: number;
    elapsed_time_in_seconds: number;
    days_rested: number;
    days_not_rested: number;
}

export type GameStatus = 'active' | 'lost' | 'won'

export type GameDifficulty = 'easy' | 'medium' | 'hard'

export interface StartGameRequest {
    difficulty: GameDifficulty
}

export interface GameNotification {
    id: string;
    game_id: string;
    description: string;
    day: number;
    seen: boolean;
    resource: string;
    resource_change_as_percent: number;
    created_at: string;
    updated_at: string;
}

export type GameDifficultyOption = {
    [key in GameDifficulty]: {
        food: number,
        water: number,
        health: number,
        dailyFoodLoss: number,
        dailyWaterLoss: number,
        minDurationInSeconds: number,
        maxDurationInSeconds: number,
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

export async function fetchGameDifficultyOptions(): Promise<GameDifficultyOption> {
    try {
        const response = await authApi.get('/games/difficulty');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchUnseenGameNotifications(game_id: string): Promise<GameNotification[]> {
    try {
        const response = await authApi.get(`/games/${game_id}/notifications/unseen`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchGameNotifications(game_id: string, limit: number, offset: number): Promise<{ pagination: { total: number }, data: GameNotification[] }> {
    try {
        const response = await authApi.get(`/games/${game_id}/notifications`, {
            params: {
                limit,
                offset
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchGameStats(game_id: string): Promise<GameStats> {
    try {
        const response = await authApi.get(`/games/${game_id}/stats`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function setSeenNotifications(game_id: string): Promise<void> {
    try {
        await authApi.put(`/games/${game_id}/notifications/seen`);
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

export async function resetGame(game_id: string): Promise<void> {
    try {
        await authApi.put(`/games/${game_id}/reset`);
    } catch (error) {
        throw error;
    }
}
