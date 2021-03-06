import { before, describe, it, Suite } from "mocha"
import osuApiV2, {
    GameMode,
    OAuthAccessToken,
    OsuApiV2WebRequestError,
} from "../../../src/index"
import { ScoresType } from "../../../src/users/scores"
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestErrorType,
} from "../../helper.test"
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
            // Check if the request throws an error when the id is invalid
            let errorInvalidBeatmapId: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.users.id(oauthAccessToken, -9096716)
            } catch (err) {
                errorInvalidBeatmapId = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidBeatmapId,
                OsuApiV2WebRequestErrorType.NOT_FOUND,
            )

            await osuApiV2.users.id(oauthAccessToken, 9096716)
            await osuApiV2.users.id(oauthAccessToken, 9096716, GameMode.osu)
            await osuApiV2.users.id(oauthAccessToken, 9096716, GameMode.mania)
        }).timeout(8000)
        it("recentActivity", async () => {
            // Check if the request throws an error when the id is invalid
            let errorInvalidBeatmapId: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.users.recentActivity(oauthAccessToken, -9096716)
            } catch (err) {
                errorInvalidBeatmapId = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidBeatmapId,
                OsuApiV2WebRequestErrorType.NOT_FOUND,
            )

            await osuApiV2.users.recentActivity(oauthAccessToken, 9096716)
        }).timeout(8000)
        it("scores", async () => {
            // Check if the request throws an error when the id is invalid
            let errorInvalidBeatmapId: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.users.scores(
                    oauthAccessToken,
                    -9096716,
                    ScoresType.Recent,
                )
            } catch (err) {
                errorInvalidBeatmapId = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidBeatmapId,
                OsuApiV2WebRequestErrorType.NOT_FOUND,
            )

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
