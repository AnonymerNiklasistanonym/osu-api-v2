// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { ScoreStatistics } from "../types/score.d.mjs"

export const checkScoreStatisticsObject = (scoreStatistics: Readonly<ScoreStatistics>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(scoreStatistics).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(scoreStatistics.count_50, { checkedKey: "count_50", checkedKeys })
    genericCheckIfObject(scoreStatistics.count_100, { checkedKey: "count_100", checkedKeys })
    genericCheckIfObject(scoreStatistics.count_300, { checkedKey: "count_300", checkedKeys })
    genericCheckIfObject(scoreStatistics.count_geki, { checkedKey: "count_geki", checkedKeys })
    genericCheckIfObject(scoreStatistics.count_katu, { checkedKey: "count_katu", checkedKeys })
    genericCheckIfObject(scoreStatistics.count_miss, { checkedKey: "count_miss", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(scoreStatistics, checkedKeys, options)
}
