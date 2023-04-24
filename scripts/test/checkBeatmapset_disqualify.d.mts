// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Beatmapset_disqualify } from "../types/notification.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapset_disqualifyObject = (beatmapset_disqualify: Readonly<Beatmapset_disqualify>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapset_disqualify).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapset_disqualify.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfString(beatmapset_disqualify.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(beatmapset_disqualify.source_user_id, { checkedKey: "source_user_id", checkedKeys })
    genericCheckIfString(beatmapset_disqualify.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(beatmapset_disqualify.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfString(beatmapset_disqualify.username, { checkedKey: "username", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapset_disqualify, checkedKeys, options)
}
