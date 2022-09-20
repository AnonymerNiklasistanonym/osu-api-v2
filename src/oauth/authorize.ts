// Local imports
import { baseUrl } from "../types/api_info"
import { OsuApiV2AuthorizeScopes } from "../types/oauth_scopes"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"

/**
 * To obtain an access token, you must first get an authorization code that is
 * created when a user grants permissions to your application. To request
 * permission from the user, they should be redirected to an authorize URL
 * that is created with this method.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#authorization-code-grant))
 *
 * @param clientId
 * @param redirectUri
 * @param scopes
 * @param state
 */
export const authorizeRedirectUrlGenerator = (
    clientId: number,
    redirectUri: string,
    scopes: OsuApiV2AuthorizeScopes[],
    state?: string,
): string => {
    const params = urlParameterGenerator([
        {
            name: "client_id",
            value: `${clientId}`,
        },
        {
            name: "redirect_uri",
            value: redirectUri,
        },
        {
            name: "scope",
            value: scopes,
        },
        {
            name: "state",
            value: state,
        },
        {
            name: "response_type",
            value: "code",
        },
    ])
    return `${baseUrl}/oauth/authorize${params}`
}
