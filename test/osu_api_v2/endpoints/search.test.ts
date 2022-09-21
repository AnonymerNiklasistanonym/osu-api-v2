// Package imports
import { before, describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestExpectedErrorType,
} from "../../helper/custom_errors"
import {
    getOAuthSecretClientCredentials,
    invalidOAuthAccessToken,
} from "../get_oauth_secrets"
import { saveResponse, timeoutForRequestsInMs } from "../../test_helper"
import osuApiV2 from "../../../src/index"
// Type imports
import type {
    OAuthAccessToken,
    OsuApiV2WebRequestError,
} from "../../../src/index"

export const searchTestSuite = (): Suite =>
    describe("search", () => {
        let oauthAccessToken: OAuthAccessToken

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await getOAuthSecretClientCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        describe("user", () => {
            it("should throw if access token is invalid", async () => {
                try {
                    const request = await osuApiV2.search.user(
                        invalidOAuthAccessToken,
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
                        OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should make request successfully", async () => {
                const searchResultUser1 = await osuApiV2.search.user(
                    oauthAccessToken,
                    "niklas616",
                )
                await saveResponse(
                    "search_user",
                    "niklas616",
                    searchResultUser1,
                )
                const searchResultUser2 = await osuApiV2.search.user(
                    oauthAccessToken,
                    "Ooi",
                )
                await saveResponse("search_user", "Ooi", searchResultUser2)
            }).timeout(timeoutForRequestsInMs(2))
        })
    })
