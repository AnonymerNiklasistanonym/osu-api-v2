// Package imports
import { expect } from "chai"
// Local imports
import { GameMode, GameModeInt } from "../../../src/types/game_mode.mjs"
import { RankStatus, RankStatusInt } from "../../../src/types/rank_status.mjs"
import { genericCheckObjectForUncheckedKeys } from "./check_generic.mjs"
// Type imports
import type { Beatmap, BeatmapCompact } from "../../../src/types/beatmap.mjs"
import type { DefaultCheckResponseOptions } from "../../test_helper.mjs"
import type { Failtimes } from "../../../src/types/failtimes.mjs"

export const checkFailtimesObject = (failtimes: Readonly<Failtimes>): void => {
    expect(failtimes).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    if (failtimes.exit !== undefined) {
        checkedKeys.push("exit")
        expect(failtimes.exit).to.be.an("array").with.a.lengthOf(100)
    }

    if (failtimes.fail !== undefined) {
        checkedKeys.push("fail")
        expect(failtimes.fail).to.be.an("array").with.a.lengthOf(100)
    }

    expect(
        failtimes.exit !== undefined || failtimes.fail !== undefined,
    ).to.be.equal(true)

    genericCheckObjectForUncheckedKeys(failtimes, checkedKeys)
}

export interface CheckBeatmapObjectOptions
    extends CheckBeatmapCompactObjectOptions {
    isNotARefreshToken?: boolean
}
export interface CheckBeatmapCompactObjectOptions
    extends DefaultCheckResponseOptions {
    gameMode?: GameMode
    id?: number
    isBeatmapObject?: boolean
    rankStatus?: RankStatus
    userId?: number
}

export const checkBeatmapCompactObject = (
    beatmapCompact: Readonly<BeatmapCompact>,
    options?: Readonly<CheckBeatmapCompactObjectOptions>,
): ReadonlyArray<string> => {
    expect(beatmapCompact).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    if (beatmapCompact.beatmapset !== undefined) {
        if (beatmapCompact.beatmapset !== null) {
            checkedKeys.push("beatmapset")
            expect(beatmapCompact.beatmapset).to.be.an("object")
            // TODO Check BeatmapsetCompact object
            if (options?.isBeatmapObject) {
                // TODO Check Beatmapset object
            }
        } else {
            checkedKeys.push("beatmapset")
            expect(beatmapCompact.beatmapset).to.be.null
        }
    }

    checkedKeys.push("beatmapset_id")
    expect(beatmapCompact.beatmapset_id).to.be.a("number").greaterThanOrEqual(0)

    if (beatmapCompact.checksum !== undefined) {
        checkedKeys.push("checksum")
        expect(beatmapCompact.checksum)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
    }

    checkedKeys.push("difficulty_rating")
    expect(beatmapCompact.difficulty_rating)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    if (beatmapCompact.failtimes !== undefined) {
        checkedKeys.push("failtimes")
        checkFailtimesObject(beatmapCompact.failtimes)
    }

    checkedKeys.push("id")
    expect(beatmapCompact.id).to.be.a("number").greaterThanOrEqual(0)
    if (options?.id) {
        expect(beatmapCompact.id).to.be.equal(options?.id)
    }

    if (beatmapCompact.max_combo !== undefined) {
        checkedKeys.push("max_combo")
        expect(beatmapCompact.max_combo).to.be.a("number").greaterThanOrEqual(0)
    }

    checkedKeys.push("mode")
    expect(Object.values(GameMode)).includes(beatmapCompact.mode)
    if (options?.gameMode !== undefined) {
        expect(beatmapCompact.mode).to.equal(options.gameMode)
    }

    checkedKeys.push("status")
    expect(Object.values(RankStatus)).includes(beatmapCompact.status)
    if (options?.rankStatus !== undefined) {
        expect(beatmapCompact.status).to.equal(options.rankStatus)
    }

    checkedKeys.push("total_length")
    expect(beatmapCompact.total_length).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("user_id")
    expect(beatmapCompact.user_id).to.be.a("number").greaterThanOrEqual(0)
    if (options?.userId) {
        expect(beatmapCompact.user_id).to.be.equal(options?.userId)
    }

    checkedKeys.push("version")
    expect(beatmapCompact.version)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    return genericCheckObjectForUncheckedKeys(
        beatmapCompact,
        checkedKeys,
        options,
    )
}

export const checkBeatmapObject = (
    beatmap: Readonly<Beatmap>,
    options?: Readonly<CheckBeatmapObjectOptions>,
): ReadonlyArray<string> => {
    expect(beatmap).to.be.an("object")

    const alreadyCheckedKeys = checkBeatmapCompactObject(beatmap, {
        ...options,
        doNotCheckForUncheckedKeys: true,
        isBeatmapObject: true,
    })

    // List of all keys that will be checked
    const checkedKeys = [...alreadyCheckedKeys]

    checkedKeys.push("accuracy")
    expect(beatmap.accuracy).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("ar")
    expect(beatmap.ar).to.be.a("number").greaterThanOrEqual(0)

    if (beatmap.bpm !== undefined) {
        checkedKeys.push("bpm")
        expect(beatmap.bpm).to.be.a("number").greaterThanOrEqual(0)
    }

    checkedKeys.push("convert")
    expect(beatmap.convert).to.be.a("boolean")

    checkedKeys.push("count_circles")
    expect(beatmap.count_circles).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("count_sliders")
    expect(beatmap.count_sliders).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("count_spinners")
    expect(beatmap.count_spinners).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("cs")
    expect(beatmap.cs).to.be.a("number").greaterThanOrEqual(0)

    if (beatmap.deleted_at !== undefined) {
        if (beatmap.deleted_at !== null) {
            checkedKeys.push("deleted_at")
            expect(beatmap.deleted_at)
                .to.be.a("string")
                .with.a.lengthOf.greaterThan(0)
        } else {
            checkedKeys.push("deleted_at")
            expect(beatmap.deleted_at).to.be.null
        }
    }

    checkedKeys.push("drain")
    expect(beatmap.drain).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("hit_length")
    expect(beatmap.hit_length).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("is_scoreable")
    expect(beatmap.is_scoreable).to.be.a("boolean")

    checkedKeys.push("last_updated")
    expect(beatmap.last_updated)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("mode_int")
    expect(Object.values(GameModeInt)).includes(beatmap.mode_int)

    checkedKeys.push("passcount")
    expect(beatmap.passcount).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("playcount")
    expect(beatmap.playcount).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("ranked")
    expect(Object.values(RankStatusInt)).includes(beatmap.ranked)

    checkedKeys.push("url")
    expect(beatmap.url).to.be.a("string").with.a.lengthOf.greaterThan(0)

    return genericCheckObjectForUncheckedKeys(beatmap, checkedKeys, options)
}
