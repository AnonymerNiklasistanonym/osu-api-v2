// This is an auto generated file

// Types: AuthorizationCodeGrantResponseFormat, AuthorizationCodeGrantResponseFormat

/**
 * Successful requests will be issued an access token:
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface AuthorizationCodeGrantResponseFormat {
    /**
     * The access token.
     */
    access_token: string
    /**
     * The number of seconds the token will be valid for.
     */
    expires_in: number
    /**
     * The refresh token.
     */
    refresh_token: string
    /**
     * The type of token, this should always be `Bearer`.
     */
    token_type: string
}

/**
 * Successful requests will be issued an access token and a new refresh token:
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface AuthorizationCodeGrantResponseFormat {
    /**
     * The access token.
     */
    access_token: string
    /**
     * The number of seconds the token will be valid for.
     */
    expires_in: number
    /**
     * The refresh token.
     */
    refresh_token: string
    /**
     * The type of token, this should always be `Bearer`.
     */
    token_type: string
}
