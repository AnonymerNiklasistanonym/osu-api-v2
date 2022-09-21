// Package imports
import { describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import {
    getOAuthSecretClientCredentials,
    getOAuthSecretRefreshToken,
} from "./get_oauth_secrets"

export const getOAuthSecretsTestSuite = (): Suite =>
    describe("getOAuthSecrets", () => {
        it("getOAuthSecretClientCredentials", async () => {
            const oauthCredentials = await getOAuthSecretClientCredentials()
            expect(oauthCredentials.clientId).to.be.a("number")
            expect(oauthCredentials.clientId).to.be.above(0)
            expect(oauthCredentials.clientSecret).to.be.a("string")
            expect(oauthCredentials.clientSecret.length).to.be.above(0)
        })
        it("getOAuthSecretRefreshToken", async () => {
            const oauthCredentials = await getOAuthSecretRefreshToken()
            expect(oauthCredentials.clientId).to.be.a("number")
            expect(oauthCredentials.clientId).to.be.above(0)
            expect(oauthCredentials.clientSecret).to.be.a("string")
            expect(oauthCredentials.clientSecret.length).to.be.above(0)
            expect(oauthCredentials.redirectUrl).to.be.a("string")
            expect(oauthCredentials.redirectUrl.length).to.be.above(0)
            expect(oauthCredentials.refreshToken).to.be.a("string")
            expect(oauthCredentials.refreshToken.length).to.be.above(0)
        })
    })
