// Package imports
import { describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import osuApiV2, { OAuthAuthorizeScope } from "../../src"
import { genericWebRequestUrlGenerator } from "../../src/helpers/web_request"

export const webRequestTestSuite = (): Suite =>
    describe("genericWebRequestUrlGenerator", () => {
        it("spaces get encoded correctly", () => {
            const spaces = genericWebRequestUrlGenerator(["test"], {
                apiCall: false,
                urlParameters: [
                    {
                        name: "list",
                        value: ["a", "b", 33],
                    },
                ],
            })
            expect(spaces).to.equal("https://osu.ppy.sh/test?list=a%20b%2033")
        })
        it("authorize URL", () => {
            // Part of osu!api v2 but does not require any web requests or
            // secret authentication
            const authorizeUrl = osuApiV2.oauth.authorizeRedirectUrlGenerator(
                1234,
                "http://localhost:8888",
                [OAuthAuthorizeScope.PUBLIC, OAuthAuthorizeScope.IDENTIFY],
            )
            expect(authorizeUrl).to.equal(
                "https://osu.ppy.sh/oauth/authorize?client_id=1234&redirect_uri=http://localhost:8888&scope=public%20identify&response_type=code",
            )
        })
    })
