import { expect } from "chai"
import moment from "moment"
import { Beatmap, RankedStatus } from "../../../../src/types/beatmap"
import { GameMode } from "../../../../src/types/game_mode"
import { saveOsuResponseObjectAsFile } from "../../../helper.test"
import { checkBeatmapsetObject } from "./check_beatmapset"

export interface CheckBeatmapObjectOptions {
    checkBeatmapId?: number
    checkBeatmapsetId?: number
    checkGameMode?: GameMode
    checkRankedStatus?: RankedStatus
}

export const checkBeatmapObject = (
    beatmap: Beatmap,
    options: CheckBeatmapObjectOptions = {},
): void => {
    saveOsuResponseObjectAsFile(`beatmap_${beatmap?.id}`, beatmap)
    expect(beatmap).to.be.an("object")
    expect(beatmap.accuracy).to.be.a("number").greaterThanOrEqual(0)
    expect(beatmap.ar).to.be.a("number").greaterThanOrEqual(0)
    if (beatmap.beatmapset !== undefined && beatmap.beatmapset != null) {
        checkBeatmapsetObject(beatmap.beatmapset, {
            checkBeatmapsetId: options.checkBeatmapsetId,
        })
    }
    expect(beatmap.beatmapset_id)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    if (options.checkBeatmapsetId !== undefined) {
        expect(beatmap.beatmapset_id).to.be.equal(options.checkBeatmapsetId)
    }
    expect(beatmap.bpm).to.be.a("number").greaterThanOrEqual(0)
    if (beatmap.checksum !== undefined) {
        expect(beatmap.checksum)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
    }
    expect(beatmap.convert).to.be.a("boolean")
    expect(beatmap.count_circles)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmap.count_sliders)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmap.count_spinners)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmap.cs).to.be.a("number").greaterThanOrEqual(0)
    if (beatmap.deleted_at !== undefined && beatmap.deleted_at != null) {
        expect(beatmap.deleted_at)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
        expect(
            moment(beatmap.deleted_at, moment.ISO_8601, true).isValid(),
        ).to.be.equal(true)
    }
    expect(beatmap.difficulty_rating).to.be.a("number").greaterThanOrEqual(0)
    expect(beatmap.drain).to.be.a("number").greaterThanOrEqual(0)
    if (beatmap.failtimes !== undefined) {
        expect(beatmap.failtimes).to.be.an("object")
        if (beatmap.failtimes.fail !== undefined) {
            expect(beatmap.failtimes.fail)
                .to.be.an("array")
                .that.satisfies(Array.isArray)
        }
        if (beatmap.failtimes.exit !== undefined) {
            expect(beatmap.failtimes.exit)
                .to.be.an("array")
                .that.satisfies(Array.isArray)
        }
    }
    expect(beatmap.hit_length)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmap.id).to.be.a("number").greaterThan(0)
    if (options.checkBeatmapId !== undefined) {
        expect(beatmap.id).to.be.equal(options.checkBeatmapId)
    }
    expect(beatmap.is_scoreable).to.be.a("boolean")
    expect(beatmap.last_updated)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(
        moment(beatmap.last_updated, moment.ISO_8601, true).isValid(),
    ).to.be.equal(true)
    if (beatmap.max_combo !== undefined) {
        expect(beatmap.max_combo)
            .to.be.a("number")
            .greaterThanOrEqual(0)
            .that.satisfies(Number.isInteger)
    }
    expect(beatmap.mode).to.be.a("string").with.a.lengthOf.greaterThan(0)
    expect([
        GameMode[GameMode.fruits],
        GameMode[GameMode.mania],
        GameMode[GameMode.osu],
        GameMode[GameMode.taiko],
    ]).to.include(beatmap.mode)
    expect(beatmap.mode_int).to.be.a("number").that.satisfies(Number.isInteger)
    expect([
        GameMode.fruits,
        GameMode.mania,
        GameMode.osu,
        GameMode.taiko,
    ]).to.include(beatmap.mode_int)
    expect(beatmap.mode).to.be.equal(GameMode[beatmap.mode_int])
    if (options.checkGameMode !== undefined) {
        expect(beatmap.mode_int).to.be.equal(options.checkGameMode)
    }
    expect(beatmap.passcount)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmap.playcount)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmap.ranked).to.be.a("number").that.satisfies(Number.isInteger)
    expect([
        RankedStatus.approved,
        RankedStatus.graveyard,
        RankedStatus.loved,
        RankedStatus.pending,
        RankedStatus.qualified,
        RankedStatus.ranked,
        RankedStatus.wip,
    ]).to.include(beatmap.ranked)
    expect(beatmap.status).to.be.a("string").with.a.lengthOf.greaterThan(0)
    expect([
        RankedStatus[RankedStatus.approved],
        RankedStatus[RankedStatus.graveyard],
        RankedStatus[RankedStatus.loved],
        RankedStatus[RankedStatus.pending],
        RankedStatus[RankedStatus.qualified],
        RankedStatus[RankedStatus.ranked],
        RankedStatus[RankedStatus.wip],
    ]).to.include(beatmap.status)
    expect(beatmap.status).to.be.equal(RankedStatus[beatmap.ranked])
    if (options.checkRankedStatus !== undefined) {
        expect(beatmap.ranked).to.be.equal(options.checkRankedStatus)
    }
    expect(beatmap.total_length)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmap.url).to.be.a("string").with.a.lengthOf.greaterThan(0)
    expect(beatmap.version).to.be.a("string").with.a.lengthOf.greaterThan(0)
}
