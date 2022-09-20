// Local imports
import { GameMode, GameModeInt } from "./game_mode"
import { Beatmapset } from ".."
// Type imports
import type { Beatmap } from "./beatmap"
import type { Timestamp } from "./timestamp"
import type { User } from "./user"

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

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#score)).
 */
export interface Score {
    /** Float */
    accuracy: number
    beatmap?: Beatmap
    beatmapset?: Beatmapset
    /** Integer */
    best_id: number
    created_at: Timestamp
    /** Integer */
    id: number
    match?: unknown
    /** Integer */
    max_combo: number
    mode: GameMode
    /** Integer */
    mode_int: GameModeInt
    mods: string[]
    passed: boolean
    perfect: boolean
    /** Float */
    pp: number
    rank: string
    rank_country?: unknown
    rank_global?: unknown
    replay: boolean
    /** Integer */
    score: number
    statistics: ScoreStatistics
    user?: User
    /** Integer */
    user_id: number
    weight?: unknown
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
