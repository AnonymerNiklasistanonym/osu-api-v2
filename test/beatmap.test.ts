import type { OAuthAccessToken } from "../src/types/oauth_access_token"

import { before, describe, it } from "mocha"
import { expect } from "chai"

import osuApiV2 from "../src/index"
import { readOauthCredentials } from "./read_oauth_credentials"

describe("beatmap", async () => {
    let oauthAccessToken: OAuthAccessToken

    before("before all test cases in oauth block", async () => {
        // Get the OAuth access token
        const oauthCredentials = await readOauthCredentials()
        oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
            oauthCredentials.clientId,
            oauthCredentials.clientSecret,
        )
    })

    it("lookup", async () => {
        // test cases here
        const beatmap = await osuApiV2.beatmap.lookup(oauthAccessToken, 2010214)
        expect(beatmap.last_updated).to.be.a("string")
        expect(beatmap.last_updated.length).to.be.above(0)
    })
})
