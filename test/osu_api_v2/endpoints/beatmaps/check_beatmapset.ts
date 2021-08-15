import { expect } from "chai"
import { Beatmapset, BeatmapsetCompact } from "../../../../src/types/beatmap"

export const checkBeatmapsetObject = (
    beatmapset: Beatmapset | BeatmapsetCompact,
): void => {
    expect(beatmapset.artist).to.be.a("string").with.a.lengthOf.greaterThan(0)
    expect(beatmapset.artist_unicode)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    // TODO
}
