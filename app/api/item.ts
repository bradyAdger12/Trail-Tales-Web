import { authApi } from "~/lib/axios";

export interface Item {
    id: string;
    name: string;
    description: string;
    value: number
    benefit: 'health' | 'distance'
}

export async function useItem(itemId: string) {
    try {
        await authApi.post(`/items/${itemId}/use`)
    } catch (error: any) {
        throw error
    }
}
