// Type imports
import type { GrantType } from "./grant_type.mjs"
import type { OAuthAuthorizeScope } from "./oauth_scopes.mjs"

/**
 * The client credential flow provides a way for developers to get access tokens that do not have associated user permissions; as such, these tokens are considered as guest users.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#client-credentials-grant))
 */
export interface ClientCredentialsGrant {
    /**
     * The Client ID you received when you registered.
     */
    client_id: number
    /**
     * The client secret of your application.
     */
    client_secret: string
    /**
     * This must always be client_credentials.
     */
    grant_type: GrantType.CLIENT_CREDENTIALS
    /**
     * Must be public; other scopes have no meaningful effect.
     */
    scope: OAuthAuthorizeScope.PUBLIC
}
