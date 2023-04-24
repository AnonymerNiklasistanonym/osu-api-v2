// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { ClientCredentialsGrantResponseFormat } from "../types/clientCredentialsGrant.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkClientCredentialsGrantResponseFormatObject = (clientCredentialsGrantResponseFormat: Readonly<ClientCredentialsGrantResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(clientCredentialsGrantResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(clientCredentialsGrantResponseFormat.token_type, { checkedKey: "token_type", checkedKeys })
    genericCheckIfNumber(clientCredentialsGrantResponseFormat.expires_in, { checkedKey: "expires_in", checkedKeys })
    genericCheckIfString(clientCredentialsGrantResponseFormat.access_token, { checkedKey: "access_token", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(clientCredentialsGrantResponseFormat, checkedKeys, options)
}
