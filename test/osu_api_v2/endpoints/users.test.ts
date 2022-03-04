import { before, describe, it, Suite } from "mocha"
import osuApiV2, { GameMode, OAuthAccessToken } from "../../../src/index"
import { ScoresType } from "../../../src/users/scores"
import { readOauthCredentials } from "../read_oauth_credentials"

export const usersTestSuite = (): Suite =>
    describe("users", async () => {
        let oauthAccessToken: OAuthAccessToken

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await readOauthCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        it("id", async () => {
            await osuApiV2.users.id(oauthAccessToken, 9096716)
            await osuApiV2.users.id(oauthAccessToken, 9096716, GameMode.osu)
            await osuApiV2.users.id(oauthAccessToken, 9096716, GameMode.mania)
        }).timeout(8000)
        it("recent_activity", async () => {
            await osuApiV2.users.recentActivity(oauthAccessToken, 9096716)
        }).timeout(8000)

        it("scores", async () => {
            await osuApiV2.users.scores(
                oauthAccessToken,
                9096716,
                ScoresType.Recent,
            )
            await osuApiV2.users.scores(
                oauthAccessToken,
                9096716,
                ScoresType.Best,
            )
            await osuApiV2.users.scores(
                oauthAccessToken,
                9096716,
                ScoresType.FirstPlace,
            )
            await osuApiV2.users.scores(
                oauthAccessToken,
                9096716,
                ScoresType.Recent,
                GameMode.osu,
                3,
                0,
                true,
            )
            await osuApiV2.users.scores(
                oauthAccessToken,
                9096716,
                ScoresType.Recent,
                undefined,
                undefined,
                undefined,
                false,
            )
        }).timeout(8000)
    })
