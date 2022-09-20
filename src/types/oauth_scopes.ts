/**
 * Scopes that are supported via the authorize endpoint.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#scopes))
 */
export enum OsuApiV2AuthorizeScopes {
    /** Allows sending chat messages on a user's behalf. */
    CHAT_WRITE = "chat.write",
    /** Allows acting as the owner of a client; only available for Client Credentials Grant. */
    DELEGATE = "delegate",
    /** Allows creating and editing forum posts on a user's behalf. */
    FORUM_WRITE = "forum.write",
    /** Allows reading of the user's friend list. */
    FRIENDS_READ = "friends.read",
    /** Allows reading of the public profile of the user (/me). */
    IDENTITY = "identify",
    /** Allows reading of publicly available data on behalf of the user. */
    PUBLIC = "public",
}
