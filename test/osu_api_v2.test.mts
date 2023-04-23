// Package imports
import { describe } from "mocha"
// Local imports
import { endpointsTestSuite } from "./osu_api_v2/endpoints.test.mjs"
import { getOAuthSecretsTestSuite } from "./osu_api_v2/get_oauth_secrets.test.mjs"

describe("osu-api-v2", () => {
    getOAuthSecretsTestSuite()
    endpointsTestSuite()
})
