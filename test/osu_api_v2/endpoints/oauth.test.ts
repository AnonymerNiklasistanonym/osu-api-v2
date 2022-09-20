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

        it("clientCredentialsGrant", async () => {
            // Check if the request throws an error when the client id is invalid
            let errorInvalidClientId: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.oauth.clientCredentialsGrant(
                    -99,
                    oauthCredentials.clientSecret,
                )
            } catch (err) {
                errorInvalidClientId = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidClientId,
                OsuApiV2WebRequestErrorType.UNAUTHORIZED,
            )

            // Check if the request throws an error when the client id is invalid
            let errorInvalidClientSecret: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.oauth.clientCredentialsGrant(
                    oauthCredentials.clientId,
                    "abc",
                )
            } catch (err) {
                errorInvalidClientSecret = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidClientSecret,
                OsuApiV2WebRequestErrorType.UNAUTHORIZED,
            )

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
        }).timeout(timeoutForRequestsInMs(3))
    })
