import {fetchCall} from "./ApiHelper";
import jwt_decode, {JwtPayload} from "jwt-decode";

const ACCESS_TOKEN_LOCAL_STORAGE_KEY = "accessToken"

export async function hasUserAValidAccessToken() {
    const accessToken = getAccessToken();

    if (accessToken === null) {
        return false;
    }

    try {
        await fetchCall('auth/verify', {authorization: true});

        return true;
    } catch (error) {
        return false;
    }
}

export function generateAuthorizationHeaderValue(accessToken: string): string {
    return `Bearer ${accessToken}`;
}

export function getAccessToken(): string|null {
    return window.localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
}

export function getAccessTokenPayload(): any {
    const accessToken = getAccessToken();

    if (accessToken === null) {
        throw new Error("Access token is missing");
    }

    return jwt_decode(accessToken);
}
