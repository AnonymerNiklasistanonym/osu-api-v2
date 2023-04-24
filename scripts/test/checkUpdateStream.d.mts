// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UpdateStream } from "../types/updateStream.d.mjs"

export const checkUpdateStreamObject = (updateStream: Readonly<UpdateStream>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(updateStream).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(updateStream.id, { checkedKey: "id", checkedKeys })
    genericCheckIfBoolean(updateStream.is_featured, { checkedKey: "is_featured", checkedKeys })
    genericCheckIfString(updateStream.name, { checkedKey: "name", checkedKeys })
    // Check optional keys
    genericCheckIfString(updateStream.display_name, { checkedKey: "display_name", checkedKeys, orUndef: true })
    genericCheckIfObject(updateStream.latest_build, { checkedKey: "latest_build", checkedKeys, orUndef: true })
    genericCheckIfNumber(updateStream.user_count, { checkedKey: "user_count", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(updateStream, checkedKeys, options)
}
