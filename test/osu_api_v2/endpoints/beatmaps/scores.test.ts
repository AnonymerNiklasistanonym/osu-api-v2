import { expect } from "chai"
import { describe, Suite } from "mocha"
import osuApiV2 from "../../../../src"
import { OsuApiV2WebRequestError } from "../../../../src/helpers/custom_errors"
import { GameMode } from "../../../../src/types/game_mode"
import { OAuthAccessToken } from "../../../../src/types/oauth_access_token"
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestErrorType,
} from "../../../helper.test"
import { readOauthCredentials } from "../../read_oauth_credentials"
import { checkBeatmapUserScoreObject } from "./scores/check_beatmap_user_score"

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
                    GameMode.osu,
                )
            } catch (err) {
                errorInvalidAccessToken = err
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
            checkBeatmapUserScoreObject(beatmapUserScore0, {
                checkBeatmapId: 1095534,
                checkGameMode: GameMode.osu,
                checkUserId: 18508852,
            })
            const beatmapUserScore1 = await osuApiV2.beatmaps.scores.users(
                oauthAccessToken,
                1095534,
                18508852,
                GameMode.osu,
            )
            checkBeatmapUserScoreObject(beatmapUserScore1, {
                checkBeatmapId: 1095534,
                checkGameMode: GameMode.osu,
                checkUserId: 18508852,
            })

            const beatmapUserScore2 = await osuApiV2.beatmaps.scores.users(
                oauthAccessToken,
                744305,
                18508852,
                GameMode.osu,
            )
            checkBeatmapUserScoreObject(beatmapUserScore2, {
                checkBeatmapId: 744305,
                checkGameMode: GameMode.osu,
                checkUserId: 18508852,
            })

            // Check if the request throws an error when a graveyard map is requested
            let errorGraveyardMap = null
            try {
                await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    1718102,
                    18508852,
                    GameMode.osu,
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
                    GameMode.osu,
                )
            } catch (err) {
                errorInvalidBeatmapId = err
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
                    GameMode.osu,
                )
            } catch (err) {
                errorInvalidUserId = err
            }
            checkOsuApiV2WebRequestError(
                errorInvalidUserId,
                OsuApiV2WebRequestErrorType.NOT_FOUND,
            )
        })
    })
