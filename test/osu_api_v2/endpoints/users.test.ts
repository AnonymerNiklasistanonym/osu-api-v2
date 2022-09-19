import { expect } from "chai"
import { before, describe, it, Suite } from "mocha"
import osuApiV2, {
    GameMode,
    GameModeString,
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

        describe("id", () => {
            it("should throw if id is invalid", async () => {
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
            })
            it("should make request successfully", async () => {
                await osuApiV2.users.id(oauthAccessToken, 9096716)
                await osuApiV2.users.id(oauthAccessToken, 9096716, GameMode.osu)
                await osuApiV2.users.id(
                    oauthAccessToken,
                    9096716,
                    GameMode.taiko,
                )
                await osuApiV2.users.id(
                    oauthAccessToken,
                    9096716,
                    GameMode.fruits,
                )
                await osuApiV2.users.id(
                    oauthAccessToken,
                    9096716,
                    GameMode.mania,
                )
            }).timeout(8000)
            it("user playmode should equal 'osu'", async () => {
                const user = await osuApiV2.users.id(
                    oauthAccessToken,
                    9096716,
                    GameMode.taiko,
                )
                expect(user.playmode).equals(GameModeString.osu)
            })
            it("user playmode should equal 'taiko'", async () => {
                const user = await osuApiV2.users.id(
                    oauthAccessToken,
                    8741695,
                    GameMode.fruits,
                )
                expect(user.playmode).equals(GameModeString.taiko)
            })
            it("user playmode should equal 'fruits'", async () => {
                const user = await osuApiV2.users.id(
                    oauthAccessToken,
                    4158549,
                    GameMode.mania,
                )
                expect(user.playmode).equals(GameModeString.fruits)
            })
            it("user playmode should equal 'mania'", async () => {
                const user = await osuApiV2.users.id(
                    oauthAccessToken,
                    758406,
                    GameMode.osu,
                )
                expect(user.playmode).equals(GameModeString.mania)
            })
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
