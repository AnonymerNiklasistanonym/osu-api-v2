// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { AuthorizationCodeGrantResponseFormat } from "../types/authorizationCodeGrant.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkAuthorizationCodeGrantResponseFormatObject = (authorizationCodeGrantResponseFormat: Readonly<AuthorizationCodeGrantResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(authorizationCodeGrantResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(authorizationCodeGrantResponseFormat.token_type, { checkedKey: "token_type", checkedKeys })
    genericCheckIfNumber(authorizationCodeGrantResponseFormat.expires_in, { checkedKey: "expires_in", checkedKeys })
    genericCheckIfString(authorizationCodeGrantResponseFormat.access_token, { checkedKey: "access_token", checkedKeys })
    genericCheckIfString(authorizationCodeGrantResponseFormat.refresh_token, { checkedKey: "refresh_token", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(authorizationCodeGrantResponseFormat, checkedKeys, options)
}
