export type {
    Covers,
    BeatmapsetCompact,
    BeatmapsetCompactAvailability,
    BeatmapsetCompactHype,
    BeatmapsetCompactNominationsSummary,
    Beatmapset,
    BeatmapsetSearchResult,
    BeatmapCompact,
    Beatmap,
} from "./types/beatmap"
export type { ClientCredentialsGrant } from "./types/client_credentials_grant"
export type {
    Event,
    EventUser,
    EventBeatmap,
    EventAchievement,
    EventRank,
    EventRankLost,
} from "./types/event"
export type { Failtimes } from "./types/failtimes"
export type { OAuthAccessToken } from "./types/oauth_access_token"
export type { ScoreStatistics, Score, BeatmapUserScore } from "./types/score"
export type { Timestamp } from "./types/timestamp"
export type {
    UserCompactCover,
    UserCompactStatistics,
    UserRankHistory,
    ProfilePage,
    UserAchievement,
    UserSearchResult,
    UserCompactStatisticsGradeCounts,
    UserCompactStatisticsRank,
    UserCompactStatisticsLevel,
    UserSearchResultUserSection,
    UserStatisticsRulesets,
    UserMonthlyPlaycount,
    UserGroup,
    UserAccountHistory,
    UserCompactProfileBanner,
    UserBadge,
    UserCompactCountry,
    UserCompact,
    UserCompactKusodo,
    User,
} from "./types/user"

export type {
    OsuApiV2WebRequestErrorMethod,
    OsuApiV2WebRequestErrorHeaders,
} from "./helpers/custom_errors"

export { EventType } from "./types/event"
export { GameMode, GameModeInt } from "./types/game_mode"
export { GameMods } from "./types/game_mods"
export { RankedStatus } from "./types/ranked_status"
export { ScoresType } from "./users/scores"

export {
    OsuApiV2WebRequestError,
    OsuApiV2ErrorCode,
    OsuApiV2Error,
} from "./helpers/custom_errors"

import { beatmaps } from "./beatmaps/beatmaps"
import { beatmapsets } from "./beatmapsets/beatmapsets"
import { oauth } from "./oauth/oauth"
import { search } from "./search/search"
import { users } from "./users/users"

/**
 * A collection of all supported osu!api v2 endpoints.
 */
const osuApiV2 = {
    beatmaps,
    beatmapsets,
    oauth,
    search,
    users,
}

// Typescript default export (import osuApiV2 from "osuApiV2")
// NodeJs: (const osuApiV2 = require("osuApiV2").default)
export default osuApiV2
// This is not working:
//// NodeJs compatibility (const osuApiV2 = require("osuApiV2"))
//module.exports = osuApiV2
