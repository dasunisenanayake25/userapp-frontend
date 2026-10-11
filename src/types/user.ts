export interface User {
    id: number;
    fullName: string;
    email: string;
    status: string;
}

export interface UserRequest {
    fullName: string;
    email: string;
}