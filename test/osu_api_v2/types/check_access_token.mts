// Package imports
import { expect } from "chai"
// Local imports
import {
    genericCheckIfNumber,
    genericCheckIfString,
    genericCheckObjectForUncheckedKeys,
} from "./check_generic.mjs"
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

    genericCheckIfString(oauthAccessToken.access_token, {
        checkedKey: "access_token",
        checkedKeys,
        notEmpty: true,
    })

    genericCheckIfNumber(oauthAccessToken.expires_in, {
        checkedKey: "expires_in",
        checkedKeys,
        isGreaterThanZero: true,
    })

    if (options?.isNotARefreshToken !== true) {
        genericCheckIfString(oauthAccessToken.refresh_token, {
            checkedKey: "refresh_token",
            checkedKeys,
            notEmpty: true,
        })
    }

    genericCheckIfString(oauthAccessToken.token_type, {
        checkedKey: "token_type",
        checkedKeys,
        value: "Bearer",
    })

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
