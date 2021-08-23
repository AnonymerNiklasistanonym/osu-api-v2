export class OsuApiV2WebRequestError extends Error {
    public url: string
    public statusText: string
    public statusCode: number
    constructor(
        statusCode: number,
        statusText: string,
        url: string,
        message: string,
    ) {
        super()
        this.statusCode = statusCode
        this.statusText = statusText
        this.url = url
        this.message = message
    }
}
