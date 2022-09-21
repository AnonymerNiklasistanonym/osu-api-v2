// Local imports
import { baseUrl, baseUrlApiV2 } from "../types/api_info"
import { OsuApiV2WebRequestError } from "./custom_errors"
import { urlParameterGenerator } from "./url_parameter_generator"
// Type imports
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { UrlParameter } from "./url_parameter_generator"

export const genericWebRequestUrlGenerator = (
    path: string,
    urlParameters?: readonly UrlParameter[],
    apiCall?: boolean,
) =>
    `${apiCall === true ? baseUrlApiV2 : baseUrl}${path}${urlParameterGenerator(
        urlParameters,
    )}`

export const genericWebRequest = async <
    RETURN_TYPE,
    REQUEST_BODY extends object = Record<string, string>,
>(
    method: "get" | "post",
    path: string,
    apiCall: boolean,
    urlParameters?: readonly UrlParameter[],
    authorizationAccessToken?: Readonly<OAuthAccessToken>,
    requestBody?: Readonly<REQUEST_BODY>,
): Promise<RETURN_TYPE> => {
    const body =
        requestBody !== undefined ? JSON.stringify(requestBody) : undefined
    let headers
    if (authorizationAccessToken !== undefined) {
        headers = {
            Authorization: `${authorizationAccessToken.token_type} ${authorizationAccessToken.access_token}`,
            "Content-Type": "application/json",
        }
    } else if (requestBody !== undefined) {
        headers = { "Content-Type": "application/json" }
    }
    const res = await fetch(
        genericWebRequestUrlGenerator(path, urlParameters, apiCall),
        {
            body,
            headers,
            method,
        },
    )
    if (res.status !== 200) {
        throw new OsuApiV2WebRequestError<REQUEST_BODY>(
            `Bad web request (${res.status}=${res.statusText}, url=${res.url})`,
            res.status,
            res.statusText,
            res.url,
            method,
            headers,
            requestBody,
        )
    }
    return (await res.json()) as RETURN_TYPE
}
