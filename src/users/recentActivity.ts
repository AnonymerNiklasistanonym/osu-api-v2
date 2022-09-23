// Local imports
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { Events } from "../types/event"
import type { OAuthAccessToken } from "../types/oauth_access_token"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OsuApiV2WebRequestError } from "../helpers/custom_errors"

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
    oauthAccessToken: Readonly<OAuthAccessToken>,
    userId: number,
    limit?: number,
    offset?: number,
): Promise<Events[]> =>
    genericWebRequest<Events[]>("get", ["users", userId, "recent_activity"], {
        apiCall: true,
        authorizationAccessToken: oauthAccessToken,
        urlParameters: [
            {
                name: "limit",
                value: limit !== undefined ? `${limit}` : undefined,
            },
            {
                name: "offset",
                value: offset !== undefined ? `${offset}` : undefined,
            },
        ],
    })
