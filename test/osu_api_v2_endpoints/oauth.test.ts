import type { OAuthCredentials } from "./read_oauth_credentials"

import { before, describe, it } from "mocha"
import { expect } from "chai"

import osuApiV2 from "../../src/index"
import { readOauthCredentials } from "./read_oauth_credentials"

describe("osu-api-v2-oauth", async () => {
    let oauthCredentials: OAuthCredentials

    before("before all test cases in oauth block", async () => {
        // Get the local OAuth Credentials
        oauthCredentials = await readOauthCredentials()
    })

    it("clientCredentialsGrant", async () => {
        const oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
            oauthCredentials.clientId,
            oauthCredentials.clientSecret,
        )
        expect(oauthAccessToken.access_token).to.be.a("string")
        expect(oauthAccessToken.access_token.length).to.be.above(0)
        expect(oauthAccessToken.token_type).to.equal("Bearer")
        expect(oauthAccessToken.expires_in).to.be.a("number")
        expect(oauthAccessToken.expires_in).to.be.above(0)
    })
})
