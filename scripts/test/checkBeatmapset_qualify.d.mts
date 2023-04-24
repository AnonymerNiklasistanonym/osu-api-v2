// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Beatmapset_qualify } from "../types/notification.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapset_qualifyObject = (beatmapset_qualify: Readonly<Beatmapset_qualify>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapset_qualify).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapset_qualify.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfString(beatmapset_qualify.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(beatmapset_qualify.source_user_id, { checkedKey: "source_user_id", checkedKeys })
    genericCheckIfString(beatmapset_qualify.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(beatmapset_qualify.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfString(beatmapset_qualify.username, { checkedKey: "username", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapset_qualify, checkedKeys, options)
}
