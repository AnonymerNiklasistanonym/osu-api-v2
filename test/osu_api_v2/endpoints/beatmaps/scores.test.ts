// Package imports
import { describe, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestExpectedErrorType,
} from "../../../helper/types/check_custom_errors"
import {
    getOAuthSecretClientCredentials,
    invalidOAuthAccessToken,
} from "../../get_oauth_secrets"
import osuApiV2, { GameMode } from "../../../../src"
import {
    saveAndCheckResponse,
    timeoutForRequestsInMs,
} from "../../../test_helper"
import { checkBeatmapUserScoreObject } from "../../types/check_score"
// Type imports
import type {
    OAuthAccessTokenResponse,
    OsuApiV2WebRequestError,
} from "../../../../src"

export const scoresTestSuite = (): Suite =>
    describe("scores", () => {
        let oauthAccessToken: OAuthAccessTokenResponse

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await getOAuthSecretClientCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        describe("users", () => {
            it("should throw if access token is invalid", async () => {
                try {
                    const request = await osuApiV2.beatmaps.scores.users(
                        invalidOAuthAccessToken,
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
                        {
                            errorType:
                                OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED,
                        },
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
                        {
                            errorType:
                                OsuApiV2WebRequestExpectedErrorType.NOT_FOUND,
                        },
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
                        {
                            errorType:
                                OsuApiV2WebRequestExpectedErrorType.NOT_FOUND,
                        },
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should make request successfully", async () => {
                const beatmapUserScore0 = await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    1095534,
                    18508852,
                )
                await saveAndCheckResponse(
                    "beatmaps_scores_users",
                    "1095534_18508852",
                    beatmapUserScore0,
                    checkBeatmapUserScoreObject,
                    {
                        beatmapId: 1095534,
                        userId: 18508852,
                    },
                )
                const beatmapUserScore1 = await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    1095534,
                    18508852,
                    GameMode.OSU_STANDARD,
                )
                await saveAndCheckResponse(
                    "beatmaps_scores_users",
                    "1095534_18508852",
                    beatmapUserScore1,
                    checkBeatmapUserScoreObject,
                    {
                        beatmapId: 1095534,
                        gameMode: GameMode.OSU_STANDARD,
                        userId: 18508852,
                    },
                )
                const beatmapUserScore2 = await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    744305,
                    18508852,
                    GameMode.OSU_STANDARD,
                )
                await saveAndCheckResponse(
                    "beatmaps_scores_users",
                    "744305_18508852",
                    beatmapUserScore2,
                    checkBeatmapUserScoreObject,
                    {
                        beatmapId: 744305,
                        gameMode: GameMode.OSU_STANDARD,
                        userId: 18508852,
                    },
                )
            }).timeout(timeoutForRequestsInMs(3))
        })
    })
