import {fetchCall} from "./ApiHelper";
import jwt_decode from "jwt-decode";
import {SiweMessage} from "siwe";
import {Signer} from "ethers";

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

export async function createSiweMessage(signer: Signer, nonce: string): Promise<SiweMessage> {
    return new SiweMessage({
        domain: window.location.host,
        address: await signer.getAddress(),
        statement: 'Sign in with Ethereum',
        uri: window.location.origin,
        version: '1',
        chainId: 4,
        nonce: nonce
    });
}
