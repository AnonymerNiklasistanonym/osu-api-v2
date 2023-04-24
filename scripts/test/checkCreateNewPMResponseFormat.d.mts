// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { CreateNewPMResponseFormat } from "../types/createNewPM.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkCreateNewPMResponseFormatObject = (createNewPMResponseFormat: Readonly<CreateNewPMResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(createNewPMResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(createNewPMResponseFormat.channel, { checkedKey: "channel", checkedKeys })
    genericCheckIfObject(createNewPMResponseFormat.message, { checkedKey: "message", checkedKeys })
    genericCheckIfObject(createNewPMResponseFormat.new_channel_id, { checkedKey: "new_channel_id", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(createNewPMResponseFormat, checkedKeys, options)
}
