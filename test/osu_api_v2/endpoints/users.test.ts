// Package imports
import { before, describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkOsuApiV2Error,
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestExpectedErrorType,
} from "../../helper/custom_errors"
import { checkUserObject, CheckUserObjectEndpoint } from "../types/check_user"
import {
    getOAuthSecretClientCredentials,
    getOAuthSecretRefreshToken,
    updateOAuthSecretRefreshToken,
} from "../get_oauth_secrets"
import osuApiV2, { GameMode, OsuApiV2ErrorCode, ScoresType } from "../../../src"
import {
    saveAndCheckResponse,
    saveResponse,
    timeoutForRequestsInMs,
} from "../../test_helper"
// Type imports
import type {
    OAuthAccessToken,
    OsuApiV2Error,
    OsuApiV2WebRequestError,
} from "../../../src"

export const usersTestSuite = (): Suite =>
    describe("users", () => {
        describe("client-credentials", () => {
            let oauthAccessToken: OAuthAccessToken

            before("before all test cases", async () => {
                // Get the OAuth access token
                const oauthClientCredentialsSecret =
                    await getOAuthSecretClientCredentials()
                oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                    oauthClientCredentialsSecret.clientId,
                    oauthClientCredentialsSecret.clientSecret,
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
                    const userNoPage = await osuApiV2.users.get(
                        oauthAccessToken,
                        26446321,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "26446321",
                        userNoPage,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            noPage: true,
                            noSupporter: true,
                            userId: 26446321,
                        },
                    )
                    // User ID
                    const defaultId = await osuApiV2.users.get(
                        oauthAccessToken,
                        9096716,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "9096716",
                        defaultId,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            userId: 9096716,
                        },
                    )
                    const osuId = await osuApiV2.users.get(
                        oauthAccessToken,
                        9096716,
                        GameMode.OSU_STANDARD,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "9096716_standard",
                        osuId,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            statisticsGameMode: GameMode.OSU_STANDARD,
                            userId: 9096716,
                        },
                    )
                    const taikoId = await osuApiV2.users.get(
                        oauthAccessToken,
                        9096716,
                        GameMode.OSU_TAIKO,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "9096716_taiko",
                        taikoId,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            statisticsGameMode: GameMode.OSU_TAIKO,
                            userId: 9096716,
                        },
                    )
                    const fruitsId = await osuApiV2.users.get(
                        oauthAccessToken,
                        9096716,
                        GameMode.OSU_CATCH,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "9096716_catch",
                        fruitsId,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            statisticsGameMode: GameMode.OSU_CATCH,
                            userId: 9096716,
                        },
                    )
                    const maniaId = await osuApiV2.users.get(
                        oauthAccessToken,
                        9096716,
                        GameMode.OSU_MANIA,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "9096716_mania",
                        maniaId,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            statisticsGameMode: GameMode.OSU_MANIA,
                            userId: 9096716,
                        },
                    )
                    // User name
                    const defaultName = await osuApiV2.users.get(
                        oauthAccessToken,
                        "Ooi",
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "Ooi",
                        defaultName,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            userName: "Ooi",
                        },
                    )
                    const osuName = await osuApiV2.users.get(
                        oauthAccessToken,
                        "Ooi",
                        GameMode.OSU_STANDARD,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "Ooi_osu",
                        osuName,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            statisticsGameMode: GameMode.OSU_STANDARD,
                            userName: "Ooi",
                        },
                    )
                    const taikoName = await osuApiV2.users.get(
                        oauthAccessToken,
                        "Ooi",
                        GameMode.OSU_TAIKO,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "Ooi_taiko",
                        taikoName,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            statisticsGameMode: GameMode.OSU_TAIKO,
                            userName: "Ooi",
                        },
                    )
                    const fruitsName = await osuApiV2.users.get(
                        oauthAccessToken,
                        "Ooi",
                        GameMode.OSU_CATCH,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "Ooi_catch",
                        fruitsName,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            statisticsGameMode: GameMode.OSU_CATCH,
                            userName: "Ooi",
                        },
                    )
                    const maniaName = await osuApiV2.users.get(
                        oauthAccessToken,
                        "Ooi",
                        GameMode.OSU_MANIA,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "Ooi_mania",
                        maniaName,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            statisticsGameMode: GameMode.OSU_MANIA,
                            userName: "Ooi",
                        },
                    )
                    // Check restricted account history/badges/title
                    const userWhitecat = await osuApiV2.users.get(
                        oauthAccessToken,
                        4504101,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "4504101",
                        userWhitecat,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            userId: 4504101,
                        },
                    )
                    const userMinusGn = await osuApiV2.users.get(
                        oauthAccessToken,
                        895581,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "895581",
                        userMinusGn,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            userId: 895581,
                        },
                    )
                    const userMrekk = await osuApiV2.users.get(
                        oauthAccessToken,
                        7562902,
                    )
                    await saveAndCheckResponse(
                        "users_get",
                        "7562902",
                        userMrekk,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.GET,
                            userId: 7562902,
                        },
                    )

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

            describe("me", () => {
                it("should throw if bad OAuth scope", async () => {
                    try {
                        const request = await osuApiV2.users.me(
                            oauthAccessToken,
                        )
                        expect.fail(
                            `request did not throw error: '${JSON.stringify(
                                request,
                            )}'`,
                        )
                    } catch (err) {
                        checkOsuApiV2WebRequestError(
                            err as OsuApiV2WebRequestError,
                            OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED,
                        )
                    }
                }).timeout(timeoutForRequestsInMs(1))
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
                    await osuApiV2.users.recentActivity(
                        oauthAccessToken,
                        9096716,
                    )

                    const recentActivity21 =
                        await osuApiV2.users.recentActivity(
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

                    const userRecent = await osuApiV2.users.scores(
                        oauthAccessToken,
                        9096716,
                        ScoresType.RECENT,
                    )
                    await saveResponse(
                        "users_scores",
                        "9096716_recent",
                        userRecent,
                    )
                    const userBest = await osuApiV2.users.scores(
                        oauthAccessToken,
                        9096716,
                        ScoresType.BEST,
                    )
                    await saveResponse(
                        "users_scores",
                        "9096716_first",
                        userBest,
                    )
                    const userFirst = await osuApiV2.users.scores(
                        oauthAccessToken,
                        9096716,
                        ScoresType.FIRST,
                    )
                    await saveResponse(
                        "users_scores",
                        "9096716_first",
                        userFirst,
                    )

                    const userRecentOsu30True = await osuApiV2.users.scores(
                        oauthAccessToken,
                        9096716,
                        ScoresType.RECENT,
                        GameMode.OSU_STANDARD,
                        3,
                        0,
                        true,
                    )
                    await saveResponse(
                        "users_scores",
                        "9096716_recent_osu_3_0_true",
                        userRecentOsu30True,
                    )
                    const userRecentUndefinedUndefinedUndefinedFalse =
                        await osuApiV2.users.scores(
                            oauthAccessToken,
                            9096716,
                            ScoresType.RECENT,
                            undefined,
                            undefined,
                            undefined,
                            false,
                        )
                    await saveResponse(
                        "users_scores",
                        "9096716_recent_undefined_undefined_undefined_false",
                        userRecentUndefinedUndefinedUndefinedFalse,
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

        describe("refresh-token", () => {
            let oauthAccessTokenIdentityScope: OAuthAccessToken

            before("before all test cases", async () => {
                // Get the OAuth access token
                const oauthRefreshTokenSecret =
                    await getOAuthSecretRefreshToken()
                const oauthAccessTokenIdentityScopeTemp =
                    await osuApiV2.oauth.refreshTokenGrant(
                        oauthRefreshTokenSecret.clientId,
                        oauthRefreshTokenSecret.clientSecret,
                        oauthRefreshTokenSecret.redirectUrl,
                        oauthRefreshTokenSecret.refreshToken,
                    )
                oauthAccessTokenIdentityScope =
                    oauthAccessTokenIdentityScopeTemp
                await updateOAuthSecretRefreshToken(
                    oauthRefreshTokenSecret,
                    oauthAccessTokenIdentityScopeTemp,
                )
            })

            describe("me", () => {
                it("should make request successfully", async () => {
                    const me = await osuApiV2.users.me(
                        oauthAccessTokenIdentityScope,
                    )
                    await saveAndCheckResponse(
                        "users_me",
                        "nothing",
                        me,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.ME,
                            hasIsRestricted: true,
                        },
                    )
                    const meStandard = await osuApiV2.users.me(
                        oauthAccessTokenIdentityScope,
                        GameMode.OSU_STANDARD,
                    )
                    await saveAndCheckResponse(
                        "users_me",
                        "standard",
                        meStandard,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.ME,
                            hasIsRestricted: true,
                            statisticsGameMode: GameMode.OSU_STANDARD,
                        },
                    )
                    const meCatch = await osuApiV2.users.me(
                        oauthAccessTokenIdentityScope,
                        GameMode.OSU_CATCH,
                    )
                    await saveAndCheckResponse(
                        "users_me",
                        "catch",
                        meCatch,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.ME,
                            hasIsRestricted: true,
                            statisticsGameMode: GameMode.OSU_CATCH,
                        },
                    )
                    const meMania = await osuApiV2.users.me(
                        oauthAccessTokenIdentityScope,
                        GameMode.OSU_MANIA,
                    )
                    await saveAndCheckResponse(
                        "users_me",
                        "mania",
                        meMania,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.ME,
                            hasIsRestricted: true,
                            statisticsGameMode: GameMode.OSU_MANIA,
                        },
                    )
                    const meTaiko = await osuApiV2.users.me(
                        oauthAccessTokenIdentityScope,
                        GameMode.OSU_TAIKO,
                    )
                    await saveAndCheckResponse(
                        "users_me",
                        "taiko",
                        meTaiko,
                        checkUserObject,
                        {
                            endpoint: CheckUserObjectEndpoint.ME,
                            hasIsRestricted: true,
                            statisticsGameMode: GameMode.OSU_TAIKO,
                        },
                    )
                }).timeout(timeoutForRequestsInMs(5))
            })
        })
    })
