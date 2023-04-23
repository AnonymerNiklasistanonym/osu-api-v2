// Package imports
import { expect } from "chai"
// Local imports
import { genericCheckObjectForUncheckedKeys } from "./check_generic.mjs"
// Type imports
import type {
    OAuthAccessTokenResponse,
    OAuthAccessTokenWithRefreshTokenResponse,
} from "../../../src/types/oauth_access_token.mjs"
import type { DefaultCheckResponseOptions } from "../../test_helper.mjs"

export interface CheckAccessTokenWithRefreshTokenObjectOptions
    extends DefaultCheckResponseOptions {
    isNotARefreshToken?: boolean
}

export const checkAccessTokenWithRefreshTokenObject = (
    oauthAccessToken: Readonly<OAuthAccessTokenWithRefreshTokenResponse>,
    options?: Readonly<CheckAccessTokenWithRefreshTokenObjectOptions>,
): ReadonlyArray<string> => {
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

    return genericCheckObjectForUncheckedKeys(
        oauthAccessToken,
        checkedKeys,
        options,
    )
}

export const checkAccessTokenObject = (
    oauthAccessToken: Readonly<OAuthAccessTokenResponse>,
): void => {
    checkAccessTokenWithRefreshTokenObject(
        oauthAccessToken as OAuthAccessTokenWithRefreshTokenResponse,
        { isNotARefreshToken: true },
    )
}
