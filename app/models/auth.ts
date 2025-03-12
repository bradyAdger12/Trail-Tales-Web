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

export interface ResetPasswordRequest {
    token: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
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

export async function forgotPassword(request: ForgotPasswordRequest): Promise<void> {
    try {
        await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/send_password_reset`, request);
    } catch (error) {
        throw error;
    }
}

export async function resetPassword(request: ResetPasswordRequest): Promise<void> {
    try {
        await axios.put(`${import.meta.env.VITE_SERVER_BASE_URL}/reset_password`, request);
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

