import {generateAuthorizationHeaderValue, getAccessToken} from "./AuthHelper";
import {FetchOptions} from "../types/FetchOptions";

export async function fetchCall(url: string, {method = "GET", body = null, authorization = false}: FetchOptions = {method: "GET", body: null, authorization: false})
{
    const headers: Headers = new Headers();

    if (method === "GET" && body) {
        throw new Error('body is not allowed in GET request case');
    }

    if (body) {
        headers.append("Content-Type", "application/json");
    }

    if (authorization) {
        const accessToken = getAccessToken();

        headers.append('Authorization'.toLowerCase(), generateAuthorizationHeaderValue(accessToken));
    }

    let response: Response;

    switch (method) {
        case "GET":
            response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {headers, method});
            break;
        default:
            response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/${url}`,
                {headers, method, body: JSON.stringify(body)}
            );
    }

    if (!response.ok) {
        const {error} = await response.json();

        throw new Error(error)
    }

    return await response.json();
}
