import type { OAuthAccessToken } from "../src/types/oauth_access_token"

import { before, describe, it } from "mocha"
import { expect } from "chai"

import osuApiV2 from "../src/index"
import { readOauthCredentials } from "./read_oauth_credentials"
import { GameMode } from "../src/types/game_mode"

describe("beatmaps", async () => {
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
        const beatmap = await osuApiV2.beatmaps.lookup(
            oauthAccessToken,
            2010214,
        )
        expect(beatmap).to.be.a("object")
        expect(beatmap.last_updated).to.be.a("string")
        expect(beatmap.last_updated.length).to.be.above(0)
    })

    describe("scores", async () => {
        it("users", async () => {
            const beatmapUserScore = await osuApiV2.beatmaps.scores.users(
                oauthAccessToken,
                1095534,
                18508852,
                GameMode.osu,
            )
            expect(beatmapUserScore).to.be.a("object")

            const beatmapUserScore2 = await osuApiV2.beatmaps.scores.users(
                oauthAccessToken,
                744305,
                18508852,
                GameMode.osu,
            )
            expect(beatmapUserScore2).to.be.a("object")
        })
    })
})
