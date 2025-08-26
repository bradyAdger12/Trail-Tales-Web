import axios from "axios";

export interface ErrorMessage {
    status: number;
    message: string;
}

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
const timeout = 15000;

export const api = axios.create({
    baseURL,
    timeout
});

export const authApi = axios.create({
    baseURL,
    timeout
});

