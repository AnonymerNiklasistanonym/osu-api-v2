// Local imports
import { baseUrlApiV2 } from "../types/api_info"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
// Type imports
import type { Events } from "../types/event"
import type { OAuthAccessToken } from "../types/oauth_access_token"

/**
 * Get a list of recent activity events of a user.
 *
 * @param oauthAccessToken The OAuth Access token.
 * @param userId The osu! user ID of the account from which the recent activity
 * should be fetched.
 * @param limit Maximum number of results.
 * @param offset Result offset for pagination.
 * @throws If the web request fails like for example when no user was found with
 * the provided user ID a {@link OsuApiV2WebRequestError} is being thrown.
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const user = await osuApiV2.users.recentActivity(
 *     oauthAccessToken,
 *     9096716,
 *     2,
 *     1,
 * )
 * ```
 * [[include:example_output/users_recent_activity_9096716_2_1.md]]
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const user = await osuApiV2.users.recentActivity(
 *     oauthAccessToken,
 *     2927048,
 *     2,
 * )
 * ```
 * [[include:example_output/users_recent_activity_2927048_2.md]]
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#get-user-recent-activity))
 */
export const recentActivity = async (
    oauthAccessToken: OAuthAccessToken,
    userId: number,
    limit?: number,
    offset?: number,
): Promise<Events[]> => {
    const params = urlParameterGenerator([
        {
            name: "limit",
            value: limit !== undefined ? `${limit}` : undefined,
        },
        {
            name: "offset",
            value: offset !== undefined ? `${offset}` : undefined,
        },
    ])
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }

    const res = await fetch(
        `${baseUrlApiV2}/users/${userId}/recent_activity${params}`,
        {
            headers,
            method,
        },
    )
    if (res.status !== 200) {
        throw new OsuApiV2WebRequestError(
            `Bad web request (${res.status}=${res.statusText}, url=${res.url})`,
            res.status,
            res.statusText,
            res.url,
            method,
            headers,
        )
    }

    const events = (await res.json()) as Events[]
    return events
}
