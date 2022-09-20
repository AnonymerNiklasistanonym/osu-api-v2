// Package imports
import { describe, Suite } from "mocha"
// Local imports
import { beatmapsetsTestSuite } from "./endpoints/beatmapsets.test"
import { beatmapsTestSuite } from "./endpoints/beatmaps.test"
import { oauthTestSuite } from "./endpoints/oauth.test"
import { searchTestSuite } from "./endpoints/search.test"
import { usersTestSuite } from "./endpoints/users.test"

export const endpointsTestSuite = (): Suite =>
    describe("endpoints", () => {
        beatmapsTestSuite()
        beatmapsetsTestSuite()
        oauthTestSuite()
        searchTestSuite()
        usersTestSuite()
    })
