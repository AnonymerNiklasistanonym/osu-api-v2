// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Beatmap } from "../types/beatmap.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapObject = (beatmap: Readonly<Beatmap>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmap).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkBeatmapCompactObject(beatmap, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfNumber(beatmap.accuracy, { checkedKey: "accuracy", checkedKeys })
    genericCheckIfNumber(beatmap.ar, { checkedKey: "ar", checkedKeys })
    genericCheckIfNumber(beatmap.beatmapset_id, { checkedKey: "beatmapset_id", checkedKeys })
    genericCheckIfBoolean(beatmap.convert, { checkedKey: "convert", checkedKeys })
    genericCheckIfNumber(beatmap.count_circles, { checkedKey: "count_circles", checkedKeys })
    genericCheckIfNumber(beatmap.count_sliders, { checkedKey: "count_sliders", checkedKeys })
    genericCheckIfNumber(beatmap.count_spinners, { checkedKey: "count_spinners", checkedKeys })
    genericCheckIfNumber(beatmap.cs, { checkedKey: "cs", checkedKeys })
    genericCheckIfNumber(beatmap.drain, { checkedKey: "drain", checkedKeys })
    genericCheckIfNumber(beatmap.hit_length, { checkedKey: "hit_length", checkedKeys })
    genericCheckIfBoolean(beatmap.is_scoreable, { checkedKey: "is_scoreable", checkedKeys })
    genericCheckIfEnum(beatmap.last_updated, Object.values(Timestamp), { checkedKey: "last_updated", checkedKeys })
    genericCheckIfNumber(beatmap.mode_int, { checkedKey: "mode_int", checkedKeys })
    genericCheckIfNumber(beatmap.passcount, { checkedKey: "passcount", checkedKeys })
    genericCheckIfNumber(beatmap.playcount, { checkedKey: "playcount", checkedKeys })
    genericCheckIfNumber(beatmap.ranked, { checkedKey: "ranked", checkedKeys })
    genericCheckIfString(beatmap.url, { checkedKey: "url", checkedKeys })
    // Check optional keys
    genericCheckIfNumber(beatmap.bpm, { checkedKey: "bpm", checkedKeys, orUndef: true })
    genericCheckIfEnum(beatmap.deleted_at, Object.values(Timestamp), { checkedKey: "deleted_at", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmap, checkedKeys, options)
}
