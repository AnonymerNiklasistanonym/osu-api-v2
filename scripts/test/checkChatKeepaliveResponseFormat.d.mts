// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { ChatKeepaliveResponseFormat } from "../types/chatKeepalive.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkChatKeepaliveResponseFormatObject = (chatKeepaliveResponseFormat: Readonly<ChatKeepaliveResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(chatKeepaliveResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfArray(chatKeepaliveResponseFormat.silences, { checkedKey: "silences", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(chatKeepaliveResponseFormat, checkedKeys, options)
}
