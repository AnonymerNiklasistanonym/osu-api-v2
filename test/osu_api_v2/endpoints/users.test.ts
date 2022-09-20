// Package imports
import { before, describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkOsuApiV2Error,
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestErrorType,
} from "../../helper.test"
import osuApiV2, {
    GameMode,
    OsuApiV2Error,
    OsuApiV2ErrorCode,
    OsuApiV2WebRequestError,
    ScoresType
} from "../../../src/index"
import { readOauthCredentials } from "../read_oauth_credentials"
// Type imports
import type { OAuthAccessToken } from "../../../src/index"

export const usersTestSuite = (): Suite =>
    describe("users", () => {
        let oauthAccessToken: OAuthAccessToken

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await readOauthCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        describe("get", () => {
            it("should throw if id is invalid", async () => {
                // Check if the request throws an error when the id is invalid
                let errorInvalidUserId: OsuApiV2WebRequestError | null = null
                try {
                    const result = await osuApiV2.users.get(
                        oauthAccessToken,
                        -9096716,
                    )
                    console.log(result)
                } catch (err) {
                    errorInvalidUserId = err as OsuApiV2WebRequestError
                }
                checkOsuApiV2WebRequestError(
                    errorInvalidUserId,
                    OsuApiV2WebRequestErrorType.NOT_FOUND,
                )
            })
            it("should throw if name is '-1'", async () => {
                // Check if the request throws an error when the name is "-1"
                let errorInvalidUserName: OsuApiV2WebRequestError | null = null
                try {
                    const result = await osuApiV2.users.get(
                        oauthAccessToken,
                        "-1",
                    )
                    console.log(result)
                } catch (err) {
                    errorInvalidUserName = err as OsuApiV2WebRequestError
                }
                checkOsuApiV2WebRequestError(
                    errorInvalidUserName,
                    OsuApiV2WebRequestErrorType.NOT_FOUND,
                )
            })
            it("should throw if name is '' and no account is found", async () => {
                // Check if the request throws an error when the name is "-1"
                let errorInvalidUserName: OsuApiV2Error | null = null
                try {
                    const result = await osuApiV2.users.get(
                        oauthAccessToken,
                        "",
                    )
                    console.log(result)
                } catch (err) {
                    errorInvalidUserName = err as OsuApiV2Error
                }
                checkOsuApiV2Error(
                    errorInvalidUserName,
                    OsuApiV2ErrorCode.NOT_FOUND,
                )
            })
            it("should make request successfully", async () => {
                // User ID
                await osuApiV2.users.get(oauthAccessToken, 9096716)
                const osuId = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                    GameMode.osu,
                )
                const taikoId = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                    GameMode.taiko,
                )
                const fruitsId = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                    GameMode.fruits,
                )
                const maniaId = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                    GameMode.mania,
                )
                if (fruitsId.rank_history?.mode !== undefined) {
                    expect(fruitsId.rank_history?.mode).equals(GameMode.fruits)
                }
                if (taikoId.rank_history?.mode !== undefined) {
                    expect(taikoId.rank_history?.mode).equals(GameMode.taiko)
                }
                if (maniaId.rank_history?.mode !== undefined) {
                    expect(maniaId.rank_history?.mode).equals(GameMode.mania)
                }
                if (osuId.rank_history?.mode !== undefined) {
                    expect(osuId.rank_history?.mode).equals(GameMode.osu)
                }
                // User name
                await osuApiV2.users.get(oauthAccessToken, "Ooi")
                const osuName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.osu,
                )
                const taikoName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.taiko,
                )
                const fruitsName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.fruits,
                )
                const maniaName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "Ooi",
                    GameMode.mania,
                )
                if (fruitsName.rank_history?.mode !== undefined) {
                    expect(fruitsName.rank_history?.mode).equals(
                        GameMode.fruits,
                    )
                }
                if (taikoName.rank_history?.mode !== undefined) {
                    expect(taikoName.rank_history?.mode).equals(GameMode.taiko)
                }
                if (maniaName.rank_history?.mode !== undefined) {
                    expect(maniaName.rank_history?.mode).equals(GameMode.mania)
                }
                if (osuName.rank_history?.mode !== undefined) {
                    expect(osuName.rank_history?.mode).equals(GameMode.osu)
                }
            }).timeout(8000)
            it("user playmode should equal 'osu'", async () => {
                const userId = await osuApiV2.users.get(
                    oauthAccessToken,
                    9096716,
                )
                expect(userId.playmode).equals(GameMode.osu)
                const userName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "syaron105",
                )
                expect(userName.playmode).equals(GameMode.taiko)
            })
            it("user playmode should equal 'taiko'", async () => {
                const userId = await osuApiV2.users.get(
                    oauthAccessToken,
                    8741695,
                )
                expect(userId.playmode).equals(GameMode.taiko)
                const userName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "syaron105",
                )
                expect(userName.playmode).equals(GameMode.taiko)
            })
            it("user playmode should equal 'fruits'", async () => {
                const userId = await osuApiV2.users.get(
                    oauthAccessToken,
                    4158549,
                )
                expect(userId.playmode).equals(GameMode.fruits)
                const userName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "YesMyDarknesss",
                )
                expect(userName.playmode).equals(GameMode.fruits)
            })
            it("user playmode should equal 'mania'", async () => {
                const userId = await osuApiV2.users.get(
                    oauthAccessToken,
                    758406,
                )
                expect(userId.playmode).equals(GameMode.mania)
                const userName = await osuApiV2.users.get(
                    oauthAccessToken,
                    "dressurf",
                )
                expect(userName.playmode).equals(GameMode.mania)
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
