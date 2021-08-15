import { before, describe, it, Suite } from "mocha"
import { expect } from "chai"

import osuApiV2 from "../../../src/index"
import { readOauthCredentials } from "./../read_oauth_credentials"
import { GameMode } from "../../../src/types/game_mode"
import { OAuthAccessToken } from "../../../src/types/oauth_access_token"
import { RankedStatus } from "../../../src/types/beatmap"
import { checkBeatmapObject } from "./beatmaps/check_beatmap"

export const beatmapsTestSuite = (): Suite =>
    describe("beatmaps", async () => {
        let oauthAccessToken: OAuthAccessToken

        before("before all test cases in oauth block", async () => {
            // Get the OAuth access token
            const oauthCredentials = await readOauthCredentials()
            oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
                oauthCredentials.clientId,
                oauthCredentials.clientSecret,
            )
        })

        it("lookup", async () => {
            const beatmapRankedOsu = await osuApiV2.beatmaps.lookup(
                oauthAccessToken,
                3086537,
            )
            checkBeatmapObject(beatmapRankedOsu, {
                checkGameMode: GameMode.osu,
                checkId: 3086537,
                checkRankedStatus: RankedStatus.ranked,
            })
            const beatmapGraveyardOsu = await osuApiV2.beatmaps.lookup(
                oauthAccessToken,
                1718102,
            )
            checkBeatmapObject(beatmapGraveyardOsu, {
                checkGameMode: GameMode.osu,
                checkId: 1718102,
                checkRankedStatus: RankedStatus.graveyard,
            })
            const beatmapLovedOsu = await osuApiV2.beatmaps.lookup(
                oauthAccessToken,
                112385,
            )
            checkBeatmapObject(beatmapLovedOsu, {
                checkGameMode: GameMode.osu,
                checkId: 112385,
                checkRankedStatus: RankedStatus.loved,
            })
        })

        describe("scores", async () => {
            it("users", async () => {
                const beatmapUserScore1 = await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    1095534,
                    18508852,
                    GameMode.osu,
                )
                expect(beatmapUserScore1).to.be.a("object")
                expect(beatmapUserScore1.score.mode).to.equal(
                    GameMode[GameMode.osu],
                )

                const beatmapUserScore2 = await osuApiV2.beatmaps.scores.users(
                    oauthAccessToken,
                    744305,
                    18508852,
                    GameMode.osu,
                )
                expect(beatmapUserScore2).to.be.a("object")
                expect(beatmapUserScore2.score.mode).to.equal(
                    GameMode[GameMode.osu],
                )

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
            })
        })
    })
