/**
 * Rank status.
 *
 * ([Source for values from BeatmapsetCompact](https://osu.ppy.sh/docs/index.html#beatmapsetcompact-rank-status))
 *
 * ([Source for information about leaderboards](https://osu.ppy.sh/wiki/en/Beatmap/Category#present-categories))
 */
export enum RankStatus {
    /**
     * These beatmaps do not have leaderboards, but they can still be downloaded
     * and played, and they continue to contribute to play statistics.
     */
    graveyard = -2,
    /**
     * Work in Progress and Pending beatmaps do not have leaderboards, but
     * contribute to play statistics.
     */
    wip = -1,
    /**
     * Work in Progress and Pending beatmaps do not have leaderboards, but
     * contribute to play statistics.
     */
    pending = 0,
    /**
     * They allow players to compete on leaderboards and gain performance points
     * from setting scores.
     */
    ranked = 1,
    /**
     * They allow players to compete on leaderboards and gain performance points
     * from setting scores.
     */
    approved = 2,
    /**
     * Qualified beatmaps have leaderboards, but no performance points will be
     * awarded and all scores will be deleted when it moves out of Qualified.
     */
    qualified = 3,
    /**
     * They have leaderboards, but no performance points will be awarded and all
     * scores will be deleted if it moves out of Loved.
     */
    loved = 4,
}
