// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
import { genericUnknownError } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Score } from "../types/score.d.mjs"

export const checkScoreObject = (score: Readonly<Score>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(score).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(score.id, { checkedKey: "id", checkedKeys })
    genericCheckIfObject(score.best_id, { checkedKey: "best_id", checkedKeys, orNull: true })
    genericCheckIfObject(score.user_id, { checkedKey: "user_id", checkedKeys })
    genericCheckIfNumber(score.accuracy, { checkedKey: "accuracy", checkedKeys })
    genericCheckIfObject(score.mods, { checkedKey: "mods", checkedKeys })
    genericCheckIfObject(score.score, { checkedKey: "score", checkedKeys })
    genericCheckIfObject(score.max_combo, { checkedKey: "max_combo", checkedKeys })
    genericCheckIfBoolean(score.perfect, { checkedKey: "perfect", checkedKeys })
    genericCheckIfObject(score.statistics, { checkedKey: "statistics", checkedKeys })
    genericCheckIfBoolean(score.passed, { checkedKey: "passed", checkedKeys })
    genericUnknownError(score.pp, { checkedKey: "pp", checkedKeys })
    genericUnknownError(score.rank, { checkedKey: "rank", checkedKeys })
    genericUnknownError(score.created_at, { checkedKey: "created_at", checkedKeys })
    genericUnknownError(score.mode, { checkedKey: "mode", checkedKeys })
    genericUnknownError(score.mode_int, { checkedKey: "mode_int", checkedKeys })
    genericUnknownError(score.replay, { checkedKey: "replay", checkedKeys })
    // Check optional keys
    genericUnknownError(score.beatmap, { checkedKey: "beatmap", checkedKeys, orUndef: true })
    genericUnknownError(score.beatmapset, { checkedKey: "beatmapset", checkedKeys, orUndef: true })
    genericUnknownError(score.rank_country, { checkedKey: "rank_country", checkedKeys, orUndef: true })
    genericUnknownError(score.rank_global, { checkedKey: "rank_global", checkedKeys, orUndef: true })
    genericUnknownError(score.weight, { checkedKey: "weight", checkedKeys, orUndef: true })
    genericUnknownError(score.user, { checkedKey: "user", checkedKeys, orUndef: true })
    genericUnknownError(score.match, { checkedKey: "match", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(score, checkedKeys, options)
}
