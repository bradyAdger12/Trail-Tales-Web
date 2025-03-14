import axios from "axios";
import { api, authApi } from "~/lib/axios";
export interface User {
    id: string;
    health: number;
    hunger: number;
    thirst: number;
    display_name: string;
    avatar_file_key: string
    strava_access_token: string;
    strava_refresh_token: string;
    weekly_distance_in_kilometers: number;
    threshold_pace_seconds: number;
    email: string;
}
export interface SignUpRequest {
    display_name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ContactRequest {
    name: string;
    email: string;
    message: string;
}

export interface RefreshTokenResponse {
    token: string;
    refreshToken: string;
}

export async function signUp(request: SignUpRequest): Promise<void> {
    try {
        await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/register`, request);
        await authLogin({
            email: request.email,
            password: request.password
        })
    } catch (error) {
        throw error;
    }
}

export async function getRefreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/refresh`, {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            },
        });
        return response.data as RefreshTokenResponse
    } catch (error) {
        throw error
    }
}

export async function forgotPassword(request: ForgotPasswordRequest): Promise<void> {
    try {
        await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/send_password_reset`, request);
    } catch (error) {
        throw error;
    }
}

export async function resetPassword(request: ResetPasswordRequest): Promise<void> {
    try {
        await api.put(`${import.meta.env.VITE_SERVER_BASE_URL}/reset_password`, request);
    } catch (error) {
        throw error;
    }
}
export async function authLogin(request: LoginRequest): Promise<LoginResponse> {
    try {
        const response = await api.post(`/login`, request);
        return response.data as LoginResponse
    } catch (error) {
        throw error;
    }
}

export async function sendContact(request: ContactRequest): Promise<void> {
    try {
        await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/contact`, request);
    } catch (error) {
        throw error;
    }
}

export async function fetchMe(): Promise<User> {
    try {
        const response = await authApi.get(`${import.meta.env.VITE_SERVER_BASE_URL}/user/me`);
        return response.data as User;
    } catch (error) {
        throw error;
    }
}

export async function updateMe(request: Partial<User>): Promise<User> {
    try {
        const response = await authApi.put(`${import.meta.env.VITE_SERVER_BASE_URL}/user/me`, request);
        return response.data as User;
    } catch (error) {
        throw error;
    }
}
