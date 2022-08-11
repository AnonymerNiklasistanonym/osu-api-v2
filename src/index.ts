export type {
    Covers,
    BeatmapsetCompact,
    BeatmapsetCompactAvailability,
    BeatmapsetCompactHype,
    BeatmapsetCompactNominationsSummary,
    Beatmapset,
    BeatmapCompact,
    Beatmap,
} from "./types/beatmap"
export type { ClientCredentialsGrant } from "./types/client_credentials_grant"
export type { Failtimes } from "./types/failtimes"
export type { OAuthAccessToken } from "./types/oauth_access_token"
export type { ScoreStatistics, Score, BeatmapUserScore } from "./types/score"
export type { Timestamp } from "./types/timestamp"
export type {
    UserCompactCover,
    ProfilePage,
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
export type { OsuApiV2WebRequestError } from "./helpers/custom_errors"

export { ScoresType } from "./users/scores"
export { GameMode } from "./types/game_mode"
export { GameMods } from "./types/game_mods"
export { RankedStatus } from "./types/ranked_status"

import { beatmaps } from "./beatmaps/beatmaps"
import { beatmapsets } from "./beatmapsets/beatmapsets"
import { search } from "./search/search"
import { oauth } from "./oauth/oauth"
import { users } from "./users/users"

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
