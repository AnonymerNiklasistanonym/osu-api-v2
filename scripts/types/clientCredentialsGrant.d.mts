// This is an auto generated file

// Types: ClientCredentialsGrantResponseFormat

/**
 * Successful requests will be issued an access token:
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface ClientCredentialsGrantResponseFormat {
    /**
     * The access token.
     */
    access_token: string
    /**
     * The number of seconds the token will be valid for.
     */
    expires_in: number
    /**
     * The type of token, this should always be `Bearer`.
     */
    token_type: string
}
