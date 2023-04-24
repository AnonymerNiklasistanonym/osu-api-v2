// This is an auto generated file

// Types: Giver, KudosuHistory, Post

// Type imports
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#giver)
 */
export interface Giver {
    url: string
    username: string
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#kudosuhistory)
 */
export interface KudosuHistory {
    /**
     * One of `give`, `vote.give`, `reset`, `vote.reset`, `revoke`, or `vote.revoke`.
     */
    action: string
    amount: number
    created_at: Timestamp
    /**
     * Simple detail of the user who started the exchange.
     */
    giver?: Giver
    id: number
    /**
     * Object type which the exchange happened on (`forum_post`, etc).
     */
    model: string
    /**
     * Simple detail of the object for display.
     */
    post: Post
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#post)
 */
export interface Post {
    /**
     * Title of the object. It'll be "[deleted beatmap]" for deleted beatmaps.
     */
    title: string
    /**
     * Url of the object.
     */
    url?: string
}
