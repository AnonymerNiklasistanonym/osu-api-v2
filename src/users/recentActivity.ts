// Local imports
import { baseUrlApiV2 } from "../types/api_info"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
// Type imports
import type {
    Event,
    EventAchievement,
    EventRank,
    EventRankLost,
} from "../types/event"
import type { OAuthAccessToken } from "../types/oauth_access_token"

export const recentActivity = async (
    oauthAccessToken: OAuthAccessToken,
    userId: number,
): Promise<(Event | EventAchievement | EventRank | EventRankLost)[]> => {
    const params = urlParameterGenerator([])
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

    const events = (await res.json()) as Event[]
    return events
}
