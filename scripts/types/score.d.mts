// This is an auto generated file

// Types: Score, ScoreStatistics

/**
 * The following is the format returned when API v2 version header is 20220704 or lower.
 * [Source](https://osu.ppy.sh/docs/index.html#score)
 */
export interface Score {
    accuracy: number
    beatmap?: unknown
    beatmapset?: unknown
    best_id: integer | null
    created_at: unknown
    id: integer
    match?: unknown
    max_combo: integer
    mode: unknown
    mode_int: unknown
    mods: GameMod[]
    passed: boolean
    perfect: boolean
    pp: unknown
    rank: unknown
    rank_country?: unknown
    rank_global?: unknown
    replay: unknown
    score: integer
    statistics: ScoreStatistics
    user?: unknown
    user_id: integer
    weight?: unknown
}

export interface ScoreStatistics {
    count_100: integer
    count_300: integer
    count_50: integer
    count_geki: integer
    count_katu: integer
    count_miss: integer
}
