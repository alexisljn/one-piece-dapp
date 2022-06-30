import {SiweMessage} from "siwe";

export type FetchOptions =  {
    method?: MethodAllowed
    body?: RequestBodies
    authorization?: boolean
};

export type MethodAllowed = 'GET' | 'POST' | 'DELETE'

export type RequestBodies = GetTokenRequestBody | null;

export type GetTokenRequestBody = {
    message: SiweMessage,
    signature: string
};
