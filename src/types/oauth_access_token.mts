/**
 * The basic O-Auth access token information from an O-Auth access token that
 * was granted.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#client-credentials-grant))
 */
export interface OAuthAccessToken {
    /**
     * The access token.
     */
    access_token: string
    /**
     * The type of token, this should always be Bearer.
     */
    token_type: string
}

/**
 * An O-Auth access token that was granted response.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#client-credentials-grant))
 */
export interface OAuthAccessTokenResponse extends OAuthAccessToken {
    /**
     * The number of seconds the token will be valid for.
     */
    expires_in: number
}

/**
 * An O-Auth access token with refresh token that was granted response.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#authorization-code-grant))
 */
export interface OAuthAccessTokenWithRefreshTokenResponse
    extends OAuthAccessTokenResponse {
    /** The refresh token. */
    refresh_token: string
}
