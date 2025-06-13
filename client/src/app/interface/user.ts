export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    image: string,
    roles: string[],
    deletedAt: any
}

export interface UserResponse {
    message: string,
    status: number,
    user: User,
    token: string
}
