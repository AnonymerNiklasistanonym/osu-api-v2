/**
 * Available game modes:
 *
 * https://osu.ppy.sh/docs/index.html#gamemode
 */
export enum GameMode {
    /** osu!catch */
    fruits = "fruits",
    /** osu!mania */
    mania = "mania",
    /** osu!standard */
    osu = "osu",
    /** osu!taiko */
    taiko = "taiko",
}

export enum GameModeInt {
    /** osu!catch */
    fruits = 2,
    /** osu!mania */
    mania = 1,
    /** osu!standard */
    osu = 0,
    /** osu!taiko */
    taiko = 3,
}
