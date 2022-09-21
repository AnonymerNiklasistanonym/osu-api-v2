// Local imports
import { baseUrl, baseUrlApiV2 } from "../types/api_info"
import { OsuApiV2WebRequestError } from "./custom_errors"
import { urlParameterGenerator } from "./url_parameter_generator"
// Type imports
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { UrlParameter } from "./url_parameter_generator"

/**
 * Optional generic web request URL generator options.
 */
export interface GenericWebRequestUrlGeneratorOptions {
    /** URL is an API call. */
    apiCall?: boolean
    /** URL parameters. */
    urlParameters?: readonly UrlParameter[]
}

export const genericWebRequestUrlGenerator = (
    path: string,
    options?: Readonly<GenericWebRequestUrlGeneratorOptions>,
) =>
    `${
        options?.apiCall === true ? baseUrlApiV2 : baseUrl
    }${path}${urlParameterGenerator(options?.urlParameters)}`

/**
 * Optional generic web request options.
 */
export interface GenericWebRequestOptions<POST_REQUEST_BODY>
    extends GenericWebRequestUrlGeneratorOptions {
    /**
     * OAuthAccessToken to add an Authorization header.
     */
    authorizationAccessToken?: Readonly<OAuthAccessToken>
    /**
     * (Post-)Request JSON data.
     */
    postRequestBody?: Readonly<POST_REQUEST_BODY>
}

export const genericWebRequest = async <
    RETURN_TYPE,
    REQUEST_BODY extends object = Record<string, string>,
>(
    method: "get" | "post",
    path: string,
    options?: Readonly<GenericWebRequestOptions<REQUEST_BODY>>,
): Promise<RETURN_TYPE> => {
    let body
    if (method === "post" && options?.postRequestBody !== undefined) {
        body = JSON.stringify(options?.postRequestBody)
    }
    let headers
    if (options?.authorizationAccessToken !== undefined) {
        headers = {
            Authorization: `${options?.authorizationAccessToken.token_type} ${options?.authorizationAccessToken.access_token}`,
            "Content-Type": "application/json",
        }
    } else if (method === "post" && options?.postRequestBody !== undefined) {
        headers = { "Content-Type": "application/json" }
    }
    const res = await fetch(genericWebRequestUrlGenerator(path, options), {
        body,
        headers,
        method,
    })
    if (res.status !== 200) {
        throw new OsuApiV2WebRequestError<REQUEST_BODY>(
            `Bad web request (${res.status}=${res.statusText}, url=${res.url})`,
            res.status,
            res.statusText,
            res.url,
            method,
            headers,
            options?.postRequestBody,
        )
    }
    return (await res.json()) as RETURN_TYPE
}
