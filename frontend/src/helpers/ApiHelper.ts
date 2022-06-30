import {generateAuthorizationHeaderValue, getAccessToken} from "./AuthHelper";
import {MethodAllowed, RequestBodies} from "../types/FetchOptions";

export async function fetchCall(url: string, method: MethodAllowed = "GET", requestBody: RequestBodies|null = null, authorization: boolean = false)
{
    const headers: Headers = new Headers();
    console.log("process env", process.env.REACT_APP_BACKEND_URL);
    if (method === "GET" && requestBody) {
        throw new Error('body is not allowed in GET request case');
    }

    if (requestBody) {
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
                {headers, method, body: JSON.stringify(requestBody)}
            );
    }

    if (!response.ok) {
        const {error} = await response.json();

        throw new Error(error)
    }

    return await response.json();
}
