/**
 * ([Source](https://osu.ppy.sh/docs/index.html#client-credentials-grant))
 */
export interface OAuthAccessToken {
    /**
     * The access token.
     */
    access_token: string
    /**
     * The number of seconds the token will be valid for.
     */
    expires_in: number
    /**
     * The type of token, this should always be Bearer.
     */
    token_type: string
}

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#authorization-code-grant))
 */
export interface OAuthAccessTokenWithRefreshToken extends OAuthAccessToken {
    /** The refresh token. */
    refresh_token: string
}
