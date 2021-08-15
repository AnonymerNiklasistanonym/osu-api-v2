import { expect } from "chai"
import moment from "moment"
import { RankedStatus } from "../../../../src/types/beatmap"
import { GameMode } from "../../../../src/types/game_mode"
import { GameMods } from "../../../../src/types/game_mods"
import { BeatmapUserScore } from "../../../../src/types/score"
import { checkBeatmapObject } from "./check_beatmap"
import { checkBeatmapsetObject } from "./check_beatmapset"

export interface CheckBeatmapUserScoreObjectOptions {
    checkBeatmapId?: number
    checkGameMode?: GameMode
    checkUserId?: number
}

export const checkBeatmapUserScoreObject = (
    beatmapUserScore: BeatmapUserScore,
    options: CheckBeatmapUserScoreObjectOptions = {},
): void => {
    expect(beatmapUserScore).to.be.an("object")
    expect(beatmapUserScore.position).to.be.a("number").greaterThan(0)
    expect(beatmapUserScore.score).to.be.an("object")
    expect(beatmapUserScore.score.accuracy)
        .to.be.a("number")
        .greaterThanOrEqual(0)
    if (beatmapUserScore.score.beatmap !== undefined) {
        checkBeatmapObject(beatmapUserScore.score.beatmap, {
            checkGameMode: options.checkGameMode,
            checkId: options.checkBeatmapId,
        })
    }
    expect(beatmapUserScore.score.best_id)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmapUserScore.score.created_at)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(
        moment(
            beatmapUserScore.score.created_at,
            moment.ISO_8601,
            true,
        ).isValid(),
    ).to.be.equal(true)
    expect(beatmapUserScore.score.id)
        .to.be.a("number")
        .greaterThan(0)
        .that.satisfies(Number.isInteger)
    expect(beatmapUserScore.score.max_combo)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmapUserScore.score.mode)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    expect(beatmapUserScore.score.mode)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect([
        GameMode[GameMode.fruits],
        GameMode[GameMode.mania],
        GameMode[GameMode.osu],
        GameMode[GameMode.taiko],
    ]).to.include(beatmapUserScore.score.mode)
    expect(beatmapUserScore.score.mode_int)
        .to.be.a("number")
        .that.satisfies(Number.isInteger)
    expect([
        GameMode.fruits,
        GameMode.mania,
        GameMode.osu,
        GameMode.taiko,
    ]).to.include(beatmapUserScore.score.mode_int)
    expect(beatmapUserScore.score.mode).to.be.equal(
        GameMode[beatmapUserScore.score.mode_int],
    )
    if (options.checkGameMode !== undefined) {
        expect(beatmapUserScore.score.mode_int).to.be.equal(
            options.checkGameMode,
        )
    }
    expect(beatmapUserScore.score.mods)
        .to.be.an("array")
        .that.satisfies(Array.isArray)
    expect(
        beatmapUserScore.score.mods.some(
            (x) =>
                ![
                    GameMods[GameMods.EZ],
                    GameMods[GameMods.NF],
                    GameMods[GameMods.HT],
                    GameMods[GameMods.HR],
                    GameMods[GameMods.SD],
                    GameMods[GameMods.PF],
                    GameMods[GameMods.DT],
                    GameMods[GameMods.NC],
                    GameMods[GameMods.HD],
                    GameMods[GameMods.FI],
                    GameMods[GameMods.FL],
                    GameMods[GameMods.RL],
                    GameMods[GameMods.AP],
                    GameMods[GameMods.SO],
                    GameMods[GameMods.CP],
                    GameMods[GameMods.MR],
                    GameMods[GameMods.RD],
                    GameMods[GameMods.AT],
                    GameMods[GameMods.CM],
                    GameMods[GameMods.SV2],
                    GameMods[GameMods.TP],
                ].includes(x),
        ),
    ).to.be.false
    expect(beatmapUserScore.score.passed).to.be.a("boolean")
    expect(beatmapUserScore.score.perfect).to.be.a("boolean")
    // TODO
    expect(beatmapUserScore.score.pp).to.be.a("number")
    expect(beatmapUserScore.score.rank).to.be.a("string")
    expect(beatmapUserScore.score.replay).to.be.a("boolean")
    expect(beatmapUserScore.score.score).to.be.a("number")
    expect(beatmapUserScore.score.statistics).to.be.an("object")
    expect(beatmapUserScore.score.user).to.be.a("string")
    expect(beatmapUserScore.score.user_id)
        .to.be.a("number")
        .greaterThanOrEqual(0)
        .that.satisfies(Number.isInteger)
    if (beatmapUserScore.score.user !== undefined) {
        // TODO
    }
    if (options.checkUserId !== undefined) {
        expect(beatmapUserScore.score.user_id).to.be.equal(options.checkUserId)
    }
}
