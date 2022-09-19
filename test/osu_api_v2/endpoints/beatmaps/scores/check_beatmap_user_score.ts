import { expect } from "chai"
import moment from "moment"
import {
    BeatmapUserScore,
    GameMode,
    GameModeInt,
    GameMods,
    Score,
} from "../../../../../src/index"
import { saveOsuResponseObjectAsFile } from "../../../../helper.test"
import { checkBeatmapObject } from "../check_beatmap"

export interface CheckBeatmapUserScoreObjectOptions {
    checkBeatmapId?: number
    checkGameMode?: GameMode
    checkUserId?: number
}

export const checkBeatmapUserScoreScoreObject = (
    beatmapUserScoreScore: Score,
    options: CheckBeatmapUserScoreObjectOptions = {},
): void => {
    saveOsuResponseObjectAsFile(
        `beatmapUserScoreScore_${beatmapUserScoreScore?.id}`,
        beatmapUserScoreScore,
    )
    expect(beatmapUserScoreScore).to.be.an("object")
    expect(beatmapUserScoreScore.accuracy)
        .to.be.a("number")
        .greaterThanOrEqual(0)
    if (beatmapUserScoreScore.beatmap !== undefined) {
        checkBeatmapObject(beatmapUserScoreScore.beatmap, {
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
        GameMode.fruits,
        GameMode.mania,
        GameMode.osu,
        GameMode.taiko,
    ]).to.include(beatmapUserScoreScore.mode)
    expect(Object.values(GameMode)).to.include(beatmapUserScoreScore.mode)
    expect(beatmapUserScoreScore.mode_int)
        .to.be.a("number")
        .that.satisfies(Number.isInteger)
    expect([
        GameModeInt.fruits,
        GameModeInt.mania,
        GameModeInt.osu,
        GameModeInt.taiko,
    ]).to.include(beatmapUserScoreScore.mode_int)
    switch (beatmapUserScoreScore.mode_int) {
        case GameModeInt.fruits:
            expect(beatmapUserScoreScore.mode).to.be.equal(GameMode.fruits)
            break
        case GameModeInt.mania:
            expect(beatmapUserScoreScore.mode).to.be.equal(GameMode.mania)
            break
        case GameModeInt.osu:
            expect(beatmapUserScoreScore.mode).to.be.equal(GameMode.osu)
            break
        case GameModeInt.taiko:
            expect(beatmapUserScoreScore.mode).to.be.equal(GameMode.taiko)
            break
    }
    switch (beatmapUserScoreScore.mode) {
        case GameMode.fruits:
            expect(beatmapUserScoreScore.mode_int).to.be.equal(
                GameModeInt.fruits,
            )
            break
        case GameMode.mania:
            expect(beatmapUserScoreScore.mode_int).to.be.equal(
                GameModeInt.mania,
            )
            break
        case GameMode.osu:
            expect(beatmapUserScoreScore.mode_int).to.be.equal(GameModeInt.osu)
            break
        case GameMode.taiko:
            expect(beatmapUserScoreScore.mode_int).to.be.equal(
                GameModeInt.taiko,
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

export const checkBeatmapUserScoreObject = (
    beatmapUserScore: BeatmapUserScore,
    options: CheckBeatmapUserScoreObjectOptions = {},
): void => {
    saveOsuResponseObjectAsFile(
        `beatmapUserScore_${beatmapUserScore?.score?.id}`,
        beatmapUserScore,
    )
    expect(beatmapUserScore).to.be.an("object")
    expect(beatmapUserScore.position).to.be.a("number").greaterThan(0)
    checkBeatmapUserScoreScoreObject(beatmapUserScore.score, {
        checkBeatmapId: options.checkBeatmapId,
        checkGameMode: options.checkGameMode,
        checkUserId: options.checkUserId,
    })
}
