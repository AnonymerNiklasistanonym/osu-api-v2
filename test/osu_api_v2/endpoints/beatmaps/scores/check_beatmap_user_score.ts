// Package imports
import { expect } from "chai"
import moment from "moment"
// Local imports
import { GameMod, GameMode, GameModeInt } from "../../../../../src"
import { saveResponse } from "../../../../test_helper"
// Type imports
import type { BeatmapUserScore, Score } from "../../../../../src"

export interface CheckBeatmapUserScoreObjectOptions {
    checkBeatmapId?: number
    checkGameMode?: GameMode
    checkUserId?: number
}

export const checkBeatmapUserScoreScoreObject = async (
    beatmapUserScoreScore: Score,
    options: CheckBeatmapUserScoreObjectOptions = {},
): Promise<void> => {
    await saveResponse(
        "beatmapUserScoreScore",
        `${beatmapUserScoreScore?.id}`,
        beatmapUserScoreScore,
    )
    expect(beatmapUserScoreScore).to.be.an("object")
    expect(beatmapUserScoreScore.accuracy)
        .to.be.a("number")
        .greaterThanOrEqual(0)
    if (beatmapUserScoreScore.beatmap !== undefined) {
        //await checkBeatmapObject(beatmapUserScoreScore.beatmap, {
        //    checkBeatmapId: options.checkBeatmapId,
        //    checkGameMode: options.checkGameMode,
        //})
    }
    expect(beatmapUserScoreScore.best_id)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmapUserScoreScore.created_at)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(
        moment(
            beatmapUserScoreScore.created_at,
            moment.ISO_8601,
            true,
        ).isValid(),
    ).to.be.equal(true)
    expect(beatmapUserScoreScore.id)
        .to.be.a("number")
        .greaterThan(0)
        .that.satisfies(Number.isInteger)
    expect(beatmapUserScoreScore.max_combo)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmapUserScoreScore.mode_int)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(Object.values(GameMode)).includes(beatmapUserScoreScore.mode)
    expect(Object.values(GameModeInt)).includes(beatmapUserScoreScore.mode_int)
    switch (beatmapUserScoreScore.mode_int) {
        case GameModeInt.OSU_CATCH:
            expect(beatmapUserScoreScore.mode).to.be.equal(GameMode.OSU_CATCH)
            break
        case GameModeInt.OSU_MANIA:
            expect(beatmapUserScoreScore.mode).to.be.equal(GameMode.OSU_MANIA)
            break
        case GameModeInt.OSU_STANDARD:
            expect(beatmapUserScoreScore.mode).to.be.equal(
                GameMode.OSU_STANDARD,
            )
            break
        case GameModeInt.OSU_TAIKO:
            expect(beatmapUserScoreScore.mode).to.be.equal(GameMode.OSU_TAIKO)
            break
    }
    switch (beatmapUserScoreScore.mode) {
        case GameMode.OSU_CATCH:
            expect(beatmapUserScoreScore.mode_int).to.be.equal(
                GameModeInt.OSU_CATCH,
            )
            break
        case GameMode.OSU_MANIA:
            expect(beatmapUserScoreScore.mode_int).to.be.equal(
                GameModeInt.OSU_MANIA,
            )
            break
        case GameMode.OSU_STANDARD:
            expect(beatmapUserScoreScore.mode_int).to.be.equal(
                GameModeInt.OSU_STANDARD,
            )
            break
        case GameMode.OSU_TAIKO:
            expect(beatmapUserScoreScore.mode_int).to.be.equal(
                GameModeInt.OSU_TAIKO,
            )
            break
    }
    expect(beatmapUserScoreScore.mods)
        .to.be.an("array")
        .that.satisfies(Array.isArray)
    expect(
        beatmapUserScoreScore.mods.some(
            (x) =>
                ![
                    GameMod.EZ,
                    GameMod.NF,
                    GameMod.HT,
                    GameMod.HR,
                    GameMod.SD,
                    GameMod.PF,
                    GameMod.DT,
                    GameMod.NC,
                    GameMod.HD,
                    GameMod.FI,
                    GameMod.FL,
                    GameMod.RL,
                    GameMod.AP,
                    GameMod.SO,
                    GameMod.CP,
                    GameMod.MR,
                    GameMod.RD,
                    GameMod.AT,
                    GameMod.CM,
                    GameMod.SV2,
                    GameMod.TP,
                ]
                    .map((a) => a.toString())
                    .includes(x),
        ),
    ).to.be.false
    expect(beatmapUserScoreScore.passed).to.be.a("boolean")
    expect(beatmapUserScoreScore.perfect).to.be.a("boolean")
    expect(beatmapUserScoreScore.pp).to.be.a("number")
    expect(beatmapUserScoreScore.rank).to.be.a("string")
    expect(beatmapUserScoreScore.replay).to.be.a("boolean")
    expect(beatmapUserScoreScore.score).to.be.a("number")
    expect(beatmapUserScoreScore.statistics).to.be.an("object")
    expect(beatmapUserScoreScore.user_id)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    if (beatmapUserScoreScore.user !== undefined) {
        // TODO
    }
    if (options.checkUserId !== undefined) {
        expect(beatmapUserScoreScore.user_id).to.be.equal(options.checkUserId)
    }
}

export const checkBeatmapUserScoreObject = async (
    beatmapUserScore: BeatmapUserScore,
    options: CheckBeatmapUserScoreObjectOptions = {},
): Promise<void> => {
    await saveResponse(
        "beatmapUserScore",
        `${beatmapUserScore?.score?.id}`,
        beatmapUserScore,
    )
    expect(beatmapUserScore).to.be.an("object")
    expect(beatmapUserScore.position).to.be.a("number").greaterThan(0)
    await checkBeatmapUserScoreScoreObject(beatmapUserScore.score, {
        checkBeatmapId: options.checkBeatmapId,
        checkGameMode: options.checkGameMode,
        checkUserId: options.checkUserId,
    })
}
