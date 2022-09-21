// Package imports
import { before, describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    cacheResponse,
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestErrorType,
    timeoutForRequestsInMs,
} from "../../helper.test"
import osuApiV2, {
    OAuthAccessToken,
    OsuApiV2WebRequestError,
} from "../../../src/index"
import { readOauthCredentials } from "../read_oauth_credentials"

export const beatmapsetsTestSuite = (): Suite =>
    describe("beatmapsets", () => {
        let oauthAccessToken: OAuthAccessToken

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await readOauthCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        describe("get", () => {
            it("should throw if access token is invalid", async () => {
                try {
                    const request = await osuApiV2.beatmapsets.get(
                        {
                            access_token: "",
                            expires_in: 100,
                            token_type: "",
                        },
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
                        OsuApiV2WebRequestErrorType.UNAUTHORIZED,
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
                        OsuApiV2WebRequestErrorType.NOT_FOUND,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should make request successfully", async () => {
                const beatmapRankedOsu = await osuApiV2.beatmapsets.get(
                    oauthAccessToken,
                    1196347,
                )
                await cacheResponse(
                    "beatmapsets_get",
                    "1196347",
                    beatmapRankedOsu,
                )
                const beatmapGraveyardOsu = await osuApiV2.beatmapsets.get(
                    oauthAccessToken,
                    819456,
                )
                await cacheResponse(
                    "beatmapsets_get",
                    "819456",
                    beatmapGraveyardOsu,
                )
                const beatmapLovedOsu = await osuApiV2.beatmapsets.get(
                    oauthAccessToken,
                    34256,
                )
                await cacheResponse("beatmapsets_get", "34256", beatmapLovedOsu)
            }).timeout(timeoutForRequestsInMs(3))
        })

        describe("search", () => {
            it("should throw if access token is invalid", async () => {
                try {
                    const request = await osuApiV2.beatmapsets.search(
                        {
                            access_token: "",
                            expires_in: 100,
                            token_type: "",
                        },
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
                        OsuApiV2WebRequestErrorType.UNAUTHORIZED,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should make request successfully", async () => {
                const beatmapsetRankedOsu = await osuApiV2.beatmapsets.search(
                    oauthAccessToken,
                    "Nekojarashi",
                )
                await cacheResponse(
                    "beatmapsets_search",
                    "Nekojarashi",
                    beatmapsetRankedOsu,
                )
                const beatmapsetRankedOsu2 = await osuApiV2.beatmapsets.search(
                    oauthAccessToken,
                    "Singularity - Au5",
                )
                await cacheResponse(
                    "beatmapsets_search",
                    "Singularity_-_Au5",
                    beatmapsetRankedOsu2,
                )
            }).timeout(timeoutForRequestsInMs(2))
        })
    })
