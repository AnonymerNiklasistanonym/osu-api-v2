// Package imports
import { expect } from "chai"
// Relative imports
import { GameMode } from "../types/gameMode.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapCompact } from "../types/beatmapCompact.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapCompactObject = (beatmapCompact: Readonly<BeatmapCompact>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapCompact).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapCompact.beatmapset_id, { checkedKey: "beatmapset_id", checkedKeys })
    genericCheckIfNumber(beatmapCompact.difficulty_rating, { checkedKey: "difficulty_rating", checkedKeys })
    genericCheckIfNumber(beatmapCompact.id, { checkedKey: "id", checkedKeys })
    genericCheckIfEnum(beatmapCompact.mode, Object.values(GameMode), { checkedKey: "mode", checkedKeys })
    genericCheckIfString(beatmapCompact.status, { checkedKey: "status", checkedKeys })
    genericCheckIfNumber(beatmapCompact.total_length, { checkedKey: "total_length", checkedKeys })
    genericCheckIfNumber(beatmapCompact.user_id, { checkedKey: "user_id", checkedKeys })
    genericCheckIfString(beatmapCompact.version, { checkedKey: "version", checkedKeys })
    // Check optional keys
    // TODO Unable to handle multiple types (beatmapCompact.beatmapset - `Beatmapset`,`BeatmapsetCompact`,null)
    genericCheckIfString(beatmapCompact.checksum, { checkedKey: "checksum", checkedKeys, orUndef: true })
    genericCheckIfObject(beatmapCompact.failtimes, { checkedKey: "failtimes", checkedKeys, orUndef: true })
    genericCheckIfNumber(beatmapCompact.max_combo, { checkedKey: "max_combo", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapCompact, checkedKeys, options)
}
