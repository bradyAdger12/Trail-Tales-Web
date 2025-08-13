import { authApi } from "~/lib/axios";
export interface CharacterTemplate {
    name: string;
    description: string;
    health: number;
    food: number;
    water: number;
    color: string;
}

export interface Character {
    id: string
    name: string;
    description: string;
    weekly_distance_in_kilometers: number;
    threshold_pace_seconds: number;
    health: number;
    food: number;
    water: number;
}


export const AVAILABLE_CHARACTERS: CharacterTemplate[] = [
    {
        name: "The Survivalist",
        description: "A seasoned survivalist with a knack for finding food and water in the wilderness.",
        health: 75,
        food: 90,
        water: 85,
        color: "#10b981",
    },
    {
        name: "The Explorer",
        description: "An adventurous explorer who moves quickly but burns through resources faster.",
        health: 85,
        food: 60,
        water: 70,
        color: "#3b82f6",
    },
    {
        name: "The Hunter",
        description: "A skilled hunter who excels at finding food but struggles with water conservation.",
        health: 80,
        food: 95,
        water: 50,
        color: "#ef4444",
    },
    {
        name: "The Medic",
        description: "A former field medic with excellent health management but limited survival skills.",
        health: 95,
        food: 55,
        water: 60,
        color: "#ec4899",
    },
    {
        name: "The Scout",
        description: "A lightweight traveler who conserves water well but has limited food-finding abilities.",
        health: 70,
        food: 50,
        water: 90,
        color: "#8b5cf6",
    },
    {
        name: "The Nomad",
        description: "A well-balanced wanderer with moderate skills across all survival aspects.",
        health: 75,
        food: 75,
        water: 75,
        color: "#f59e0b",
    },
]