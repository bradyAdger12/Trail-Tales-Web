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
    min_distance_in_kilometers: number,
    max_distance_in_kilometers: number
    survival_days: SurvivalDay[]
}

export type GameStats = {
    distance_in_meters: number;
    elapsed_time_in_seconds: number;
    days_rested: number;
    days_not_rested: number;
}

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

export async function getGameNotifications(game_id: string): Promise<GameNotification[]> {
    try {
        const response = await authApi.get(`/games/${game_id}/notifications`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getGameStats(game_id: string): Promise<GameStats> {
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