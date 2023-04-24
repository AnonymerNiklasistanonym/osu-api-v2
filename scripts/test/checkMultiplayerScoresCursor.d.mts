// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { MultiplayerScoresCursor } from "../types/multiplayerScoresCursor.d.mjs"

export const checkMultiplayerScoresCursorObject = (multiplayerScoresCursor: Readonly<MultiplayerScoresCursor>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(multiplayerScoresCursor).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(multiplayerScoresCursor.`score_id`, { checkedKey: "`score_id`", checkedKeys, value: "number" })
    genericCheckIfString(multiplayerScoresCursor.`total_score`, { checkedKey: "`total_score`", checkedKeys, value: "number" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(multiplayerScoresCursor, checkedKeys, options)
}
