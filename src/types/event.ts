import { GameMode } from "./game_mode"
import type { Timestamp } from "./timestamp"

export enum EventType {
    Achievement = "achievement",
    BeatmapPlaycount = "beatmapPlaycount",
    BeatmapsetApprove = "beatmapsetApprove",
    BeatmapsetDelete = "beatmapsetDelete",
    BeatmapsetRevive = "beatmapsetRevive",
    BeatmapsetUpdate = "beatmapsetUpdate",
    BeatmapsetUpload = "beatmapsetUpload",
    Rank = "rank",
    RankLost = "rankLost",
    UserSupportAgain = "userSupportAgain",
    UserSupportFirst = "userSupportFirst",
    UserSupportGift = "userSupportGift",
    UsernameChange = "usernameChange",
}

export interface Event {
    created_at: Timestamp
    id: number
    type: EventType
}

export interface EventUser {
    username: string
    url: string
}

export interface EventBeatmap {
    title: string
    url: string
}

export interface EventAchievement extends Event {
    type: EventType.RankLost
    achievement: string // ?????
    user: EventUser
}

export interface EventRank extends Event {
    type: EventType.Rank
    scoreRank: string
    rank: number
    mode: GameMode
    beatmap: EventBeatmap
    user: EventUser
}

export interface EventRankLost extends Event {
    type: EventType.RankLost
    mode: GameMode
    beatmap: EventBeatmap
    user: EventUser
}
