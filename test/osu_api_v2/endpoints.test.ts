import { describe, Suite } from "mocha"

import { beatmapsTestSuite } from "./endpoints/beatmaps.test"
import { oauthTestSuite } from "./endpoints/oauth.test"
import { usersTestSuite } from "./endpoints/users.test"

export const endpointsTestSuite = (): Suite =>
    describe("endpoints", () => {
        beatmapsTestSuite()
        oauthTestSuite()
        usersTestSuite()
    })
