import { authApi } from "~/lib/axios";

export interface Chapter {
    id: string;
    title: string;
    actions: Action[];
    description: string;
}

export interface Action {
    id: string;
    description: string;
    difficulty: string,
    food: number,
    health: number,
    distance_in_meters: number
    water: number
}


export async function fetchChapter(chapterId: string): Promise<Chapter> {
    try {
        const response = await authApi.get(`${import.meta.env.VITE_SERVER_BASE_URL}/chapters/${chapterId}`)
        return response.data as Chapter
    } catch (e) {
        throw e
    }
}