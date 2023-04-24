// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeBeatmapsetUpload } from "../types/event.d.mjs"

export const checkEventTypeBeatmapsetUploadObject = (eventTypeBeatmapsetUpload: Readonly<EventTypeBeatmapsetUpload>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeBeatmapsetUpload).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeBeatmapsetUpload, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfObject(eventTypeBeatmapsetUpload.beatmapset, { checkedKey: "beatmapset", checkedKeys })
    genericCheckIfObject(eventTypeBeatmapsetUpload.user, { checkedKey: "user", checkedKeys })
    genericCheckIfString(eventTypeBeatmapsetUpload.type, { checkedKey: "type", checkedKeys, value: "beatmapsetUpload" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeBeatmapsetUpload, checkedKeys, options)
}
