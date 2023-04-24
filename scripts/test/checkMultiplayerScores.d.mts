// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { MultiplayerScores } from "../types/multiplayerScores.d.mjs"

export const checkMultiplayerScoresObject = (multiplayerScores: Readonly<MultiplayerScores>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(multiplayerScores).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(multiplayerScores.`cursor_string`, { checkedKey: "`cursor_string`", checkedKeys })
    genericCheckIfString(multiplayerScores.`params`, { checkedKey: "`params`", checkedKeys, value: "object" })
    genericCheckIfObject(multiplayerScores.`scores`, { checkedKey: "`scores`", checkedKeys })
    genericCheckIfString(multiplayerScores.`total`, { checkedKey: "`total`", checkedKeys, value: "number?" })
    genericCheckIfObject(multiplayerScores.`user_score`, { checkedKey: "`user_score`", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(multiplayerScores, checkedKeys, options)
}
