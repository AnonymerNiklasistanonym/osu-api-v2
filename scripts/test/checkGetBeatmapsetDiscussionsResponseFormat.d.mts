// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { GetBeatmapsetDiscussionsResponseFormat } from "../types/getBeatmapsetDiscussions.d.mjs"

export const checkGetBeatmapsetDiscussionsResponseFormatObject = (getBeatmapsetDiscussionsResponseFormat: Readonly<GetBeatmapsetDiscussionsResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(getBeatmapsetDiscussionsResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfArray(getBeatmapsetDiscussionsResponseFormat.beatmaps, { checkedKey: "beatmaps", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfObject(getBeatmapsetDiscussionsResponseFormat.cursor_string, { checkedKey: "cursor_string", checkedKeys })
    genericCheckIfArray(getBeatmapsetDiscussionsResponseFormat.discussions, { checkedKey: "discussions", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfArray(getBeatmapsetDiscussionsResponseFormat.included_discussions, { checkedKey: "included_discussions", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfObject(getBeatmapsetDiscussionsResponseFormat.reviews_config, { checkedKey: "reviews_config", checkedKeys })
    genericCheckIfArray(getBeatmapsetDiscussionsResponseFormat.users, { checkedKey: "users", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(getBeatmapsetDiscussionsResponseFormat, checkedKeys, options)
}
