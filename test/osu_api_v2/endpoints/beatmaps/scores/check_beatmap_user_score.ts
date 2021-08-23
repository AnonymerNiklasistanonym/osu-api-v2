import { expect } from "chai"
import moment from "moment"
import { RankedStatus } from "../../../../../src/types/beatmap"
import { GameMode } from "../../../../../src/types/game_mode"
import { GameMods } from "../../../../../src/types/game_mods"
import { BeatmapUserScore, Score } from "../../../../../src/types/score"
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
        GameMode[GameMode.fruits],
        GameMode[GameMode.mania],
        GameMode[GameMode.osu],
        GameMode[GameMode.taiko],
    ]).to.include(beatmapUserScoreScore.mode)
    expect(beatmapUserScoreScore.mode_int)
        .to.be.a("number")
        .that.satisfies(Number.isInteger)
    expect([
        GameMode.fruits,
        GameMode.mania,
        GameMode.osu,
        GameMode.taiko,
    ]).to.include(beatmapUserScoreScore.mode_int)
    expect(beatmapUserScoreScore.mode).to.be.equal(
        GameMode[beatmapUserScoreScore.mode_int],
    )
    if (options.checkGameMode !== undefined) {
        expect(beatmapUserScoreScore.mode_int).to.be.equal(
            options.checkGameMode,
        )
    }
    expect(beatmapUserScoreScore.mods)
        .to.be.an("array")
        .that.satisfies(Array.isArray)
    expect(
        beatmapUserScoreScore.mods.some(
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
