// Package imports
import { describe, it } from "mocha"
import { expect } from "chai"
// Local imports
import {
    getOAuthSecretClientCredentials,
    getOAuthSecretRefreshToken,
} from "./get_oauth_secrets.mjs"
// Type imports
import type { Suite } from "mocha"

export const getOAuthSecretsTestSuite = (): Suite =>
    describe("getOAuthSecrets", () => {
        describe("client-credentials", () => {
            it("getOAuthSecretClientCredentials", async () => {
                const oauthCredentials = await getOAuthSecretClientCredentials()
                expect(oauthCredentials.clientId).to.be.a("number").above(0)
                expect(oauthCredentials.clientSecret)
                    .to.be.a("string")
                    .with.a.lengthOf.greaterThan(0)
            })
        })
        describe("refresh-token", () => {
            it("getOAuthSecretRefreshToken", async () => {
                const oauthCredentials = await getOAuthSecretRefreshToken()
                expect(oauthCredentials.clientId).to.be.a("number").above(0)
                expect(oauthCredentials.clientSecret)
                    .to.be.a("string")
                    .with.a.lengthOf.greaterThan(0)
                expect(oauthCredentials.redirectUri)
                    .to.be.a("string")
                    .with.a.lengthOf.greaterThan(0)
                expect(oauthCredentials.refreshToken)
                    .to.be.a("string")
                    .with.a.lengthOf.greaterThan(0)
            })
        })
    })
