// Local imports
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { OAuthAccessTokenWithRefreshToken } from "../types/oauth_access_token"
import type { RefreshTokenGrant } from "../types/refresh_token_grant"

export const refreshTokenGrant = async (
    clientId: number,
    clientSecret: string,
    redirectUri: string,
    refreshToken: string,
): Promise<OAuthAccessTokenWithRefreshToken> =>
    genericWebRequest<OAuthAccessTokenWithRefreshToken, RefreshTokenGrant>(
        "post",
        "/oauth/token",
        {
            postRequestBody: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: "refresh_token",
                redirect_uri: redirectUri,
                refresh_token: refreshToken,
            },
        },
    )
