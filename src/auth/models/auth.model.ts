export interface LoginAuthData {
    token: string;
    expiresIn: number;
    userId: string;
    name: string;
    email: string;
    created: Date;
} 

export interface RegisterAuthData {
    id: string;
    name: string;
    email: string;
    password: string;
    created: Date;
}
