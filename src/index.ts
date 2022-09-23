// Local imports
import { beatmaps } from "./beatmaps/beatmaps"
import { beatmapsets } from "./beatmapsets/beatmapsets"
import { oauth } from "./oauth/oauth"
import { search } from "./search/search"
import { users } from "./users/users"
// Local exports
export {
    EventType,
    EventBeatmapsetApproveApproval,
    EventRankScoreRank,
} from "./types/event"
export { GameMode, GameModeInt } from "./types/game_mode"
export {
    OsuApiV2WebRequestError,
    OsuApiV2ErrorCode,
    OsuApiV2Error,
} from "./helpers/custom_errors"
export { GameModeVariant, ProfilePage, Playstyle } from "./types/user"
export { GameMods } from "./types/game_mods"
export { OAuthAuthorizeScope } from "./types/oauth_scopes"
export { RankStatus } from "./types/rank_status"
export { ScoresType } from "./users/scores"
// Type exports
export type {
    Beatmap,
    BeatmapCompact,
    Beatmapset,
    BeatmapsetCompact,
    BeatmapsetCompactAvailability,
    BeatmapsetCompactHype,
    BeatmapsetCompactNominationsSummary,
    BeatmapsetSearchResult,
    Covers,
} from "./types/beatmap"
export type { BeatmapUserScore, Score, ScoreStatistics } from "./types/score"
export type {
    Event,
    EventAchievement,
    EventBeatmapPlayCount,
    EventBeatmapsetApprove,
    EventBeatmapsetDelete,
    EventBeatmapsetRevive,
    EventBeatmapsetUpdate,
    EventBeatmapsetUpload,
    EventObjectAchievement,
    EventObjectBeatmap,
    EventObjectBeatmapset,
    EventObjectUser,
    EventRank,
    EventRankLost,
    Events,
    EventUsernameChange,
    EventUserSupportAgain,
    EventUserSupportFirst,
    EventUserSupportGift,
} from "./types/event"
export type {
    OsuApiV2WebRequestErrorMethod,
    OsuApiV2WebRequestErrorHeaders,
} from "./helpers/custom_errors"
export type {
    OAuthAccessToken,
    OAuthAccessTokenWithRefreshToken,
} from "./types/oauth_access_token"
export type {
    User,
    UserAccountHistory,
    UserAchievement,
    UserBadge,
    UserCompact,
    UserCompactCountry,
    UserCompactCover,
    UserCompactKusodo,
    UserCompactPage,
    UserCompactProfileBanner,
    UserEndpointGet,
    UserEndpointMe,
    UserGameModeVariant,
    UserStatistics,
    UserStatisticsGradeCounts,
    UserStatisticsLevel,
    UserGroup,
    UserMonthlyPlaycount,
    UserRankHistory,
    UserReplaysWatchedCount,
    UserSearchResult,
    UserSearchResultUserSection,
    UserStatisticsRulesets,
} from "./types/user"
export type { ClientCredentialsGrant } from "./types/client_credentials_grant"
export type { Failtimes } from "./types/failtimes"
export type { Timestamp } from "./types/timestamp"

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
