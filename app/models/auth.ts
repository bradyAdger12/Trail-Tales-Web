import axios from "axios";
export interface User {
    id: string;
    display_name: string;
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
export async function signUp(request: SignUpRequest): Promise<void> {
    try {
        await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/register`, request);
        await authLogin({
            email: request.email,
            password: request.password
        })
    } catch (error) {
        throw error;
    }
}

export async function authLogin(request: LoginRequest): Promise<LoginResponse> {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/login`, request);
        return response.data as LoginResponse
    } catch (error) {
        throw error;
    }
}

