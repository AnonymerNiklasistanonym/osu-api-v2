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
import osuApiV2, { RankStatusInt } from "../../../src"
import {
    saveAndCheckResponse,
    saveResponse,
    timeoutForRequestsInMs,
} from "../../test_helper"
import { checkBeatmapsetObject } from "../types/check_beatmapset"
// Type imports
import type { OAuthAccessToken, OsuApiV2WebRequestError } from "../../../src"

export const beatmapsetsTestSuite = (): Suite =>
    describe("beatmapsets", () => {
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
            it("should throw if access token is invalid", async () => {
                try {
                    const request = await osuApiV2.beatmapsets.get(
                        invalidOAuthAccessToken,
                        1196347,
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
                    const request = await osuApiV2.beatmapsets.get(
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
                const beatmapRankedOsu = await osuApiV2.beatmapsets.get(
                    oauthAccessToken,
                    1196347,
                )
                await saveAndCheckResponse(
                    "beatmapsets_get",
                    "1196347",
                    beatmapRankedOsu,
                    checkBeatmapsetObject,
                    {
                        id: 1196347,
                        rankStatus: RankStatusInt.RANKED,
                    },
                )
                const beatmapGraveyardOsu = await osuApiV2.beatmapsets.get(
                    oauthAccessToken,
                    819456,
                )
                await saveAndCheckResponse(
                    "beatmapsets_get",
                    "819456",
                    beatmapGraveyardOsu,
                    checkBeatmapsetObject,
                    {
                        id: 819456,
                        rankStatus: RankStatusInt.GRAVEYARD,
                    },
                )
                const beatmapLovedOsu = await osuApiV2.beatmapsets.get(
                    oauthAccessToken,
                    34256,
                )
                await saveAndCheckResponse(
                    "beatmapsets_get",
                    "819456",
                    beatmapLovedOsu,
                    checkBeatmapsetObject,
                    {
                        id: 34256,
                        rankStatus: RankStatusInt.LOVED,
                    },
                )
                const beatmapApprovedOsu = await osuApiV2.beatmapsets.get(
                    oauthAccessToken,
                    108296,
                )
                await saveAndCheckResponse(
                    "beatmapsets_get",
                    "108296",
                    beatmapApprovedOsu,
                    checkBeatmapsetObject,
                    {
                        id: 108296,
                        rankStatus: RankStatusInt.APPROVED,
                    },
                )
                const beatmapGraveyardNoCoverOsu =
                    await osuApiV2.beatmapsets.get(oauthAccessToken, 150945)
                await saveAndCheckResponse(
                    "beatmapsets_get",
                    "150945",
                    beatmapGraveyardNoCoverOsu,
                    checkBeatmapsetObject,
                    {
                        id: 150945,
                        rankStatus: RankStatusInt.GRAVEYARD,
                    },
                )
            }).timeout(timeoutForRequestsInMs(3))
        })

        describe("search", () => {
            it("should throw if access token is invalid", async () => {
                try {
                    const request = await osuApiV2.beatmapsets.search(
                        invalidOAuthAccessToken,
                        "Nekojarashi",
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
            it("should make request successfully", async () => {
                const beatmapsetRankedOsu = await osuApiV2.beatmapsets.search(
                    oauthAccessToken,
                    "Nekojarashi",
                )
                await saveResponse(
                    "beatmapsets_search",
                    "Nekojarashi",
                    beatmapsetRankedOsu,
                )
                const beatmapsetRankedOsu2 = await osuApiV2.beatmapsets.search(
                    oauthAccessToken,
                    "Singularity - Au5",
                )
                await saveResponse(
                    "beatmapsets_search",
                    "Singularity_-_Au5",
                    beatmapsetRankedOsu2,
                )
                const beatmapsetAnyType = await osuApiV2.beatmapsets.search(
                    oauthAccessToken,
                    "Disorder Rebirth",
                    false,
                )
                await saveResponse(
                    "beatmapsets_search",
                    "Disorder_Rebirth_false",
                    beatmapsetAnyType,
                )
            }).timeout(timeoutForRequestsInMs(3))
        })
    })
