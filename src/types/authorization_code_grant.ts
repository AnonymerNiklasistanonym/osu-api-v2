/**
 * This exchanges a code retrieved by a user (through OAuth signin) for a bearer token.
 * The process of obtaining a code is outside the scope of this library (See docs for more information)
 *
 * https://osu.ppy.sh/docs/index.html#authorization-code-grant
 */
export interface AuthorizationCodeGrant {
    /**
     * The Client ID you received when you registered
     */
    client_id: number
    /**
     * The client secret of your application
     */
    client_secret: string
    /**
     * This is the code obtained via the OAuth token process
     */
    code: string
    /**
     * This must always be authorization_code (or refresh_token)
     */
    grant_type: "authorization_code"
    /**
     * This must match the redirect_uri of your app when you registered it
     */
    redirect_uri: string
}
