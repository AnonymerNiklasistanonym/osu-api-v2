// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
import { genericUnknownError } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserCompact } from "../types/userCompact.d.mjs"

export const checkUserCompactObject = (userCompact: Readonly<UserCompact>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userCompact).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(userCompact.avatar_url, { checkedKey: "avatar_url", checkedKeys })
    genericCheckIfString(userCompact.country_code, { checkedKey: "country_code", checkedKeys })
    genericCheckIfString(userCompact.default_group, { checkedKey: "default_group", checkedKeys })
    genericCheckIfNumber(userCompact.id, { checkedKey: "id", checkedKeys })
    genericCheckIfBoolean(userCompact.is_active, { checkedKey: "is_active", checkedKeys })
    genericCheckIfBoolean(userCompact.is_bot, { checkedKey: "is_bot", checkedKeys })
    genericCheckIfBoolean(userCompact.is_deleted, { checkedKey: "is_deleted", checkedKeys })
    genericCheckIfBoolean(userCompact.is_online, { checkedKey: "is_online", checkedKeys })
    genericCheckIfBoolean(userCompact.is_supporter, { checkedKey: "is_supporter", checkedKeys })
    genericCheckIfBoolean(userCompact.pm_friends_only, { checkedKey: "pm_friends_only", checkedKeys })
    genericCheckIfString(userCompact.username, { checkedKey: "username", checkedKeys })
    // Check optional keys
    genericCheckIfEnum(userCompact.last_visit, Object.values(Timestamp), { checkedKey: "last_visit", checkedKeys, orUndef: true })
    genericCheckIfString(userCompact.profile_colour, { checkedKey: "profile_colour", checkedKeys, orUndef: true })
    genericCheckIfArray(userCompact.account_history, { checkedKey: "account_history", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfObject(userCompact.active_tournament_banner, { checkedKey: "active_tournament_banner", checkedKeys, orUndef: true })
    genericCheckIfArray(userCompact.badges, { checkedKey: "badges", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfNumber(userCompact.beatmap_playcounts_count, { checkedKey: "beatmap_playcounts_count", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.blocks, { checkedKey: "blocks", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.country, { checkedKey: "country", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.cover, { checkedKey: "cover", checkedKeys, orUndef: true })
    genericCheckIfNumber(userCompact.favourite_beatmapset_count, { checkedKey: "favourite_beatmapset_count", checkedKeys, orUndef: true })
    genericCheckIfNumber(userCompact.follower_count, { checkedKey: "follower_count", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.friends, { checkedKey: "friends", checkedKeys, orUndef: true })
    genericCheckIfNumber(userCompact.graveyard_beatmapset_count, { checkedKey: "graveyard_beatmapset_count", checkedKeys, orUndef: true })
    genericCheckIfArray(userCompact.groups, { checkedKey: "groups", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfBoolean(userCompact.is_restricted, { checkedKey: "is_restricted", checkedKeys, orUndef: true })
    genericCheckIfNumber(userCompact.loved_beatmapset_count, { checkedKey: "loved_beatmapset_count", checkedKeys, orUndef: true })
    genericCheckIfArray(userCompact.monthly_playcounts, { checkedKey: "monthly_playcounts", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericUnknownError(userCompact.page, { checkedKey: "page", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.pending_beatmapset_count, { checkedKey: "pending_beatmapset_count", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.previous_usernames, { checkedKey: "previous_usernames", checkedKeys, orUndef: true })
    genericCheckIfObject(userCompact.rank_highest, { checkedKey: "rank_highest", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.rank_history, { checkedKey: "rank_history", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.ranked_beatmapset_count, { checkedKey: "ranked_beatmapset_count", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.replays_watched_counts, { checkedKey: "replays_watched_counts", checkedKeys, orUndef: true })
    genericCheckIfNumber(userCompact.scores_best_count, { checkedKey: "scores_best_count", checkedKeys, orUndef: true })
    genericCheckIfNumber(userCompact.scores_first_count, { checkedKey: "scores_first_count", checkedKeys, orUndef: true })
    genericCheckIfNumber(userCompact.scores_recent_count, { checkedKey: "scores_recent_count", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.statistics, { checkedKey: "statistics", checkedKeys, orUndef: true })
    genericCheckIfObject(userCompact.statistics_rulesets, { checkedKey: "statistics_rulesets", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.support_level, { checkedKey: "support_level", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.unread_pm_count, { checkedKey: "unread_pm_count", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.user_achievements, { checkedKey: "user_achievements", checkedKeys, orUndef: true })
    genericUnknownError(userCompact.user_preferences, { checkedKey: "user_preferences", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userCompact, checkedKeys, options)
}
