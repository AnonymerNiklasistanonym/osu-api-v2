// Package imports
import { expect } from "chai"
import moment from "moment"
// Local imports
import { GameMode, GameModeInt, RankStatus } from "../../../../src/index"
import { checkBeatmapsetObject } from "./check_beatmapset"
import { saveResponse } from "../../../test_helper"
// Type imports
import type { Beatmap } from "../../../../src/index"

export interface CheckBeatmapObjectOptions {
    checkBeatmapId?: number
    checkBeatmapsetId?: number
    checkGameMode?: GameMode
    checkRankStatus?: RankStatus
}

export const checkBeatmapObject = async (
    beatmap: Beatmap,
    options: CheckBeatmapObjectOptions = {},
): Promise<void> => {
    await saveResponse("beatmap", `${beatmap?.id}`, beatmap)
    expect(beatmap).to.be.an("object")
    expect(beatmap.accuracy).to.be.a("number").greaterThanOrEqual(0)
    expect(beatmap.ar).to.be.a("number").greaterThanOrEqual(0)
    if (beatmap.beatmapset !== undefined && beatmap.beatmapset != null) {
        await checkBeatmapsetObject(beatmap.beatmapset, {
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
        GameMode.OSU_CATCH,
        GameMode.OSU_MANIA,
        GameMode.OSU_STANDARD,
        GameMode.OSU_TAIKO,
    ]).to.include(beatmap.mode)
    expect(Object.values(GameMode)).to.include(beatmap.mode)
    expect(beatmap.mode_int).to.be.a("number").that.satisfies(Number.isInteger)
    expect([
        GameModeInt.OSU_CATCH,
        GameModeInt.OSU_MANIA,
        GameModeInt.OSU_STANDARD,
        GameModeInt.OSU_TAIKO,
    ]).to.include(beatmap.mode_int)
    switch (beatmap.mode_int) {
        case GameModeInt.OSU_CATCH:
            expect(beatmap.mode).to.be.equal(GameMode.OSU_CATCH)
            break
        case GameModeInt.OSU_MANIA:
            expect(beatmap.mode).to.be.equal(GameMode.OSU_MANIA)
            break
        case GameModeInt.OSU_STANDARD:
            expect(beatmap.mode).to.be.equal(GameMode.OSU_STANDARD)
            break
        case GameModeInt.OSU_TAIKO:
            expect(beatmap.mode).to.be.equal(GameMode.OSU_TAIKO)
            break
    }
    switch (beatmap.mode) {
        case GameMode.OSU_CATCH:
            expect(beatmap.mode_int).to.be.equal(GameModeInt.OSU_CATCH)
            break
        case GameMode.OSU_MANIA:
            expect(beatmap.mode_int).to.be.equal(GameModeInt.OSU_MANIA)
            break
        case GameMode.OSU_STANDARD:
            expect(beatmap.mode_int).to.be.equal(GameModeInt.OSU_STANDARD)
            break
        case GameMode.OSU_TAIKO:
            expect(beatmap.mode_int).to.be.equal(GameModeInt.OSU_TAIKO)
            break
    }
    if (options.checkGameMode !== undefined) {
        expect(beatmap.mode).to.be.equal(options.checkGameMode)
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
        RankStatus.approved,
        RankStatus.graveyard,
        RankStatus.loved,
        RankStatus.pending,
        RankStatus.qualified,
        RankStatus.ranked,
        RankStatus.wip,
    ]).to.include(beatmap.ranked)
    expect(beatmap.status).to.be.a("string").with.a.lengthOf.greaterThan(0)
    expect([
        RankStatus[RankStatus.approved],
        RankStatus[RankStatus.graveyard],
        RankStatus[RankStatus.loved],
        RankStatus[RankStatus.pending],
        RankStatus[RankStatus.qualified],
        RankStatus[RankStatus.ranked],
        RankStatus[RankStatus.wip],
    ]).to.include(beatmap.status)
    expect(beatmap.status).to.be.equal(RankStatus[beatmap.ranked])
    if (options.checkRankStatus !== undefined) {
        expect(beatmap.ranked).to.be.equal(options.checkRankStatus)
    }
    expect(beatmap.total_length)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmap.url).to.be.a("string").with.a.lengthOf.greaterThan(0)
    expect(beatmap.version).to.be.a("string").with.a.lengthOf.greaterThan(0)
}
