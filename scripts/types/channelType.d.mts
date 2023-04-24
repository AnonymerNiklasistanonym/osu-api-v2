// This is an auto generated file

// Types: ChannelType

/**
 * For PMs, two factors are taken into account:
 * [Source](https://osu.ppy.sh/docs/index.html#channeltype)
 */
export enum ChannelType {
    /**
     * Permission Check for Joining/Messaging: is user in the `announce` group?
     */
    ANNOUNCE = "ANNOUNCE",
    /**
     * Permission Check for Joining/Messaging: is player in channel? (user_channels)
     */
    GROUP = "GROUP",
    /**
     * Permission Check for Joining/Messaging: is player currently in the mp game?
     */
    MULTIPLAYER = "MULTIPLAYER",
    /**
     * Permission Check for Joining/Messaging: see below (user_channels)
     */
    PM = "PM",
    /**
     * Permission Check for Joining/Messaging: is player in the allowed groups? (channel.allowed_groups)
     */
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC",
    SPECTATOR = "SPECTATOR",
    /**
     * Permission Check for Joining/Messaging: `deprecated`
     */
    TEMPORARY = "TEMPORARY",
}
