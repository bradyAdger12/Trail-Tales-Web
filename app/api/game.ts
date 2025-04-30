import { authApi } from "~/lib/axios";
export interface Game {
    id: string;
    created_at: string;
    updated_at: string;
}

/**
 * Start a new game if not exists
 * @returns The game object
 */
export async function startGame(): Promise<Game> {
    try {
        const response = await authApi.post('/games');
        return response.data;
    } catch (error) {
        throw error;
    }
}