import { authorizationCodeGrant } from "./authorization_code_grant.mjs"
import { authorizeRedirectUrlGenerator } from "./authorize.mjs"
import { clientCredentialsGrant } from "./client_credentials_grant.mjs"
import { refreshTokenGrant } from "./refresh_token_grant.mjs"

export const oauth = {
    authorizationCodeGrant,
    authorizeRedirectUrlGenerator,
    clientCredentialsGrant,
    refreshTokenGrant,
}
