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

export const searchTestSuite = (): Suite =>
    describe("search", () => {
        let oauthAccessToken: OAuthAccessToken

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await readOauthCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        describe("user", () => {
            it("should throw if access token is invalid", async () => {
                try {
                    const request = await osuApiV2.search.user(
                        {
                            access_token: "",
                            expires_in: 100,
                            token_type: "",
                        },
                        "niklas616",
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
                const searchResultUser1 = await osuApiV2.search.user(
                    oauthAccessToken,
                    "niklas616",
                )
                await cacheResponse(
                    "search_user",
                    "niklas616",
                    searchResultUser1,
                )
                const searchResultUser2 = await osuApiV2.search.user(
                    oauthAccessToken,
                    "Ooi",
                )
                await cacheResponse("search_user", "Ooi", searchResultUser2)
            }).timeout(timeoutForRequestsInMs(2))
        })
    })
