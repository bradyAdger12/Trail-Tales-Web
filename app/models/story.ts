import { authApi } from "~/lib/axios";
export interface Story {
    id: string;
    title: string;
    description: string;
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
