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
import type { Spotlight } from "../types/spotlight.d.mjs"

export const checkSpotlightObject = (spotlight: Readonly<Spotlight>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(spotlight).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(spotlight.end_date, { checkedKey: "end_date", checkedKeys })
    genericCheckIfNumber(spotlight.id, { checkedKey: "id", checkedKeys })
    genericCheckIfBoolean(spotlight.mode_specific, { checkedKey: "mode_specific", checkedKeys })
    genericCheckIfString(spotlight.name, { checkedKey: "name", checkedKeys })
    genericCheckIfObject(spotlight.start_date, { checkedKey: "start_date", checkedKeys })
    genericCheckIfString(spotlight.type, { checkedKey: "type", checkedKeys })
    // Check optional keys
    genericCheckIfNumber(spotlight.participant_count, { checkedKey: "participant_count", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(spotlight, checkedKeys, options)
}
