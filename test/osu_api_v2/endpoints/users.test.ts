// Package imports
import { before, describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkOsuApiV2Error,
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestExpectedErrorType,
} from "../../helper/custom_errors"
import osuApiV2, {
    GameMode,
    OsuApiV2ErrorCode,
    ScoresType,
} from "../../../src/index"
import { saveResponse, timeoutForRequestsInMs } from "../../test_helper"
import { getOAuthSecretClientCredentials } from "../get_oauth_secrets"
// Type imports
import type {
    OAuthAccessToken,
    OsuApiV2Error,
    OsuApiV2WebRequestError,
} from "../../../src/index"

export const usersTestSuite = (): Suite =>
    describe("users", () => {
        let oauthAccessToken: OAuthAccessToken

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await getOAuthSecretClientCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        describe("get", () => {
            it("should throw if id is invalid", async () => {
                try {
                    const request = await osuApiV2.users.get(
                        oauthAccessToken,
                        -9096716,
                    )
                    expect.fail(
                        `request did not throw error: '${JSON.stringify(
                            request,
                        )}'`,
                    )
                } catch (err) {
                    checkOsuApiV2WebRequestError(
                        err as OsuApiV2WebRequestError,
                        OsuApiV2WebRequestExpectedErrorType.NOT_FOUND,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should throw if name is '-1'", async () => {
                try {
                    const request = await osuApiV2.users.get(
                        oauthAccessToken,
                        "-1",
                    )
                    expect.fail(
                        `request did not throw error: '${JSON.stringify(
                            request,
                        )}'`,
                    )
                } catch (err) {
                    checkOsuApiV2WebRequestError(
                        err as OsuApiV2WebRequestError,
                        OsuApiV2WebRequestExpectedErrorType.NOT_FOUND,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should throw if name is '' and no account is found", async () => {
                try {
                    const request = await osuApiV2.users.get(
                        oauthAccessToken,
                        "",
                    )
                    expect.fail(
                        `request did not throw error: '${JSON.stringify(
                            request,
                        )}'`,
                    )
                } catch (err) {
                    checkOsuApiV2Error(
                        err as OsuApiV2Error,
                        OsuApiV2ErrorCode.NOT_FOUND,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should make request successfully", async () => {
                // User ID
                const defaultId = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                )
                await saveResponse("users_get", "9096716", defaultId)
                const osuId = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                    GameMode.OSU_STANDARD,
                )
                const taikoId = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                    GameMode.OSU_TAIKO,
                )
                const fruitsId = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                    GameMode.OSU_CATCH,
                )
                const maniaId = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                    GameMode.OSU_MANIA,
                )
                if (fruitsId.rank_history?.mode !== undefined) {
                    expect(fruitsId.rank_history?.mode).equals(
                        GameMode.OSU_CATCH,
                    )
                }
                if (taikoId.rank_history?.mode !== undefined) {
                    expect(taikoId.rank_history?.mode).equals(
                        GameMode.OSU_TAIKO,
                    )
                }
                if (maniaId.rank_history?.mode !== undefined) {
                    expect(maniaId.rank_history?.mode).equals(
                        GameMode.OSU_MANIA,
                    )
                }
                if (osuId.rank_history?.mode !== undefined) {
                    expect(osuId.rank_history?.mode).equals(
                        GameMode.OSU_STANDARD,
                    )
                }
                // User name
                const defaultName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "Ooi",
                )
                await saveResponse("users_get", "Ooi", defaultName)
                const osuName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.OSU_STANDARD,
                )
                const taikoName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.OSU_TAIKO,
                )
                const fruitsName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.OSU_CATCH,
                )
                const maniaName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.OSU_MANIA,
                )
                if (fruitsName.rank_history?.mode !== undefined) {
                    expect(fruitsName.rank_history?.mode).equals(
                        GameMode.OSU_CATCH,
                    )
                }
                if (taikoName.rank_history?.mode !== undefined) {
                    expect(taikoName.rank_history?.mode).equals(
                        GameMode.OSU_TAIKO,
                    )
                }
                if (maniaName.rank_history?.mode !== undefined) {
                    expect(maniaName.rank_history?.mode).equals(
                        GameMode.OSU_MANIA,
                    )
                }
                if (osuName.rank_history?.mode !== undefined) {
                    expect(osuName.rank_history?.mode).equals(
                        GameMode.OSU_STANDARD,
                    )
                }
            }).timeout(timeoutForRequestsInMs(10))
            it("user playmode should equal 'osu'", async () => {
                const userId = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                )
                expect(userId.playmode).equals(GameMode.OSU_STANDARD)
                const userName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "syaron105",
                )
                expect(userName.playmode).equals(GameMode.OSU_TAIKO)
            }).timeout(timeoutForRequestsInMs(2))
            it("user playmode should equal 'taiko'", async () => {
                const userId = await osuApiV2.users.get(
                    oauthAccessToken,
                    8741695,
                )
                expect(userId.playmode).equals(GameMode.OSU_TAIKO)
                const userName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "syaron105",
                )
                expect(userName.playmode).equals(GameMode.OSU_TAIKO)
            }).timeout(timeoutForRequestsInMs(2))
            it("user playmode should equal 'fruits'", async () => {
                const userId = await osuApiV2.users.get(
                    oauthAccessToken,
                    4158549,
                )
                expect(userId.playmode).equals(GameMode.OSU_CATCH)
                const userName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "YesMyDarknesss",
                )
                expect(userName.playmode).equals(GameMode.OSU_CATCH)
            }).timeout(timeoutForRequestsInMs(2))
            it("user playmode should equal 'mania'", async () => {
                const userId = await osuApiV2.users.get(
                    oauthAccessToken,
                    758406,
                )
                expect(userId.playmode).equals(GameMode.OSU_MANIA)
                const userName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "dressurf",
                )
                expect(userName.playmode).equals(GameMode.OSU_MANIA)
            }).timeout(timeoutForRequestsInMs(2))
        })

        describe("recentActivity", () => {
            it("should throw if id is invalid", async () => {
                try {
                    const request = await osuApiV2.users.recentActivity(
                        oauthAccessToken,
                        -9096716,
                    )
                    expect.fail(
                        `request did not throw error: '${JSON.stringify(
                            request,
                        )}'`,
                    )
                } catch (err) {
                    checkOsuApiV2WebRequestError(
                        err as OsuApiV2WebRequestError,
                        OsuApiV2WebRequestExpectedErrorType.NOT_FOUND,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should make request successfully", async () => {
                await osuApiV2.users.recentActivity(oauthAccessToken, 9096716)

                const recentActivity21 = await osuApiV2.users.recentActivity(
                    oauthAccessToken,
                    9096716,
                    2,
                    1,
                )
                await saveResponse(
                    "users_recent_activity",
                    "9096716_2_1",
                    recentActivity21,
                )

                const recentActivity2 = await osuApiV2.users.recentActivity(
                    oauthAccessToken,
                    2927048,
                    2,
                )
                await saveResponse(
                    "users_recent_activity",
                    "2927048_2",
                    recentActivity2,
                )
            }).timeout(timeoutForRequestsInMs(3))
        })

        describe("scores", () => {
            it("should throw if id is invalid", async () => {
                try {
                    const request = await osuApiV2.users.scores(
                        oauthAccessToken,
                        -9096716,
                        ScoresType.RECENT,
                    )
                    expect.fail(
                        `request did not throw error: '${JSON.stringify(
                            request,
                        )}'`,
                    )
                } catch (err) {
                    checkOsuApiV2WebRequestError(
                        err as OsuApiV2WebRequestError,
                        OsuApiV2WebRequestExpectedErrorType.NOT_FOUND,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should make request successfully", async () => {
                const userBestOsu21 = await osuApiV2.users.scores(
                    oauthAccessToken,
                    9096716,
                    ScoresType.BEST,
                    GameMode.OSU_STANDARD,
                    2,
                    1,
                )
                await saveResponse(
                    "users_scores",
                    "9096716_best_osu_2_1",
                    userBestOsu21,
                )

                await osuApiV2.users.scores(
                    oauthAccessToken,
                    9096716,
                    ScoresType.RECENT,
                )
                await osuApiV2.users.scores(
                    oauthAccessToken,
                    9096716,
                    ScoresType.BEST,
                )
                await osuApiV2.users.scores(
                    oauthAccessToken,
                    9096716,
                    ScoresType.FIRST_PLACE,
                )
                await osuApiV2.users.scores(
                    oauthAccessToken,
                    9096716,
                    ScoresType.RECENT,
                    GameMode.OSU_STANDARD,
                    3,
                    0,
                    true,
                )
                await osuApiV2.users.scores(
                    oauthAccessToken,
                    9096716,
                    ScoresType.RECENT,
                    undefined,
                    undefined,
                    undefined,
                    false,
                )

                const userRecentOsu20True = await osuApiV2.users.scores(
                    oauthAccessToken,
                    2927048,
                    ScoresType.RECENT,
                    GameMode.OSU_STANDARD,
                    2,
                    0,
                    true,
                )
                await saveResponse(
                    "users_scores",
                    "2927048_recent_osu_2_0_true",
                    userRecentOsu20True,
                )
            }).timeout(timeoutForRequestsInMs(7))
        })
    })
