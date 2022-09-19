import { expect } from "chai"
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
                const osu = await osuApiV2.users.id(
                    oauthAccessToken,
                    9096716,
                    GameMode.osu,
                )
                const taiko = await osuApiV2.users.id(
                    oauthAccessToken,
                    9096716,
                    GameMode.taiko,
                )
                const fruits = await osuApiV2.users.id(
                    oauthAccessToken,
                    9096716,
                    GameMode.fruits,
                )
                const mania = await osuApiV2.users.id(
                    oauthAccessToken,
                    9096716,
                    GameMode.mania,
                )
                if (fruits.rank_history?.mode !== undefined) {
                    expect(fruits.rank_history?.mode).equals(GameMode.fruits)
                }
                if (taiko.rank_history?.mode !== undefined) {
                    expect(taiko.rank_history?.mode).equals(GameMode.taiko)
                }
                if (mania.rank_history?.mode !== undefined) {
                    expect(mania.rank_history?.mode).equals(GameMode.mania)
                }
                if (osu.rank_history?.mode !== undefined) {
                    expect(osu.rank_history?.mode).equals(GameMode.osu)
                }
            }).timeout(8000)
            it("user playmode should equal 'osu'", async () => {
                const user = await osuApiV2.users.id(oauthAccessToken, 9096716)
                expect(user.playmode).equals(GameMode.osu)
            })
            it("user playmode should equal 'taiko'", async () => {
                const user = await osuApiV2.users.id(oauthAccessToken, 8741695)
                expect(user.playmode).equals(GameMode.taiko)
            })
            it("user playmode should equal 'fruits'", async () => {
                const user = await osuApiV2.users.id(oauthAccessToken, 4158549)
                expect(user.playmode).equals(GameMode.fruits)
            })
            it("user playmode should equal 'mania'", async () => {
                const user = await osuApiV2.users.id(oauthAccessToken, 758406)
                expect(user.playmode).equals(GameMode.mania)
            })
        }).timeout(8000)
        describe("name", () => {
            it("should throw name name is '-1'", async () => {
                // Check if the request throws an error when the name is "-1"
                let errorInvalidBeatmapId: OsuApiV2WebRequestError | null = null
                try {
                    const result = await osuApiV2.users.name(
                        oauthAccessToken,
                        "-1",
                    )
                    console.log(result)
                } catch (err) {
                    errorInvalidBeatmapId = err as OsuApiV2WebRequestError
                }
                checkOsuApiV2WebRequestError(
                    errorInvalidBeatmapId,
                    OsuApiV2WebRequestErrorType.NOT_FOUND,
                )
            })
            it("should make request successfully", async () => {
                await osuApiV2.users.name(oauthAccessToken, "Ooi")
                const osu = await osuApiV2.users.name(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.osu,
                )
                const taiko = await osuApiV2.users.name(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.taiko,
                )
                const fruits = await osuApiV2.users.name(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.fruits,
                )
                const mania = await osuApiV2.users.name(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.mania,
                )
                if (fruits.rank_history?.mode !== undefined) {
                    expect(fruits.rank_history?.mode).equals(GameMode.fruits)
                }
                if (taiko.rank_history?.mode !== undefined) {
                    expect(taiko.rank_history?.mode).equals(GameMode.taiko)
                }
                if (mania.rank_history?.mode !== undefined) {
                    expect(mania.rank_history?.mode).equals(GameMode.mania)
                }
                if (osu.rank_history?.mode !== undefined) {
                    expect(osu.rank_history?.mode).equals(GameMode.osu)
                }
            }).timeout(8000)
            it("user playmode should equal 'osu'", async () => {
                const user = await osuApiV2.users.name(oauthAccessToken, "Ooi")
                expect(user.playmode).equals(GameMode.osu)
            })
            it("user playmode should equal 'taiko'", async () => {
                const user = await osuApiV2.users.name(
                    oauthAccessToken,
                    "syaron105",
                )
                expect(user.playmode).equals(GameMode.taiko)
            })
            it("user playmode should equal 'fruits'", async () => {
                const user = await osuApiV2.users.name(
                    oauthAccessToken,
                    "YesMyDarknesss",
                )
                expect(user.playmode).equals(GameMode.fruits)
            })
            it("user playmode should equal 'mania'", async () => {
                const user = await osuApiV2.users.name(
                    oauthAccessToken,
                    "dressurf",
                )
                expect(user.playmode).equals(GameMode.mania)
            })
        }).timeout(8000)
        describe("get", () => {
            it("should get a user by their ID", async () => {
                const result = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                )
                expect(result.id).equals(9096716)
            })
            it("should get a user by their username", async () => {
                const result = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                )
                expect(result.username).equals("Ooi")
            })
        })
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
