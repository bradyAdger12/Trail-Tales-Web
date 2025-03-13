import { authApi } from "~/lib/axios";
import type { Chapter } from "./chapter";
export interface Story {
    id: string;
    title: string;
    description: string;
    chapters: Chapter[];
    cover_image_url: string;
}

export async function fetchStoryTemplates(): Promise<Story[]> {
    try {
        const response = await authApi.get(`${import.meta.env.VITE_SERVER_BASE_URL}/stories/templates`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchCurrentStory(): Promise<Story> {
    try {
        const response = await authApi.get(`${import.meta.env.VITE_SERVER_BASE_URL}/stories/me`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function startStory(storyTemplateId: string): Promise<Story> {
    try {
        const response = await authApi.post(`${import.meta.env.VITE_SERVER_BASE_URL}/stories/start`, { story_template_id: storyTemplateId });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchStoryById(storyId: string): Promise<Story> {
    try {
        const response = await authApi.get(`${import.meta.env.VITE_SERVER_BASE_URL}/stories/${storyId}`);
        return response.data;
    } catch (error: any) {
        console.log(error.message)
        throw error;
    }
}