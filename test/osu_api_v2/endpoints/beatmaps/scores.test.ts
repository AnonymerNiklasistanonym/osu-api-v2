// Package imports
import { describe, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestErrorType,
    timeoutForRequestsInMs,
} from "../../../helper.test"
import osuApiV2, {
    GameMode,
    OsuApiV2WebRequestError,
} from "../../../../src/index"
import { checkBeatmapUserScoreObject } from "./scores/check_beatmap_user_score"
import { readOauthCredentials } from "../../read_oauth_credentials"
// Type imports
import type { OAuthAccessToken } from "../../../../src/index"

export const scoresTestSuite = (): Suite =>
    describe("scores", () => {
        let oauthAccessToken: OAuthAccessToken

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await readOauthCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        describe("users", () => {
            it("should throw if access token is invalid", async () => {
                try {
                    const request = await osuApiV2.beatmaps.scores.users(
                        {
                            access_token: "",
                            expires_in: 100,
                            token_type: "",
                        },
                        1095534,
                        18508852,
                        GameMode.OSU_STANDARD,
                    )
                    expect.fail(
                        `request did not throw error: '${JSON.stringify(
                            request,
                        )}'`,
                    )
                } catch (err) {
                    checkOsuApiV2WebRequestError(
                        err as OsuApiV2WebRequestError,
                        OsuApiV2WebRequestErrorType.UNAUTHORIZED,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should throw if id is invalid", async () => {
                try {
                    const request = await osuApiV2.beatmaps.scores.users(
                        oauthAccessToken,
                        -1095534,
                        18508852,
                        GameMode.OSU_STANDARD,
                    )
                    expect.fail(
                        `request did not throw error: '${JSON.stringify(
                            request,
                        )}'`,
                    )
                } catch (err) {
                    checkOsuApiV2WebRequestError(
                        err as OsuApiV2WebRequestError,
                        OsuApiV2WebRequestErrorType.NOT_FOUND,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should throw if map has no leaderboard", async () => {
                try {
                    const request = await osuApiV2.beatmaps.scores.users(
                        oauthAccessToken,
                        1718102,
                        18508852,
                        GameMode.OSU_STANDARD,
                    )
                    expect.fail(
                        `request did not throw error: '${JSON.stringify(
                            request,
                        )}'`,
                    )
                } catch (err) {
                    checkOsuApiV2WebRequestError(
                        err as OsuApiV2WebRequestError,
                        OsuApiV2WebRequestErrorType.NOT_FOUND,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should make request successfully", async () => {
                const beatmapUserScore0 = await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    1095534,
                    18508852,
                )
                await checkBeatmapUserScoreObject(beatmapUserScore0, {
                    checkBeatmapId: 1095534,
                    checkGameMode: GameMode.OSU_STANDARD,
                    checkUserId: 18508852,
                })
                const beatmapUserScore1 = await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    1095534,
                    18508852,
                    GameMode.OSU_STANDARD,
                )
                await checkBeatmapUserScoreObject(beatmapUserScore1, {
                    checkBeatmapId: 1095534,
                    checkGameMode: GameMode.OSU_STANDARD,
                    checkUserId: 18508852,
                })
                const beatmapUserScore2 = await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    744305,
                    18508852,
                    GameMode.OSU_STANDARD,
                )
                await checkBeatmapUserScoreObject(beatmapUserScore2, {
                    checkBeatmapId: 744305,
                    checkGameMode: GameMode.OSU_STANDARD,
                    checkUserId: 18508852,
                })
            }).timeout(timeoutForRequestsInMs(3))
        })
    })
