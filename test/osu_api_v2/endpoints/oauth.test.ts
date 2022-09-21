// Package imorts
import { before, describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestErrorType,
    timeoutForRequestsInMs,
} from "../../helper.test"
import osuApiV2, { OsuApiV2WebRequestError } from "../../../src/index"
import { readOauthCredentials } from "../read_oauth_credentials"
// Type imports
import type { OAuthCredentials } from "../read_oauth_credentials"

export const oauthTestSuite = (): Suite =>
    describe("oauth", () => {
        let oauthCredentials: OAuthCredentials

        before("before all test cases in oauth block", async () => {
            // Get the local OAuth Credentials
            oauthCredentials = await readOauthCredentials()
        })

        describe("clientCredentialsGrant", () => {
            it("should throw if client id is invalid", async () => {
                try {
                    const request = await osuApiV2.oauth.clientCredentialsGrant(
                        -99,
                        oauthCredentials.clientSecret,
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
            it("should throw if client secret is invalid", async () => {
                try {
                    const request = await osuApiV2.oauth.clientCredentialsGrant(
                        oauthCredentials.clientId,
                        "abc",
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
                const oauthAccessToken =
                    await osuApiV2.oauth.clientCredentialsGrant(
                        oauthCredentials.clientId,
                        oauthCredentials.clientSecret,
                    )
                expect(oauthAccessToken.access_token)
                    .to.be.a("string")
                    .with.a.lengthOf.greaterThan(0)
                expect(oauthAccessToken.token_type).to.equal("Bearer")
                expect(oauthAccessToken.expires_in).to.be.a("number").above(0)
            }).timeout(timeoutForRequestsInMs(1))
        })
    })
