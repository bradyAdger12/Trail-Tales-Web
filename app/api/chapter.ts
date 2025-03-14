import { authApi } from "~/lib/axios";

export interface Chapter {
    id: string;
    title: string;
    actions: Action[];
    description: string;
}

export interface Action {
    id: string;
    description: string,
    selected: boolean,
    difficulty: string,
    food: number,
    health: number,
    distance_in_meters: number
    water: number
}


export async function fetchChapter(chapterId: string): Promise<Chapter> {
    try {
        const response = await authApi.get(`/chapters/${chapterId}`)
        return response.data as Chapter
    } catch (e) {
        throw e
    }
}

export async function selectAction(chapterId: string, actionId: string): Promise<Action> {
    try {
        const response = await authApi.put(`/chapters/${chapterId}/select_action/${actionId}`)
        return response.data as Action
    } catch (e) {
        throw e
    }
}