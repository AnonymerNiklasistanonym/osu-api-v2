import type { OAuthAccessToken } from "../types/oauth_access_token"

import fetch, { HeaderInit } from "node-fetch"
import { baseUrlApiV2 } from "../types/api_info"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
import { GameMode, Timestamp } from ".."

export enum EventType {
    Achievement = "achievement",
    BeatmapPlaycount = "beatmapPlaycount",
    BeatmapsetApprove = "beatmapsetApprove",
    BeatmapsetDelete = "beatmapsetDelete",
    BeatmapsetRevive = "beatmapsetRevive",
    BeatmapsetUpdate = "beatmapsetUpdate",
    BeatmapsetUpload = "beatmapsetUpload",
    Rank = "rank",
    RankLost = "rankLost",
    UserSupportAgain = "userSupportAgain",
    UserSupportFirst = "userSupportFirst",
    UserSupportGift = "userSupportGift",
    UsernameChange = "usernameChange",
}

export interface Event {
    created_at: Timestamp
    id: number
    type: EventType
}

export interface EventUser {
    username: string
    url: string
}

export interface EventBeatmap {
    title: string
    url: string
}

export interface EventAchievement extends Event {
    type: EventType.RankLost
    achievement: string // ?????
    user: EventUser
}

export interface EventRank extends Event {
    type: EventType.Rank
    scoreRank: string
    rank: number
    mode: GameMode
    beatmap: EventBeatmap
    user: EventUser
}

export interface EventRankLost extends Event {
    type: EventType.RankLost
    mode: GameMode
    beatmap: EventBeatmap
    user: EventUser
}

export const recentActivity = async (
    oauthAccessToken: OAuthAccessToken,
    userId: number,
): Promise<(Event | EventAchievement | EventRank | EventRankLost)[]> => {
    const params = urlParameterGenerator([])
    const method = "get"
    const headers: HeaderInit = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }
    // eslint-disable-next-line no-useless-catch
    try {
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

        const events: Event[] = await res.json()
        return events
    } catch (err) {
        throw err
    }
}
