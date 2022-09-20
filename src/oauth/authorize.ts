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
 * If the user accepts your request, they will be redirected back to your site
 * with a temporary single-use code contained in the URL parameter.
 * If a state value was provided in the previous request, it will be returned
 * here.
 *
 * @param clientId The Client ID you received when you
 * [registered](https://osu.ppy.sh/home/account/edit#new-oauth-application).
 * @param redirectUri The URL in your application where users will be sent after
 * authorization. This must match the registered Application Callback URL
 * exactly.
 * @param scopes A list of scopes.
 * @param state Data that will be returned when a temporary code is issued.
 * It can be used to provide a token for protecting against cross-site request
 * forgery attacks.
 * @returns The authorize redirect URL which opens the authorization dialogue.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#authorization-code-grant))
 */
export const authorizeRedirectUrlGenerator = (
    clientId: number,
    redirectUri: string,
    scopes?: OsuApiV2AuthorizeScopes[],
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
