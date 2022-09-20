// Package imports
import { describe, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestErrorType,
} from "../../../helper.test"
import osuApiV2, {
    GameMode,
    OsuApiV2WebRequestError,
} from "../../../../src/index"
import { checkBeatmapUserScoreObject } from "./scores/check_beatmap_user_score"
import { readOauthCredentials } from "../../read_oauth_credentials"
// Type imports
import type { OAuthAccessToken } from "../../../../src/index"

export const scoresTestSuite = (): Suite =>
    describe("scores", () => {
        let oauthAccessToken: OAuthAccessToken

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await readOauthCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        it("users", async () => {
            // Check if the request throws an error when the access token is invalid
            let errorInvalidAccessToken: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.beatmaps.scores.users(
                    {
                        access_token: "",
                        expires_in: 100,
                        token_type: "",
                    },
                    1095534,
                    18508852,
                    GameMode.OSU_STANDARD,
                )
            } catch (err) {
                errorInvalidAccessToken = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidAccessToken,
                OsuApiV2WebRequestErrorType.UNAUTHORIZED,
            )

            const beatmapUserScore0 = await osuApiV2.beatmaps.scores.users(
                oauthAccessToken,
                1095534,
                18508852,
            )
            await checkBeatmapUserScoreObject(beatmapUserScore0, {
                checkBeatmapId: 1095534,
                checkGameMode: GameMode.OSU_STANDARD,
                checkUserId: 18508852,
            })
            const beatmapUserScore1 = await osuApiV2.beatmaps.scores.users(
                oauthAccessToken,
                1095534,
                18508852,
                GameMode.OSU_STANDARD,
            )
            await checkBeatmapUserScoreObject(beatmapUserScore1, {
                checkBeatmapId: 1095534,
                checkGameMode: GameMode.OSU_STANDARD,
                checkUserId: 18508852,
            })

            const beatmapUserScore2 = await osuApiV2.beatmaps.scores.users(
                oauthAccessToken,
                744305,
                18508852,
                GameMode.OSU_STANDARD,
            )
            await checkBeatmapUserScoreObject(beatmapUserScore2, {
                checkBeatmapId: 744305,
                checkGameMode: GameMode.OSU_STANDARD,
                checkUserId: 18508852,
            })

            // Check if the request throws an error when a graveyard map is requested
            let errorGraveyardMap = null
            try {
                await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    1718102,
                    18508852,
                    GameMode.OSU_STANDARD,
                )
            } catch (err) {
                errorGraveyardMap = err
            }
            expect(errorGraveyardMap).to.be.an("Error")

            // Check if the request throws an error when the beatmap ID invalid
            let errorInvalidBeatmapId: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    -1095534,
                    18508852,
                    GameMode.OSU_STANDARD,
                )
            } catch (err) {
                errorInvalidBeatmapId = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidBeatmapId,
                OsuApiV2WebRequestErrorType.NOT_FOUND,
            )

            // Check if the request throws an error when the user ID invalid
            let errorInvalidUserId: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    1095534,
                    -18508852,
                    GameMode.OSU_STANDARD,
                )
            } catch (err) {
                errorInvalidUserId = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidUserId,
                OsuApiV2WebRequestErrorType.NOT_FOUND,
            )
        }).timeout(8000)
    })
