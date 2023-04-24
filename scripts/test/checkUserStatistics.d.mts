// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserStatistics } from "../types/userStatistics.d.mjs"

export const checkUserStatisticsObject = (userStatistics: Readonly<UserStatistics>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userStatistics).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(userStatistics.count_100, { checkedKey: "count_100", checkedKeys })
    genericCheckIfNumber(userStatistics.count_300, { checkedKey: "count_300", checkedKeys })
    genericCheckIfNumber(userStatistics.count_50, { checkedKey: "count_50", checkedKeys })
    genericCheckIfNumber(userStatistics.count_miss, { checkedKey: "count_miss", checkedKeys })
    genericCheckIfObject(userStatistics.grade_counts, { checkedKey: "grade_counts", checkedKeys })
    genericCheckIfNumber(userStatistics.hit_accuracy, { checkedKey: "hit_accuracy", checkedKeys })
    genericCheckIfBoolean(userStatistics.is_ranked, { checkedKey: "is_ranked", checkedKeys })
    genericCheckIfObject(userStatistics.level, { checkedKey: "level", checkedKeys })
    genericCheckIfNumber(userStatistics.maximum_combo, { checkedKey: "maximum_combo", checkedKeys })
    genericCheckIfNumber(userStatistics.play_count, { checkedKey: "play_count", checkedKeys })
    genericCheckIfNumber(userStatistics.play_time, { checkedKey: "play_time", checkedKeys })
    genericCheckIfNumber(userStatistics.pp, { checkedKey: "pp", checkedKeys })
    genericCheckIfNumber(userStatistics.ranked_score, { checkedKey: "ranked_score", checkedKeys })
    genericCheckIfNumber(userStatistics.replays_watched_by_others, { checkedKey: "replays_watched_by_others", checkedKeys })
    genericCheckIfNumber(userStatistics.total_hits, { checkedKey: "total_hits", checkedKeys })
    genericCheckIfNumber(userStatistics.total_score, { checkedKey: "total_score", checkedKeys })
    genericCheckIfObject(userStatistics.user, { checkedKey: "user", checkedKeys })
    // Check optional keys
    genericCheckIfNumber(userStatistics.global_rank, { checkedKey: "global_rank", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userStatistics, checkedKeys, options)
}
