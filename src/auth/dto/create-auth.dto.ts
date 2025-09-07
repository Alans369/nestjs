export class CreateAuthDto {
    username: string;
    password: string;
}

export class AuthResponse {
    access_token: string;
    refresh_token: string;
}
