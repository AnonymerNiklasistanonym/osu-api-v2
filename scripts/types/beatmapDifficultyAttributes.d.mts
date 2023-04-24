// This is an auto generated file

// Types: BeatmapDifficultyAttributes, Fruits, Mania, Osu, Taiko

/**
 * Represent beatmap difficulty attributes. Following fields are always present and then there are additional fields for different rulesets.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapdifficultyattributes)
 */
export interface BeatmapDifficultyAttributes {
    /**
     * Updated types: integer -> number
     */
    max_combo: number
    /**
     * Updated types: float -> number
     */
    star_rating: number
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#fruits)
 */
export interface Fruits {
    /**
     * Updated types: float -> number
     */
    approach_rate: number
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#mania)
 */
export interface Mania {
    /**
     * Updated types: float -> number
     */
    great_hit_window: number
    /**
     * Updated types: float -> number
     */
    score_multiplier: number
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#osu)
 */
export interface Osu {
    /**
     * Updated types: float -> number
     */
    aim_difficulty: number
    /**
     * Updated types: float -> number
     */
    approach_rate: number
    /**
     * Updated types: float -> number
     */
    flashlight_difficulty: number
    /**
     * Updated types: float -> number
     */
    overall_difficulty: number
    /**
     * Updated types: float -> number
     */
    slider_factor: number
    /**
     * Updated types: float -> number
     */
    speed_difficulty: number
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#taiko)
 */
export interface Taiko {
    /**
     * Updated types: float -> number
     */
    approach_rate: number
    /**
     * Updated types: float -> number
     */
    colour_difficulty: number
    /**
     * Updated types: float -> number
     */
    great_hit_window: number
    /**
     * Updated types: float -> number
     */
    rhythm_difficulty: number
    /**
     * Updated types: float -> number
     */
    stamina_difficulty: number
}
