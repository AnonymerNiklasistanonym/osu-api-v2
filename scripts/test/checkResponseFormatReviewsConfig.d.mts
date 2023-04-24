// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { ResponseFormatReviewsConfig } from "../types/getBeatmapsetDiscussions.d.mjs"

export const checkResponseFormatReviewsConfigObject = (responseFormatReviewsConfig: Readonly<ResponseFormatReviewsConfig>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(responseFormatReviewsConfig).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(responseFormatReviewsConfig.max_blocks, { checkedKey: "max_blocks", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(responseFormatReviewsConfig, checkedKeys, options)
}
