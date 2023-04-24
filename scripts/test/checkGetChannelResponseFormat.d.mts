// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { GetChannelResponseFormat } from "../types/getChannel.d.mjs"

export const checkGetChannelResponseFormatObject = (getChannelResponseFormat: Readonly<GetChannelResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(getChannelResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(getChannelResponseFormat.channel, { checkedKey: "channel", checkedKeys })
    genericCheckIfObject(getChannelResponseFormat.users, { checkedKey: "users", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(getChannelResponseFormat, checkedKeys, options)
}
