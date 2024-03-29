// Local imports
import { beatmaps } from "./beatmaps/beatmaps"
import { beatmapsets } from "./beatmapsets/beatmapsets"
import { oauth } from "./oauth/oauth"
import { search } from "./search/search"
import { users } from "./users/users"
// Local exports
export { EventType, EventBeatmapsetApproveApproval } from "./types/event"
export { GameMode, GameModeInt } from "./types/game_mode"
export {
    OsuApiV2WebRequestError,
    OsuApiV2ErrorCode,
    OsuApiV2Error,
} from "./helpers/custom_errors"
export {
    GameModeVariant,
    ProfilePage,
    Playstyle,
    UserAccountHistoryType,
} from "./types/user"
export { GameMod } from "./types/game_mods"
export { OAuthAuthorizeScope } from "./types/oauth_scopes"
export { RankStatus, RankStatusInt } from "./types/rank_status"
export { ScoresType } from "./users/scores"
export { ScoreRank, ScoreType } from "./types/score"
// Type exports
export type {
    Beatmap,
    BeatmapCompact,
    Beatmapset,
    BeatmapsetCompact,
    BeatmapsetAvailability,
    BeatmapsetDescription,
    BeatmapsetGenre,
    BeatmapsetHype,
    BeatmapsetLanguage,
    BeatmapsetNominationsSummary,
    BeatmapsetSearchResult,
    Covers,
} from "./types/beatmap"
export type { BeatmapUserScore, Score, ScoreStatistics } from "./types/score"
export type {
    Group,
    GroupDescription,
    User,
    UserAccountHistory,
    UserAchievement,
    UserBadge,
    UserCompact,
    UserCompactCountry,
    UserCompactCover,
    UserCompactKusodo,
    UserCompactPage,
    UserEndpointGet,
    UserEndpointMe,
    UserEndpointSearchUser,
    UserGameModeVariant,
    UserGroup,
    UserMonthlyPlaycount,
    UserProfileBanner,
    UserRankHistory,
    UserReplaysWatchedCount,
    UserStatistics,
    UserStatisticsGradeCounts,
    UserStatisticsLevel,
    UserStatisticsRulesets,
} from "./types/user"
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
    OAuthAccessToken,
    OAuthAccessTokenResponse,
    OAuthAccessTokenWithRefreshTokenResponse,
} from "./types/oauth_access_token"
export type {
    OsuApiV2WebRequestErrorMethod,
    OsuApiV2WebRequestErrorHeaders,
} from "./helpers/custom_errors"
export type { Search, SearchResult } from "./types/search"
export type { ClientCredentialsGrant } from "./types/client_credentials_grant"
export type { ColorCode } from "./types/color_code"
export type { Failtimes } from "./types/failtimes"
export type { LanguageLocaleTag } from "./types/language"
export type { Timestamp } from "./types/timestamp"
export type { WikiPage } from "./types/wiki_page"
export type { ScoreWeight, ScoreUserAttributes } from "./types/score"

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
