// Local imports
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { EndpointSearchUserResponse } from "../types/user"
import type { OAuthAccessToken } from "../types/oauth_access_token"

export const user = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    query: string,
): Promise<EndpointSearchUserResponse> =>
    genericWebRequest<EndpointSearchUserResponse>("get", ["search"], {
        apiCall: true,
        authorizationAccessToken: oauthAccessToken,
        urlParameters: [
            { name: "mode", value: "user" },
            { name: "query", value: query },
        ],
    })
