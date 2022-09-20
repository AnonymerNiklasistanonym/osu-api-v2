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
    url: string
    username: string
}

export interface EventBeatmap {
    title: string
    url: string
}

export interface EventAchievement extends Event {
    achievement: string
    type: EventType.RankLost // ?????
    user: EventUser
}

export interface EventRank extends Event {
    beatmap: EventBeatmap
    mode: GameMode
    rank: number
    scoreRank: string
    type: EventType.Rank
    user: EventUser
}

export interface EventRankLost extends Event {
    beatmap: EventBeatmap
    mode: GameMode
    type: EventType.RankLost
    user: EventUser
}
