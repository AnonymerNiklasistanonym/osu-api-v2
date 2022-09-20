// Package imports
import { before, describe, it, Suite } from "mocha"
// Local imports
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestErrorType,
} from "../../helper.test"
import osuApiV2, {
    GameMode,
    OAuthAccessToken,
    OsuApiV2WebRequestError,
    RankStatus,
} from "../../../src/index"
import { checkBeatmapObject } from "./beatmaps/check_beatmap"
import { readOauthCredentials } from "./../read_oauth_credentials"
import { scoresTestSuite } from "./beatmaps/scores.test"

export const beatmapsTestSuite = (): Suite =>
    describe("beatmaps", () => {
        let oauthAccessToken: OAuthAccessToken

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await readOauthCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        it("get", async () => {
            // Check if the request throws an error when the access token is invalid
            let errorInvalidAccessToken: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.beatmaps.get(
                    {
                        access_token: "",
                        expires_in: 100,
                        token_type: "",
                    },
                    112385,
                )
            } catch (err) {
                errorInvalidAccessToken = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidAccessToken,
                OsuApiV2WebRequestErrorType.UNAUTHORIZED,
            )

            const beatmapRankedOsu = await osuApiV2.beatmaps.get(
                oauthAccessToken,
                3086537,
            )
            await checkBeatmapObject(beatmapRankedOsu, {
                checkBeatmapId: 3086537,
                checkGameMode: GameMode.OSU_STANDARD,
                checkRankStatus: RankStatus.ranked,
            })
            const beatmapGraveyardOsu = await osuApiV2.beatmaps.get(
                oauthAccessToken,
                1718102,
            )
            await checkBeatmapObject(beatmapGraveyardOsu, {
                checkBeatmapId: 1718102,
                checkGameMode: GameMode.OSU_STANDARD,
                checkRankStatus: RankStatus.graveyard,
            })
            const beatmapLovedOsu = await osuApiV2.beatmaps.get(
                oauthAccessToken,
                112385,
            )
            await checkBeatmapObject(beatmapLovedOsu, {
                checkBeatmapId: 112385,
                checkGameMode: GameMode.OSU_STANDARD,
                checkRankStatus: RankStatus.loved,
            })

            // Check if the request throws an error when the id is invalid
            let errorInvalidBeatmapId: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.beatmaps.get(oauthAccessToken, -112385)
            } catch (err) {
                errorInvalidBeatmapId = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidBeatmapId,
                OsuApiV2WebRequestErrorType.NOT_FOUND,
            )
        }).timeout(8000)

        it("lookup", async () => {
            // Check if the request throws an error when the access token is invalid
            let errorInvalidAccessToken: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.beatmaps.lookup(
                    {
                        access_token: "",
                        expires_in: 100,
                        token_type: "",
                    },
                    undefined,
                    undefined,
                    112385,
                )
            } catch (err) {
                errorInvalidAccessToken = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidAccessToken,
                OsuApiV2WebRequestErrorType.UNAUTHORIZED,
            )

            const beatmapRankedOsu = await osuApiV2.beatmaps.lookup(
                oauthAccessToken,
                undefined,
                undefined,
                3086537,
            )
            await checkBeatmapObject(beatmapRankedOsu, {
                checkBeatmapId: 3086537,
                checkGameMode: GameMode.OSU_STANDARD,
                checkRankStatus: RankStatus.ranked,
            })
            const beatmapGraveyardOsuId = await osuApiV2.beatmaps.lookup(
                oauthAccessToken,
                undefined,
                undefined,
                1718102,
            )
            await checkBeatmapObject(beatmapGraveyardOsuId, {
                checkBeatmapId: 1718102,
                checkGameMode: GameMode.OSU_STANDARD,
                checkRankStatus: RankStatus.graveyard,
            })
            const beatmapLovedOsuId = await osuApiV2.beatmaps.lookup(
                oauthAccessToken,
                undefined,
                undefined,
                112385,
            )
            await checkBeatmapObject(beatmapLovedOsuId, {
                checkBeatmapId: 112385,
                checkGameMode: GameMode.OSU_STANDARD,
                checkRankStatus: RankStatus.loved,
            })

            // Check if the request throws an error when the id is invalid
            let errorInvalidBeatmapId: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.beatmaps.lookup(
                    oauthAccessToken,
                    undefined,
                    undefined,
                    -112385,
                )
            } catch (err) {
                errorInvalidBeatmapId = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidBeatmapId,
                OsuApiV2WebRequestErrorType.NOT_FOUND,
            )
        }).timeout(8000)

        scoresTestSuite()
    })
