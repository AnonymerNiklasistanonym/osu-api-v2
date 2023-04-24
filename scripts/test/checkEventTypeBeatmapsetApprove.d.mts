// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeBeatmapsetApprove } from "../types/event.d.mjs"

export const checkEventTypeBeatmapsetApproveObject = (eventTypeBeatmapsetApprove: Readonly<EventTypeBeatmapsetApprove>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeBeatmapsetApprove).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeBeatmapsetApprove, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfString(eventTypeBeatmapsetApprove.approval, { checkedKey: "approval", checkedKeys })
    genericCheckIfObject(eventTypeBeatmapsetApprove.beatmapset, { checkedKey: "beatmapset", checkedKeys })
    genericCheckIfObject(eventTypeBeatmapsetApprove.user, { checkedKey: "user", checkedKeys })
    genericCheckIfString(eventTypeBeatmapsetApprove.type, { checkedKey: "type", checkedKeys, value: "beatmapsetApprove" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeBeatmapsetApprove, checkedKeys, options)
}
