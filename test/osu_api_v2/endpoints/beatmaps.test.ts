// Package imports
import { before, describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestExpectedErrorType,
} from "../../helper/types/check_custom_errors"
import {
    getOAuthSecretClientCredentials,
    invalidOAuthAccessToken,
} from "../get_oauth_secrets"
import osuApiV2, { GameMode, RankStatus } from "../../../src"
import { saveAndCheckResponse, timeoutForRequestsInMs } from "../../test_helper"
import { checkBeatmapObject } from "../types/check_beatmap"
import { scoresTestSuite } from "./beatmaps/scores.test"
// Type imports
import type {
    OAuthAccessTokenResponse,
    OsuApiV2WebRequestError,
} from "../../../src"

export const beatmapsTestSuite = (): Suite =>
    describe("beatmaps", () => {
        let oauthAccessToken: OAuthAccessTokenResponse

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await getOAuthSecretClientCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        describe("get", () => {
            it("should throw if access token is invalid", async () => {
                try {
                    const request = await osuApiV2.beatmaps.get(
                        invalidOAuthAccessToken,
                        112385,
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
                    const request = await osuApiV2.beatmaps.get(
                        oauthAccessToken,
                        -112385,
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
                const beatmapRankedOsu = await osuApiV2.beatmaps.get(
                    oauthAccessToken,
                    3086537,
                )
                await saveAndCheckResponse(
                    "beatmaps_get",
                    "2927048_10",
                    beatmapRankedOsu,
                    checkBeatmapObject,
                    {
                        gameMode: GameMode.OSU_STANDARD,
                        id: 3086537,
                        rankStatus: RankStatus.RANKED,
                    },
                )
                const beatmapGraveyardOsu = await osuApiV2.beatmaps.get(
                    oauthAccessToken,
                    1718102,
                )
                await saveAndCheckResponse(
                    "beatmaps_get",
                    "1718102",
                    beatmapGraveyardOsu,
                    checkBeatmapObject,
                    {
                        gameMode: GameMode.OSU_STANDARD,
                        id: 1718102,
                        rankStatus: RankStatus.GRAVEYARD,
                    },
                )
                const beatmapLovedOsu = await osuApiV2.beatmaps.get(
                    oauthAccessToken,
                    112385,
                )
                await saveAndCheckResponse(
                    "beatmaps_get",
                    "112385",
                    beatmapLovedOsu,
                    checkBeatmapObject,
                    {
                        gameMode: GameMode.OSU_STANDARD,
                        id: 112385,
                        rankStatus: RankStatus.LOVED,
                    },
                )
            }).timeout(timeoutForRequestsInMs(3))
        })

        describe("lookup", () => {
            it("should throw if access token is invalid", async () => {
                try {
                    const request = await osuApiV2.beatmaps.lookup(
                        invalidOAuthAccessToken,
                        undefined,
                        undefined,
                        112385,
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
                    const request = await osuApiV2.beatmaps.lookup(
                        oauthAccessToken,
                        undefined,
                        undefined,
                        -112385,
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
                const beatmapRankedOsu = await osuApiV2.beatmaps.lookup(
                    oauthAccessToken,
                    undefined,
                    undefined,
                    3086537,
                )
                await saveAndCheckResponse(
                    "beatmaps_lookup",
                    "undefined_undefined_3086537",
                    beatmapRankedOsu,
                    checkBeatmapObject,
                    {
                        gameMode: GameMode.OSU_STANDARD,
                        id: 3086537,
                        rankStatus: RankStatus.RANKED,
                    },
                )
                const beatmapGraveyardOsuId = await osuApiV2.beatmaps.lookup(
                    oauthAccessToken,
                    undefined,
                    undefined,
                    1718102,
                )
                await saveAndCheckResponse(
                    "beatmaps_lookup",
                    "undefined_undefined_1718102",
                    beatmapGraveyardOsuId,
                    checkBeatmapObject,
                    {
                        gameMode: GameMode.OSU_STANDARD,
                        id: 1718102,
                        rankStatus: RankStatus.GRAVEYARD,
                    },
                )
                const beatmapLovedOsuId = await osuApiV2.beatmaps.lookup(
                    oauthAccessToken,
                    undefined,
                    undefined,
                    112385,
                )
                await saveAndCheckResponse(
                    "beatmaps_lookup",
                    "undefined_undefined_112385",
                    beatmapLovedOsuId,
                    checkBeatmapObject,
                    {
                        gameMode: GameMode.OSU_STANDARD,
                        id: 112385,
                        rankStatus: RankStatus.LOVED,
                    },
                )
            }).timeout(timeoutForRequestsInMs(3))
        })

        scoresTestSuite()
    })
