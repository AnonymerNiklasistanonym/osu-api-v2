/**
 * This exchanges a refresh token obtained from the authorization code grant for a new token.
 * Note: This is for authorization code flow only, not for client credentials type tokens.
 * Refresh token grant is not documented officially
 *
 * https://osu.ppy.sh/docs/index.html#authorization-code-grant
 */
export interface RefreshTokenGrant {
    /**
     * The Client ID you received when you registered
     */
    client_id: number
    /**
     * The client secret of your application
     */
    client_secret: string
    /**
     * This must always be authorization_code (or refresh_token)
     */
    grant_type: "refresh_token"
    /**
     * This must match the redirect_uri of your app when you registered it
     */
    redirect_uri: string
    /**
     * This is the refresh token returned with a token via auth code flow
     */
    refresh_token: string
}
