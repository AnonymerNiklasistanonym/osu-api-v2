// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { MultiplayerScoresAround } from "../types/multiplayerScoresAround.d.mjs"

export const checkMultiplayerScoresAroundObject = (multiplayerScoresAround: Readonly<MultiplayerScoresAround>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(multiplayerScoresAround).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(multiplayerScoresAround.`higher`, { checkedKey: "`higher`", checkedKeys })
    genericCheckIfObject(multiplayerScoresAround.`lower`, { checkedKey: "`lower`", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(multiplayerScoresAround, checkedKeys, options)
}
