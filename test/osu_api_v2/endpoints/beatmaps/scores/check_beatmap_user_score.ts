// Package imports
import { expect } from "chai"
import moment from "moment"
// Local imports
import { GameMode, GameModeInt, GameMods } from "../../../../../src/index"
import { checkBeatmapObject } from "../check_beatmap"
import { saveOsuResponseObjectAsFile } from "../../../../helper.test"
// Type imports
import type { BeatmapUserScore, Score } from "../../../../../src/index"

export interface CheckBeatmapUserScoreObjectOptions {
    checkBeatmapId?: number
    checkGameMode?: GameMode
    checkUserId?: number
}

export const checkBeatmapUserScoreScoreObject = async (
    beatmapUserScoreScore: Score,
    options: CheckBeatmapUserScoreObjectOptions = {},
): Promise<void> => {
    await saveOsuResponseObjectAsFile(
        `beatmapUserScoreScore_${beatmapUserScoreScore?.id}`,
        beatmapUserScoreScore,
    )
    expect(beatmapUserScoreScore).to.be.an("object")
    expect(beatmapUserScoreScore.accuracy)
        .to.be.a("number")
        .greaterThanOrEqual(0)
    if (beatmapUserScoreScore.beatmap !== undefined) {
        await checkBeatmapObject(beatmapUserScoreScore.beatmap, {
            checkBeatmapId: options.checkBeatmapId,
            checkGameMode: options.checkGameMode,
        })
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
    expect(beatmapUserScoreScore.mode)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect([
        GameMode.OSU_CATCH,
        GameMode.OSU_MANIA,
        GameMode.OSU_STANDARD,
        GameMode.OSU_TAIKO,
    ]).to.include(beatmapUserScoreScore.mode)
    expect(Object.values(GameMode)).to.include(beatmapUserScoreScore.mode)
    expect(beatmapUserScoreScore.mode_int)
        .to.be.a("number")
        .that.satisfies(Number.isInteger)
    expect([
        GameModeInt.OSU_CATCH,
        GameModeInt.OSU_MANIA,
        GameModeInt.OSU_STANDARD,
        GameModeInt.OSU_TAIKO,
    ]).to.include(beatmapUserScoreScore.mode_int)
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
                    GameMods.EZ,
                    GameMods.NF,
                    GameMods.HT,
                    GameMods.HR,
                    GameMods.SD,
                    GameMods.PF,
                    GameMods.DT,
                    GameMods.NC,
                    GameMods.HD,
                    GameMods.FI,
                    GameMods.FL,
                    GameMods.RL,
                    GameMods.AP,
                    GameMods.SO,
                    GameMods.CP,
                    GameMods.MR,
                    GameMods.RD,
                    GameMods.AT,
                    GameMods.CM,
                    GameMods.SV2,
                    GameMods.TP,
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
    await saveOsuResponseObjectAsFile(
        `beatmapUserScore_${beatmapUserScore?.score?.id}`,
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
