export type OsuApiV2WebRequestErrorMethod = "get" | "post"
export type OsuApiV2WebRequestErrorHeaders = Record<string, string>

interface HelpTypeBodyRedact {
    client_secret?: string
}

const redactInformation = (information: string): string =>
    `${information.substring(0, 10)}[redacted]`

/**
 * An error that should be thrown if an osu!api v2 web request fails.
 */
export class OsuApiV2WebRequestError<REQUEST_BODY = string> extends Error {
    public url: string
    public statusText: string
    public statusCode: number
    public method: OsuApiV2WebRequestErrorMethod
    public headers?: Readonly<OsuApiV2WebRequestErrorHeaders>
    public body?: string
    constructor(
        message: string,
        statusCode: number,
        statusText: string,
        url: string,
        method: Readonly<OsuApiV2WebRequestErrorMethod>,
        headers?: Readonly<OsuApiV2WebRequestErrorHeaders>,
        body?: string | Readonly<REQUEST_BODY>,
    ) {
        super(message)
        this.statusCode = statusCode
        this.statusText = statusText
        this.url = url
        this.method = method
        if (headers !== undefined) {
            const tempHeaders = { ...headers }
            // Redact authorization information from header
            if (headers.authorization !== undefined) {
                tempHeaders.authorization = redactInformation(
                    headers.authorization,
                )
            }
            this.headers = { ...tempHeaders }
        }
        if (body !== undefined) {
            if (typeof body === "string") {
                this.body = body
            } else {
                const tempBody = { ...body }
                // Redact client secrets information from request body
                const clientSecret = (
                    tempBody as HelpTypeBodyRedact | undefined
                )?.client_secret
                if (clientSecret !== undefined) {
                    ;(tempBody as HelpTypeBodyRedact).client_secret =
                        redactInformation(clientSecret)
                }
                this.body = JSON.stringify(tempBody)
            }
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
