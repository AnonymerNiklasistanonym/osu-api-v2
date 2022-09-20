import { clientCredentialsGrant } from "./client_credentials_grant"
import { authorizationCodeGrant } from "./authorization_code_grant"

export const oauth = {
    authorizationCodeGrant,
    clientCredentialsGrant,
}
