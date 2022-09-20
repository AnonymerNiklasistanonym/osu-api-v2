// Package imports
import { before, describe, it, Suite } from "mocha"
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

        it("user", async () => {
            // Check if the request throws an error when the access token is invalid
            let errorInvalidAccessToken: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.search.user(
                    {
                        access_token: "",
                        expires_in: 100,
                        token_type: "",
                    },
                    "niklas616",
                )
            } catch (err) {
                errorInvalidAccessToken = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidAccessToken,
                OsuApiV2WebRequestErrorType.UNAUTHORIZED,
            )

            const searchResultUser1 = await osuApiV2.search.user(
                oauthAccessToken,
                "niklas616",
            )
            await cacheResponse("search_user", "niklas616", searchResultUser1)

            const searchResultUser2 = await osuApiV2.search.user(
                oauthAccessToken,
                "Ooi",
            )
            await cacheResponse("search_user", "Ooi", searchResultUser2)
        }).timeout(timeoutForRequestsInMs(3))
    })
