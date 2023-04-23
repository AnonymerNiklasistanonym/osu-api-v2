// Package imports
import { before, describe, it } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkAccessTokenObject,
    checkAccessTokenWithRefreshTokenObject,
} from "../types/check_access_token.mjs"
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestExpectedErrorType,
} from "../../helper/types/check_custom_errors.mjs"
import { checkResponse, timeoutForRequestsInMs } from "../../test_helper.mjs"
import {
    getOAuthSecretClientCredentials,
    getOAuthSecretRefreshToken,
    updateOAuthSecretRefreshToken,
} from "../get_oauth_secrets.mjs"
import osuApiV2 from "../../../src/index.mjs"
// Type imports
import type {
    OAuthSecretClientCredentials,
    OAuthSecretRefreshToken,
} from "../get_oauth_secrets.mjs"
import type { OsuApiV2WebRequestError } from "../../../src/index.mjs"
import type { Suite } from "mocha"

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
                            {
                                errorType:
                                    OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED,
                            },
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
                            {
                                errorType:
                                    OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED,
                            },
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

            describe("refreshTokenGrant", () => {
                it("should throw if redirect URI and refresh token are invalid", async () => {
                    try {
                        const request = await osuApiV2.oauth.refreshTokenGrant(
                            oauthClientCredentials.clientId,
                            oauthClientCredentials.clientSecret,
                            "http://invalid-url.com",
                            "invalid refresh token",
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
            })

            describe("authorizationCodeGrant", () => {
                it("should throw if redirect URI and code are invalid", async () => {
                    try {
                        const request =
                            await osuApiV2.oauth.authorizationCodeGrant(
                                oauthClientCredentials.clientId,
                                oauthClientCredentials.clientSecret,
                                "http://invalid-url.com",
                                "invalid code",
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
                            oauthRefreshToken.redirectUri,
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
                            {
                                errorType:
                                    OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED,
                            },
                        )
                    }
                }).timeout(timeoutForRequestsInMs(1))
                it("should throw if client secret is invalid", async () => {
                    try {
                        const request = await osuApiV2.oauth.refreshTokenGrant(
                            oauthRefreshToken.clientId,
                            "-1",
                            oauthRefreshToken.redirectUri,
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
                            {
                                errorType:
                                    OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED,
                            },
                        )
                    }
                }).timeout(timeoutForRequestsInMs(1))
                it("should throw if redirect URI is invalid", async () => {
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
                            {
                                errorType:
                                    OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED,
                            },
                        )
                    }
                }).timeout(timeoutForRequestsInMs(1))
                it("should throw if refresh token is invalid", async () => {
                    try {
                        const request = await osuApiV2.oauth.refreshTokenGrant(
                            oauthRefreshToken.clientId,
                            oauthRefreshToken.clientSecret,
                            oauthRefreshToken.redirectUri,
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
                            {
                                errorType:
                                    OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED,
                            },
                        )
                    }
                }).timeout(timeoutForRequestsInMs(1))
                it("should make request successfully", async () => {
                    const oauthAccessTokenWithRefreshToken =
                        await osuApiV2.oauth.refreshTokenGrant(
                            oauthRefreshToken.clientId,
                            oauthRefreshToken.clientSecret,
                            oauthRefreshToken.redirectUri,
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
