// Package imports
import { before, describe, it, Suite } from "mocha"
// Local imports
import {
    checkOsuApiV2WebRequestError,
    OsuApiV2WebRequestErrorType,
} from "../../helper.test"
import osuApiV2, {
    OAuthAccessToken,
    OsuApiV2WebRequestError,
} from "../../../src/index"
import { readOauthCredentials } from "../read_oauth_credentials"

export const beatmapsetsTestSuite = (): Suite =>
    describe("beatmapsets", () => {
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
                await osuApiV2.beatmapsets.get(
                    {
                        access_token: "",
                        expires_in: 100,
                        token_type: "",
                    },
                    1196347,
                )
            } catch (err) {
                errorInvalidAccessToken = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidAccessToken,
                OsuApiV2WebRequestErrorType.UNAUTHORIZED,
            )

            /*const beatmapRankedOsu =*/ await osuApiV2.beatmapsets.get(
                oauthAccessToken,
                1196347,
            )
            /*
            checkBeatmapObject(beatmapRankedOsu, {
                checkBeatmapId: 3086537,
                checkGameMode: GameMode.OSU_STANDARD,
                checkRankedStatus: RankedStatus.ranked,
            })
            */
            /*const beatmapGraveyardOsu =*/ await osuApiV2.beatmapsets.get(
                oauthAccessToken,
                819456,
            )
            /*
            checkBeatmapObject(beatmapGraveyardOsu, {
                checkBeatmapId: 1718102,
                checkGameMode: GameMode.OSU_STANDARD,
                checkRankedStatus: RankedStatus.graveyard,
            })
            */
            /*const beatmapLovedOsu =*/ await osuApiV2.beatmapsets.get(
                oauthAccessToken,
                34256,
            )
            /*
            checkBeatmapObject(beatmapLovedOsu, {
                checkBeatmapId: 112385,
                checkGameMode: GameMode.OSU_STANDARD,
                checkRankedStatus: RankedStatus.loved,
            })
            */

            // Check if the request throws an error when the id is invalid
            let errorInvalidBeatmapId: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.beatmapsets.get(oauthAccessToken, -112385)
            } catch (err) {
                errorInvalidBeatmapId = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidBeatmapId,
                OsuApiV2WebRequestErrorType.NOT_FOUND,
            )
        }).timeout(8000)

        it("search", async () => {
            // Check if the request throws an error when the access token is invalid
            let errorInvalidAccessToken: OsuApiV2WebRequestError | null = null
            try {
                await osuApiV2.beatmapsets.search(
                    {
                        access_token: "",
                        expires_in: 100,
                        token_type: "",
                    },
                    "Nekojarashi",
                )
            } catch (err) {
                errorInvalidAccessToken = err as OsuApiV2WebRequestError
            }
            checkOsuApiV2WebRequestError(
                errorInvalidAccessToken,
                OsuApiV2WebRequestErrorType.UNAUTHORIZED,
            )

            /*const beatmapsetRankedOsu =*/ await osuApiV2.beatmapsets.search(
                oauthAccessToken,
                "Nekojarashi",
            )
            /*
            console.log(beatmapsetRankedOsu)
            */

            /*const beatmapsetRankedOsu2 =*/ await osuApiV2.beatmapsets.search(
                oauthAccessToken,
                "Singularity - Au5",
            )
            /*
            console.log(beatmapsetRankedOsu2)
            */
        }).timeout(8000)
    })
