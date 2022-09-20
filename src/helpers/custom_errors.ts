export type OsuApiV2WebRequestErrorMethod = "get" | "post"
export type OsuApiV2WebRequestErrorHeaders = Record<string, string>

/**
 * An error that should be thrown if an osu!api v2 web request fails.
 */
export class OsuApiV2WebRequestError extends Error {
    public url: string
    public statusText: string
    public statusCode: number
    public method: OsuApiV2WebRequestErrorMethod
    public headers: OsuApiV2WebRequestErrorHeaders
    public body?: string
    constructor(
        message: string,
        statusCode: number,
        statusText: string,
        url: string,
        method: OsuApiV2WebRequestErrorMethod,
        headers: OsuApiV2WebRequestErrorHeaders,
        body?: string,
    ) {
        super(message)
        this.statusCode = statusCode
        this.statusText = statusText
        this.url = url
        this.method = method
        if (headers.authorization !== undefined) {
            this.headers = {
                ...headers,
                authorization:
                    headers.authorization.substring(0, 20) + "***redacted***",
            }
        } else {
            this.headers = headers
        }
        if (body !== undefined) {
            this.body = body
        }
    }
}

/**
 * Error codes for internal or logic errors.
 */
export enum OsuApiV2ErrorCode {
    /**
     * Thrown if something was not found like for example the osu!api v2
     * returns an empty array for found users but it is expected to return
     * one user.
     */
    NOT_FOUND = "NOT_FOUND",
    /**
     * Thrown if the API returns something that is not the expected type.
     */
    UNEXPECTED_RETURN_TYPE = "UNEXPECTED_RETURN_TYPE",
}

/**
 * An error that should be thrown if there if a logic or internal error was
 * detected.
 */
export class OsuApiV2Error extends Error {
    public code: OsuApiV2ErrorCode
    constructor(message: string, code: OsuApiV2ErrorCode) {
        super(message)
        this.code = code
    }
}
