// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Beatmapset } from "../types/beatmapset.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapsetObject = (beatmapset: Readonly<Beatmapset>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapset).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkBeatmapsetCompactObject(beatmapset, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfObject(beatmapset.availability, { checkedKey: "availability", checkedKeys })
    genericCheckIfNumber(beatmapset.bpm, { checkedKey: "bpm", checkedKeys })
    genericCheckIfBoolean(beatmapset.can_be_hyped, { checkedKey: "can_be_hyped", checkedKeys })
    genericCheckIfString(beatmapset.creator, { checkedKey: "creator", checkedKeys })
    genericCheckIfBoolean(beatmapset.discussion_locked, { checkedKey: "discussion_locked", checkedKeys })
    genericCheckIfObject(beatmapset.hype, { checkedKey: "hype", checkedKeys })
    genericCheckIfBoolean(beatmapset.is_scoreable, { checkedKey: "is_scoreable", checkedKeys })
    genericCheckIfEnum(beatmapset.last_updated, Object.values(Timestamp), { checkedKey: "last_updated", checkedKeys })
    genericCheckIfObject(beatmapset.nominations, { checkedKey: "nominations", checkedKeys })
    genericCheckIfNumber(beatmapset.ranked, { checkedKey: "ranked", checkedKeys })
    genericCheckIfString(beatmapset.source, { checkedKey: "source", checkedKeys })
    genericCheckIfBoolean(beatmapset.storyboard, { checkedKey: "storyboard", checkedKeys })
    genericCheckIfString(beatmapset.tags, { checkedKey: "tags", checkedKeys })
    genericCheckIfBoolean(beatmapset.has_favourited, { checkedKey: "has_favourited", checkedKeys })
    // Check optional keys
    genericCheckIfString(beatmapset.deleted_at, { checkedKey: "deleted_at", checkedKeys, orUndef: true })
    genericCheckIfString(beatmapset.legacy_thread_url, { checkedKey: "legacy_thread_url", checkedKeys, orUndef: true })
    genericCheckIfEnum(beatmapset.ranked_date, Object.values(Timestamp), { checkedKey: "ranked_date", checkedKeys, orUndef: true })
    genericCheckIfEnum(beatmapset.submitted_date, Object.values(Timestamp), { checkedKey: "submitted_date", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapset, checkedKeys, options)
}
