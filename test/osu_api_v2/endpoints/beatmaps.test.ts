import { before, describe, it, Suite } from "mocha"
import { expect } from "chai"

import osuApiV2 from "../../../src/index"
import { readOauthCredentials } from "./../read_oauth_credentials"
import { GameMode } from "../../../src/types/game_mode"
import { OAuthAccessToken } from "../../../src/types/oauth_access_token"
import { RankedStatus } from "../../../src/types/beatmap"
import { checkBeatmapObject } from "./beatmaps/check_beatmap"
import { scoresTestSuite } from "./beatmaps/scores.test"

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
        })

        scoresTestSuite()
    })
