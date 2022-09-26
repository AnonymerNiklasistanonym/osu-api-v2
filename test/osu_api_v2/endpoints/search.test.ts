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
import { saveAndCheckResponse, timeoutForRequestsInMs } from "../../test_helper"
import { checkSearchResultEndpointSearchUserObject } from "../types/check_search_user"
import { checkSearchResultWikiPageObject } from "../types/check_search_wiki_page"
import osuApiV2 from "../../../src"
// Type imports
import type {
    OAuthAccessTokenResponse,
    OsuApiV2WebRequestError,
} from "../../../src"

export const searchTestSuite = (): Suite =>
    describe("search", () => {
        let oauthAccessToken: OAuthAccessTokenResponse

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
                        {
                            errorType:
                                OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED,
                        },
                    )
                }
            }).timeout(timeoutForRequestsInMs(1))
            it("requests don't throw errors", async () => {
                const searchResultUser1 = await osuApiV2.search.user(
                    oauthAccessToken,
                    "niklas616",
                )
                await saveAndCheckResponse(
                    "search_user",
                    "niklas616",
                    searchResultUser1,
                    checkSearchResultEndpointSearchUserObject,
                )
                const searchResultUser2 = await osuApiV2.search.user(
                    oauthAccessToken,
                    "Ooi",
                    2,
                )
                await saveAndCheckResponse(
                    "search_user",
                    "Ooi_2",
                    searchResultUser2,
                    checkSearchResultEndpointSearchUserObject,
                )
            }).timeout(timeoutForRequestsInMs(2))
        })

        describe("wiki-page", () => {
            it("should throw if access token is invalid", async () => {
                try {
                    const request = await osuApiV2.search.wikiPage(
                        invalidOAuthAccessToken,
                        "sotarks",
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
            it("requests don't throw errors", async () => {
                const searchResultWikiPage1 = await osuApiV2.search.wikiPage(
                    oauthAccessToken,
                    "sotarks",
                )
                await saveAndCheckResponse(
                    "search_wiki_page",
                    "sotarks",
                    searchResultWikiPage1,
                    checkSearchResultWikiPageObject,
                )
                const searchResultWikiPage2 = await osuApiV2.search.wikiPage(
                    oauthAccessToken,
                    "sotarks",
                    2,
                )
                await saveAndCheckResponse(
                    "search_wiki_page",
                    "sotarks_2",
                    searchResultWikiPage2,
                    checkSearchResultWikiPageObject,
                )
            }).timeout(timeoutForRequestsInMs(2))
        })
    })
