/**
 * Available game modes.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#gamemode))
 */
export enum GameMode {
    /** Osu!catch */
    fruits = "fruits",
    /** Osu!mania */
    mania = "mania",
    /** Osu!standard */
    osu = "osu",
    /** Osu!taiko */
    taiko = "taiko",
}

/**
 * Available game modes integer codes.
 *
 * ([Undocumented but can be found in Score](https://osu.ppy.sh/docs/index.html#score))
 */
export enum GameModeInt {
    /** Osu!catch */
    fruits = 2,
    /** Osu!mania */
    mania = 1,
    /** Osu!standard */
    osu = 0,
    /** Osu!taiko */
    taiko = 3,
}
