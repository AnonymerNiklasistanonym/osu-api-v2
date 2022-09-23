// Local imports
import { GameMode, GameModeInt } from "./game_mode"
import { Beatmapset } from ".."
import { GameMod } from "./game_mods"
// Type imports
import type { Beatmap } from "./beatmap"
import type { Timestamp } from "./timestamp"
import type { UserCompact } from "./user"

/**
 * ([Undocumented but can be found in Score](https://osu.ppy.sh/docs/index.html#score)).
 */
export interface ScoreStatistics {
    /** Integer */
    count_100: number
    /** Integer */
    count_300: number
    /** Integer */
    count_50: number
    /** Integer */
    count_geki: number
    /** Integer */
    count_katu: number
    /** Integer */
    count_miss: number
}

export enum ScoreRank {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    F = "F",
    S = "S",
    SH = "SH",
    X = "X",
    XH = "XH",
}

export interface ScoreWeight {
    percentage: number
    pp: number
}

export enum ScoreType {
    CATCH = "score_fruits",
    CATCH_BEST = "score_best_fruits",
    MANIA = "score_mania",
    MANIA_BEST = "score_best_mania",
    OSU = "score_osu",
    OSU_BEST = "score_best_osu",
    TAIKO = "score_taiko",
    TAIKO_BEST = "score_best_taiko",
}

export interface ScoreUserAttributes {
    pin?: boolean | null
}

/**
 * [[include:example_output/users_scores_9096716_best_osu_2_1.md]]
 * [[include:example_output/users_scores_2927048_recent_osu_2_0_true.md]]
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#score)).
 */
export interface Score {
    /** Float */
    accuracy: number
    beatmap?: Beatmap
    beatmapset?: Beatmapset
    /** Integer */
    best_id: number | null
    created_at: Timestamp
    /** (Undocumented) */
    current_user_attributes: ScoreUserAttributes
    /** Integer */
    id: number
    match?: unknown
    /** Integer */
    max_combo: number
    mode: GameMode
    /** Integer */
    mode_int: GameModeInt
    mods: GameMod[]
    passed: boolean
    perfect: boolean
    /** Float */
    pp: number | null
    rank: ScoreRank
    rank_country?: unknown
    rank_global?: unknown
    replay: boolean
    /** Integer */
    score: number
    statistics: ScoreStatistics
    type: ScoreType
    user?: UserCompact
    /** Integer */
    user_id: number
    weight?: ScoreWeight
}

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#beatmapuserscore)).
 */
export interface BeatmapUserScore {
    /**
     * The position of the score within the requested beatmap ranking.
     */
    position: number
    /**
     * The details of the score.
     */
    score: Score
}
