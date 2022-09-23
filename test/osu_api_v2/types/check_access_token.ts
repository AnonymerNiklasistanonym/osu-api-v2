// Package imports
import { expect } from "chai"
// Local imports
import { genericCheckObjectForUncheckedKeys } from "./check_generic"
// Type imports
import type {
    OAuthAccessToken,
    OAuthAccessTokenWithRefreshToken,
} from "../../../src"

export interface CheckAccessTokenWithRefreshTokenObjectOptions {
    isNotARefreshToken?: boolean
}

export const checkAccessTokenWithRefreshTokenObject = (
    oauthAccessToken: Readonly<OAuthAccessTokenWithRefreshToken>,
    options?: Readonly<CheckAccessTokenWithRefreshTokenObjectOptions>,
): void => {
    expect(oauthAccessToken).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("access_token")
    expect(oauthAccessToken.access_token)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("expires_in")
    expect(oauthAccessToken.expires_in).to.be.a("number").greaterThan(0)

    if (options?.isNotARefreshToken !== true) {
        checkedKeys.push("refresh_token")
        expect(oauthAccessToken.refresh_token)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
    }

    checkedKeys.push("token_type")
    expect(oauthAccessToken.token_type).to.be.a("string")
    expect(oauthAccessToken.token_type).to.equal("Bearer")

    genericCheckObjectForUncheckedKeys(oauthAccessToken, checkedKeys)
}

export const checkAccessTokenObject = (
    oauthAccessToken: Readonly<OAuthAccessToken>,
): void => {
    checkAccessTokenWithRefreshTokenObject(
        oauthAccessToken as OAuthAccessTokenWithRefreshToken,
        { isNotARefreshToken: true },
    )
}
