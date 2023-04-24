// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Event } from "../types/event.d.mjs"

export const checkEventObject = (event: Readonly<Event>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(event).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfEnum(event.created_at, Object.values(Timestamp), { checkedKey: "created_at", checkedKeys })
    genericCheckIfNumber(event.id, { checkedKey: "id", checkedKeys })
    // TODO Unable to handle multiple types (event.type - "achievement","beatmapPlaycount","beatmapsetApprove","beatmapsetDelete","beatmapsetRevive","beatmapsetUpdate","beatmapsetUpload","rank","rankLost","userSupportAgain","userSupportFirst","userSupportGift","usernameChange")
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(event, checkedKeys, options)
}
