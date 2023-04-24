// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
import { genericUnknownError } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapsetCompact } from "../types/beatmapsetCompact.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapsetCompactObject = (beatmapsetCompact: Readonly<BeatmapsetCompact>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapsetCompact).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(beatmapsetCompact.artist, { checkedKey: "artist", checkedKeys })
    genericCheckIfString(beatmapsetCompact.artist_unicode, { checkedKey: "artist_unicode", checkedKeys })
    genericCheckIfObject(beatmapsetCompact.covers, { checkedKey: "covers", checkedKeys })
    genericCheckIfString(beatmapsetCompact.creator, { checkedKey: "creator", checkedKeys })
    genericCheckIfNumber(beatmapsetCompact.favourite_count, { checkedKey: "favourite_count", checkedKeys })
    genericCheckIfNumber(beatmapsetCompact.id, { checkedKey: "id", checkedKeys })
    genericCheckIfBoolean(beatmapsetCompact.nsfw, { checkedKey: "nsfw", checkedKeys })
    genericCheckIfNumber(beatmapsetCompact.play_count, { checkedKey: "play_count", checkedKeys })
    genericCheckIfString(beatmapsetCompact.preview_url, { checkedKey: "preview_url", checkedKeys })
    genericCheckIfString(beatmapsetCompact.source, { checkedKey: "source", checkedKeys })
    genericCheckIfString(beatmapsetCompact.status, { checkedKey: "status", checkedKeys })
    genericCheckIfString(beatmapsetCompact.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(beatmapsetCompact.title_unicode, { checkedKey: "title_unicode", checkedKeys })
    genericCheckIfNumber(beatmapsetCompact.user_id, { checkedKey: "user_id", checkedKeys })
    genericCheckIfBoolean(beatmapsetCompact.video, { checkedKey: "video", checkedKeys })
    // Check optional keys
    genericCheckIfArray(beatmapsetCompact.beatmaps, { checkedKey: "beatmaps", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfObject(beatmapsetCompact.converts, { checkedKey: "converts", checkedKeys, orUndef: true })
    genericUnknownError(beatmapsetCompact.current_user_attributes, { checkedKey: "current_user_attributes", checkedKeys, orUndef: true })
    genericCheckIfObject(beatmapsetCompact.description, { checkedKey: "description", checkedKeys, orUndef: true })
    genericUnknownError(beatmapsetCompact.discussions, { checkedKey: "discussions", checkedKeys, orUndef: true })
    genericUnknownError(beatmapsetCompact.events, { checkedKey: "events", checkedKeys, orUndef: true })
    genericCheckIfObject(beatmapsetCompact.genre, { checkedKey: "genre", checkedKeys, orUndef: true })
    genericCheckIfBoolean(beatmapsetCompact.has_favourited, { checkedKey: "has_favourited", checkedKeys, orUndef: true })
    genericCheckIfObject(beatmapsetCompact.language, { checkedKey: "language", checkedKeys, orUndef: true })
    genericCheckIfObject(beatmapsetCompact.nominations, { checkedKey: "nominations", checkedKeys, orUndef: true })
    genericCheckIfArray(beatmapsetCompact.pack_tags, { checkedKey: "pack_tags", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfString(a, {  }) })
    genericCheckIfObject(beatmapsetCompact.ratings, { checkedKey: "ratings", checkedKeys, orUndef: true })
    genericCheckIfObject(beatmapsetCompact.recent_favourites, { checkedKey: "recent_favourites", checkedKeys, orUndef: true })
    genericCheckIfObject(beatmapsetCompact.related_users, { checkedKey: "related_users", checkedKeys, orUndef: true })
    genericCheckIfObject(beatmapsetCompact.user, { checkedKey: "user", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapsetCompact, checkedKeys, options)
}
