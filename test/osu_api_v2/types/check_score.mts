// Package imports
import { expect } from "chai"
// Local imports
import {
    BeatmapUserScore,
    ScoreRank,
    ScoreType,
    ScoreUserAttributes,
} from "../../../src/types/score.mjs"
import { GameMode, GameModeInt } from "../../../src/types/game_mode.mjs"
import { checkBeatmapObject } from "./check_beatmap.mjs"
import { checkBeatmapsetCompactObject } from "./check_beatmapset.mjs"
import { checkUserCompactObject } from "./check_user.mjs"
import { GameMod } from "../../../src/types/game_mods.mjs"
import { genericCheckObjectForUncheckedKeys } from "./check_generic.mjs"
// Type imports
import type {
    Score,
    ScoreStatistics,
    ScoreWeight,
} from "../../../src/types/score.mjs"
import type { DefaultCheckResponseOptions } from "../../test_helper.mjs"

export const checkScoreStatisticsObject = (
    scoreStatistics: Readonly<ScoreStatistics>,
): ReadonlyArray<string> => {
    expect(scoreStatistics).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("count_100")
    expect(scoreStatistics.count_100).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("count_300")
    expect(scoreStatistics.count_300).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("count_50")
    expect(scoreStatistics.count_50).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("count_geki")
    expect(scoreStatistics.count_geki).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("count_katu")
    expect(scoreStatistics.count_katu).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("count_miss")
    expect(scoreStatistics.count_miss).to.be.a("number").greaterThanOrEqual(0)

    return genericCheckObjectForUncheckedKeys(scoreStatistics, checkedKeys)
}

export const checkScoreWeightObject = (
    scoreWeight: Readonly<ScoreWeight>,
): ReadonlyArray<string> => {
    expect(scoreWeight).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("percentage")
    expect(scoreWeight.percentage).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("pp")
    expect(scoreWeight.pp).to.be.a("number").greaterThanOrEqual(0)

    return genericCheckObjectForUncheckedKeys(scoreWeight, checkedKeys)
}

export const checkScoreUserAttributesObject = (
    scoreUserAttributes: Readonly<ScoreUserAttributes>,
): ReadonlyArray<string> => {
    expect(scoreUserAttributes).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    if (scoreUserAttributes.pin !== undefined) {
        if (scoreUserAttributes.pin !== null) {
            checkedKeys.push("pin")
            expect(scoreUserAttributes.pin).to.be.a("boolean")
        } else {
            checkedKeys.push("pin")
            expect(scoreUserAttributes.pin).to.be.null
        }
    }

    return genericCheckObjectForUncheckedKeys(scoreUserAttributes, checkedKeys)
}

export interface CheckScoreObjectOptions extends DefaultCheckResponseOptions {
    beatmapId?: number
    gameMode?: GameMode
    userId?: number
}

export const checkScoreObjects = (
    scores: ReadonlyArray<Score>,
    options?: Readonly<CheckScoreObjectOptions>,
) => {
    expect(scores).to.be.an("array")
    for (const element of scores) {
        checkScoreObject(element, options)
    }
}

export const checkScoreObject = (
    score: Readonly<Score>,
    options?: Readonly<CheckScoreObjectOptions>,
): ReadonlyArray<string> => {
    expect(score).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("accuracy")
    expect(score.accuracy).to.be.a("number").greaterThanOrEqual(0)

    if (score.beatmap !== undefined) {
        checkedKeys.push("beatmap")
        checkBeatmapObject(score.beatmap, {
            id: options?.beatmapId,
        })
    }

    if (score.beatmapset !== undefined) {
        checkedKeys.push("beatmapset")
        expect(score.beatmapset).to.be.an("object")
        checkBeatmapsetCompactObject(score.beatmapset)
    }

    checkedKeys.push("best_id")
    if (score.best_id !== null) {
        expect(score.best_id).to.be.a("number").greaterThanOrEqual(0)
    } else {
        expect(score.best_id).to.be.null
    }

    checkedKeys.push("created_at")
    expect(score.created_at).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("current_user_attributes")
    checkScoreUserAttributesObject(score.current_user_attributes)

    checkedKeys.push("id")
    expect(score.id).to.be.a("number").greaterThanOrEqual(0)

    if (score.match !== undefined) {
        checkedKeys.push("match")
        expect.fail(`Unexpected type 'match': ${JSON.stringify(score.match)}`)
    }

    checkedKeys.push("max_combo")
    expect(score.max_combo).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("mode")
    expect(Object.values(GameMode)).includes(score.mode)
    if (options?.gameMode) {
        expect(score.mode).to.be.equal(options?.gameMode)
    }

    checkedKeys.push("mode_int")
    expect(Object.values(GameModeInt)).includes(score.mode_int)

    checkedKeys.push("mods")
    expect(score.mods).to.be.an("array")
    for (const element of score.mods) {
        expect(Object.values(GameMod)).includes(element)
    }

    checkedKeys.push("passed")
    expect(score.passed).to.be.a("boolean")

    checkedKeys.push("perfect")
    expect(score.perfect).to.be.a("boolean")

    checkedKeys.push("pp")
    if (score.pp !== null) {
        expect(score.pp).to.be.a("number").greaterThanOrEqual(0)
    } else {
        expect(score.pp).to.be.null
    }

    checkedKeys.push("rank")
    expect(Object.values(ScoreRank)).includes(score.rank)

    if (score.rank_country !== undefined) {
        checkedKeys.push("rank_country")
        expect.fail(
            `Unexpected type 'rank_country': ${JSON.stringify(
                score.rank_country,
            )}`,
        )
    }

    if (score.rank_global !== undefined) {
        checkedKeys.push("rank_global")
        expect.fail(
            `Unexpected type 'rank_global': ${JSON.stringify(
                score.rank_global,
            )}`,
        )
    }

    checkedKeys.push("replay")
    expect(score.replay).to.be.a("boolean")

    checkedKeys.push("score")
    expect(score.score).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("statistics")
    checkScoreStatisticsObject(score.statistics)

    checkedKeys.push("type")
    expect(Object.values(ScoreType)).includes(score.type)

    if (score.user !== undefined) {
        checkedKeys.push("user")
        checkUserCompactObject(score.user)
    }

    checkedKeys.push("user_id")
    expect(score.user_id).to.be.a("number").greaterThanOrEqual(0)
    if (options?.userId) {
        expect(score.user_id).to.be.equal(options?.userId)
    }

    if (score.weight !== undefined) {
        checkedKeys.push("weight")
        checkScoreWeightObject(score.weight)
    }

    return genericCheckObjectForUncheckedKeys(score, checkedKeys, options)
}

export const checkBeatmapUserScoreObject = (
    beatmapUserScore: BeatmapUserScore,
    options?: CheckScoreObjectOptions,
) => {
    expect(beatmapUserScore).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("position")
    expect(beatmapUserScore.position).to.be.a("number").greaterThan(0)

    checkedKeys.push("score")
    checkScoreObject(beatmapUserScore.score, options)

    genericCheckObjectForUncheckedKeys(beatmapUserScore, checkedKeys, options)
}
