// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Beatmapset_nominate } from "../types/notification.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapset_nominateObject = (beatmapset_nominate: Readonly<Beatmapset_nominate>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapset_nominate).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapset_nominate.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfString(beatmapset_nominate.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(beatmapset_nominate.source_user_id, { checkedKey: "source_user_id", checkedKeys })
    genericCheckIfString(beatmapset_nominate.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(beatmapset_nominate.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfString(beatmapset_nominate.username, { checkedKey: "username", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapset_nominate, checkedKeys, options)
}
