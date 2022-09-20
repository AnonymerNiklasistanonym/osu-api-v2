import { authorizationCodeGrant } from "./authorization_code_grant"
import { authorizeRedirectUrlGenerator } from "./authorize"
import { clientCredentialsGrant } from "./client_credentials_grant"
import { refreshTokenGrant } from "./refresh_token_grant"

export const oauth = {
    authorizationCodeGrant,
    authorizeRedirectUrlGenerator,
    clientCredentialsGrant,
    refreshTokenGrant,
}
