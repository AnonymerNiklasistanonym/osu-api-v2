import { before, describe, it, Suite } from "mocha"
import osuApiV2, {
    GameMode,
    OAuthAccessToken,
    RankedStatus,
    OsuApiV2WebRequestError,
} from "../../../src/index"
import { readOauthCredentials } from "./../read_oauth_credentials"
import { checkBeatmapObject } from "./beatmaps/check_beatmap"
import { scoresTestSuite } from "./beatmaps/scores.test"
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestErrorType,
} from "../../helper.test"

export const beatmapsTestSuite = (): Suite =>
    describe("beatmaps", async () => {
        let oauthAccessToken: OAuthAccessToken

        before("before all test cases", async () => {
            // Get the OAuth access token
            const oauthCredentials = await readOauthCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

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
                3086537,
            )
            checkBeatmapObject(beatmapRankedOsu, {
                checkBeatmapId: 3086537,
                checkGameMode: GameMode.osu,
                checkRankedStatus: RankedStatus.ranked,
            })
            const beatmapGraveyardOsu = await osuApiV2.beatmaps.lookup(
                oauthAccessToken,
                1718102,
            )
            checkBeatmapObject(beatmapGraveyardOsu, {
                checkBeatmapId: 1718102,
                checkGameMode: GameMode.osu,
                checkRankedStatus: RankedStatus.graveyard,
            })
            const beatmapLovedOsu = await osuApiV2.beatmaps.lookup(
                oauthAccessToken,
                112385,
            )
            checkBeatmapObject(beatmapLovedOsu, {
                checkBeatmapId: 112385,
                checkGameMode: GameMode.osu,
                checkRankedStatus: RankedStatus.loved,
            })

            // Check if the request throws an error when the id is invalid
            let errorInvalidBeatmapId: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.beatmaps.lookup(oauthAccessToken, -112385)
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
