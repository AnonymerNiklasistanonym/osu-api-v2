// Local imports
import { beatmaps } from "./beatmaps/beatmaps.mjs"
import { beatmapsets } from "./beatmapsets/beatmapsets.mjs"
import { oauth } from "./oauth/oauth.mjs"
import { search } from "./search/search.mjs"
import { users } from "./users/users.mjs"
// Local exports
export { beatmaps } from "./beatmaps/beatmaps.mjs"
export { beatmapsets } from "./beatmapsets/beatmapsets.mjs"
export { oauth } from "./oauth/oauth.mjs"
export { search } from "./search/search.mjs"
export { users } from "./users/users.mjs"
// Local exports (Enums)
export { EventType, EventBeatmapsetApproveApproval } from "./types/event.mjs"
export { GameMode, GameModeInt } from "./types/game_mode.mjs"
export {
    OsuApiV2WebRequestError,
    OsuApiV2ErrorCode,
    OsuApiV2Error,
} from "./helpers/custom_errors.mjs"
export {
    GameModeVariant,
    ProfilePage,
    Playstyle,
    UserAccountHistoryType,
} from "./types/user.mjs"
export { GameMod } from "./types/game_mods.mjs"
export { GrantType } from "./types/grant_type.mjs"
export { OAuthAuthorizeScope } from "./types/oauth_scopes.mjs"
export { RankStatus, RankStatusInt } from "./types/rank_status.mjs"
export { ScoresType } from "./users/scores.mjs"
export { ScoreRank, ScoreType } from "./types/score.mjs"
// Type exports
export type {
    Beatmap,
    BeatmapCompact,
    Beatmapset,
    BeatmapsetAvailability,
    BeatmapsetCompact,
    BeatmapsetCompactDescription,
    BeatmapsetCompactGenre,
    BeatmapsetCompactLanguage,
    BeatmapsetCompactNominations,
    BeatmapsetHype,
    BeatmapsetSearchResult,
    Covers,
} from "./types/beatmap.mjs"
export type {
    BeatmapUserScore,
    Score,
    ScoreStatistics,
} from "./types/score.mjs"
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
    UserRankHighest,
    UserRankHistory,
    UserReplaysWatchedCount,
    UserStatistics,
    UserStatisticsGradeCounts,
    UserStatisticsLevel,
    UserStatisticsRulesets,
} from "./types/user.mjs"
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
} from "./types/event.mjs"
export type {
    OAuthAccessToken,
    OAuthAccessTokenResponse,
    OAuthAccessTokenWithRefreshTokenResponse,
} from "./types/oauth_access_token.mjs"
export type {
    OsuApiV2WebRequestErrorMethod,
    OsuApiV2WebRequestErrorHeaders,
} from "./helpers/custom_errors.mjs"
export type { Search, SearchResult } from "./types/search.mjs"
export type { ClientCredentialsGrant } from "./types/client_credentials_grant.mjs"
export type { ColorCode } from "./types/color_code.mjs"
export type { Failtimes } from "./types/failtimes.mjs"
export type { LanguageLocaleTag } from "./types/language.mjs"
export type { Timestamp } from "./types/timestamp.mjs"
export type { WikiPage } from "./types/wiki_page.mjs"
export type { ScoreWeight, ScoreUserAttributes } from "./types/score.mjs"

/**
 * A collection of all supported osu!api v2 endpoints for ease of use.
 */
export const osuApiV2 = {
    beatmaps,
    beatmapsets,
    oauth,
    search,
    users,
}
// Export the collection per default for ease of use.
export default osuApiV2
