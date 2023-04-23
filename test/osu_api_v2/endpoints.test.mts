// Package imports
import { describe } from "mocha"
// Local imports
import { beatmapsetsTestSuite } from "./endpoints/beatmapsets.test.mjs"
import { beatmapsTestSuite } from "./endpoints/beatmaps.test.mjs"
import { oauthTestSuite } from "./endpoints/oauth.test.mjs"
import { searchTestSuite } from "./endpoints/search.test.mjs"
import { usersTestSuite } from "./endpoints/users.test.mjs"
// Type imports
import type { Suite } from "mocha"

export const endpointsTestSuite = (): Suite =>
    describe("endpoints", () => {
        beatmapsTestSuite()
        beatmapsetsTestSuite()
        oauthTestSuite()
        searchTestSuite()
        usersTestSuite()
    })
