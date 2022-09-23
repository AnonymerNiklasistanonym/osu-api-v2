// Package imports
import { before, describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkAccessTokenObject,
    checkAccessTokenWithRefreshTokenObject,
} from "../types/check_access_token"
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestExpectedErrorType,
} from "../../helper/custom_errors"
import { checkResponse, timeoutForRequestsInMs } from "../../test_helper"
import {
    getOAuthSecretClientCredentials,
    getOAuthSecretRefreshToken,
    updateOAuthSecretRefreshToken,
} from "../get_oauth_secrets"
import osuApiV2, { OsuApiV2WebRequestError } from "../../../src"
// Type imports
import type {
    OAuthSecretClientCredentials,
    OAuthSecretRefreshToken,
} from "../get_oauth_secrets"

export const oauthTestSuite = (): Suite =>
    describe("oauth", () => {
        describe("client-credentials", () => {
            let oauthClientCredentials: OAuthSecretClientCredentials

            before("before all test cases", async () => {
                // Get the local OAuth Credentials
                oauthClientCredentials = await getOAuthSecretClientCredentials()
            })

            describe("clientCredentialsGrant", () => {
                it("should throw if client id is invalid", async () => {
                    try {
                        const request =
                            await osuApiV2.oauth.clientCredentialsGrant(
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
                        const request =
                            await osuApiV2.oauth.clientCredentialsGrant(
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
                    checkResponse(oauthAccessToken, checkAccessTokenObject)
                }).timeout(timeoutForRequestsInMs(1))
            })
        })
        describe("refresh-token", () => {
            let oauthRefreshToken: OAuthSecretRefreshToken

            before("before all test cases", async () => {
                // Get the local OAuth Credentials
                oauthRefreshToken = await getOAuthSecretRefreshToken()
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
                    await updateOAuthSecretRefreshToken(
                        oauthRefreshToken,
                        oauthAccessTokenWithRefreshToken,
                    )
                    checkResponse(
                        oauthAccessTokenWithRefreshToken,
                        checkAccessTokenWithRefreshTokenObject,
                    )
                }).timeout(timeoutForRequestsInMs(1))
            })
        })
    })
