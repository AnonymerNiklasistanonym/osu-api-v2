type OsuApiV2WebRequestErrorMethod = "get" | "post"
type OsuApiV2WebRequestErrorHeaders = { [key: string]: string }

/**
 * An error that should be thrown if an osu api V2 web request fails
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
        this.headers = headers
        if (body !== undefined) {
            this.body = body
        }
    }
}
