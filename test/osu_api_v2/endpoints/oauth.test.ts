// Package imports
import { before, describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestExpectedErrorType,
} from "../../helper/custom_errors"
import osuApiV2, { OsuApiV2WebRequestError } from "../../../src/index"
import {
    getOAuthSecretClientCredentials,
    getOAuthSecretRefreshToken,
    OAuthSecretRefreshToken,
} from "../get_oauth_secrets"
import { timeoutForRequestsInMs } from "../../test_helper"
// Type imports
import type { OAuthSecretClientCredentials } from "../get_oauth_secrets"

export const oauthTestSuite = (): Suite =>
    describe("oauth", () => {
        let oauthClientCredentials: OAuthSecretClientCredentials
        let oauthRefreshToken: OAuthSecretRefreshToken

        before("before all test cases", async () => {
            // Get the local OAuth Credentials
            oauthClientCredentials = await getOAuthSecretClientCredentials()
            oauthRefreshToken = await getOAuthSecretRefreshToken()
        })

        describe("clientCredentialsGrant", () => {
            it("should throw if client id is invalid", async () => {
                try {
                    const request = await osuApiV2.oauth.clientCredentialsGrant(
                        -99,
                        oauthClientCredentials.clientSecret,
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
            it("should throw if client secret is invalid", async () => {
                try {
                    const request = await osuApiV2.oauth.clientCredentialsGrant(
                        oauthClientCredentials.clientId,
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
                        OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED,
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("should make request successfully", async () => {
                const oauthAccessToken =
                    await osuApiV2.oauth.clientCredentialsGrant(
                        oauthClientCredentials.clientId,
                        oauthClientCredentials.clientSecret,
                    )
                expect(oauthAccessToken.access_token)
                    .to.be.a("string")
                    .with.a.lengthOf.greaterThan(0)
                expect(oauthAccessToken.token_type).to.equal("Bearer")
                expect(oauthAccessToken.expires_in).to.be.a("number").above(0)
            }).timeout(timeoutForRequestsInMs(1))
        })

        describe("refreshTokenGrant", () => {
            it("should throw if client id is invalid", async () => {
                try {
                    const request = await osuApiV2.oauth.refreshTokenGrant(
                        -99,
                        oauthRefreshToken.clientSecret,
                        oauthRefreshToken.redirectUrl,
                        oauthRefreshToken.refreshToken,
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
            it("should throw if client secret is invalid", async () => {
                try {
                    const request = await osuApiV2.oauth.refreshTokenGrant(
                        oauthRefreshToken.clientId,
                        "-1",
                        oauthRefreshToken.redirectUrl,
                        oauthRefreshToken.refreshToken,
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
            it("should throw if redirect URL is invalid", async () => {
                try {
                    const request = await osuApiV2.oauth.refreshTokenGrant(
                        oauthRefreshToken.clientId,
                        oauthRefreshToken.clientSecret,
                        "http://bad.com",
                        oauthRefreshToken.refreshToken,
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
            it("should throw if refresh token is invalid", async () => {
                try {
                    const request = await osuApiV2.oauth.refreshTokenGrant(
                        oauthRefreshToken.clientId,
                        oauthRefreshToken.clientSecret,
                        oauthRefreshToken.redirectUrl,
                        "asakdkabd",
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
                const oauthAccessTokenWithRefreshToken =
                    await osuApiV2.oauth.refreshTokenGrant(
                        oauthRefreshToken.clientId,
                        oauthRefreshToken.clientSecret,
                        oauthRefreshToken.redirectUrl,
                        oauthRefreshToken.refreshToken,
                    )
                expect(oauthAccessTokenWithRefreshToken.access_token)
                    .to.be.a("string")
                    .with.a.lengthOf.greaterThan(0)
                expect(oauthAccessTokenWithRefreshToken.token_type).to.equal(
                    "Bearer",
                )
                expect(oauthAccessTokenWithRefreshToken.expires_in)
                    .to.be.a("number")
                    .above(0)
                expect(oauthAccessTokenWithRefreshToken.refresh_token)
                    .to.be.a("string")
                    .with.a.lengthOf.greaterThan(0)
            }).timeout(timeoutForRequestsInMs(1))
        })
    })
