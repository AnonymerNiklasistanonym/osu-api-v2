// This script creates example outputs for all files found in the directory
// 'cached-osu-api-responses'

// Package imports
import { promises as fsp } from "fs"
import path from "path"
// Type imports
import type { Score, User, UserRankHistory } from "../src/index"

const cachedOsuApiResponsesDir = path.join(
    __dirname,
    "..",
    "cached-osu-api-responses",
)
const pagesDir = __dirname
const pagesDirExampleOutput = path.join(pagesDir, "example_output")

const trimmedLongDataString = (trimmedAttributes: string[]) => {
    if (trimmedAttributes.length === 0) {
        return ""
    }
    return `(trimmed long data attributes: ${trimmedAttributes
        .map((a) => `\`${a}\``)
        .join(", ")})\n`
}

const genericEndpointGenerator = async <ReturnType>(
    prefix: string,
    trimDataFunc: (input: ReturnType) => string[] = () => [],
) => {
    const files = await fsp.readdir(cachedOsuApiResponsesDir)
    for (const file of files) {
        if (!file.startsWith(`${prefix}_`)) {
            continue
        }
        const fileName = file.substring(0, file.lastIndexOf("."))
        const filePath = path.join(cachedOsuApiResponsesDir, file)
        const fileDataRaw = await fsp.readFile(filePath)
        const fileData = JSON.parse(fileDataRaw.toString()) as ReturnType
        // Trim long content
        const trimmedAttributes: string[] = trimDataFunc(fileData)
        const outputFileName = path.join(
            pagesDirExampleOutput,
            `${fileName}.md`,
        )
        await fsp.mkdir(pagesDirExampleOutput, { recursive: true })
        console.log(
            `created page example output '${prefix}': '${outputFileName}'`,
        )
        await fsp.writeFile(
            outputFileName,
            `${trimmedLongDataString(
                trimmedAttributes,
            )}\`\`\`json\n${JSON.stringify(fileData, undefined, 4)}\n\`\`\`\n`,
        )
    }
}

const usersGet = genericEndpointGenerator<User>("users_get", (input) => {
    const trimmedAttributes: string[] = []
    if (input.page?.html !== undefined) {
        trimmedAttributes.push("page.html")
        input.page.html = input.page.html.substring(0, 20) + "..."
    }
    if (input.page?.raw !== undefined) {
        trimmedAttributes.push("page.raw")
        input.page.raw = input.page.raw.substring(0, 20) + "..."
    }
    if (input.replays_watched_counts !== undefined) {
        trimmedAttributes.push("replays_watched_counts")
        input.replays_watched_counts = input.replays_watched_counts.slice(0, 3)
    }
    if (input.monthly_playcounts !== undefined) {
        trimmedAttributes.push("monthly_playcounts")
        input.monthly_playcounts = input.monthly_playcounts.slice(0, 3)
    }
    if (input.user_achievements !== undefined) {
        trimmedAttributes.push("user_achievements")
        input.user_achievements = input.user_achievements.slice(0, 3)
    }
    if (input.rank_history?.data !== undefined) {
        trimmedAttributes.push("rank_history.data")
        input.rank_history.data = input.rank_history.data.slice(0, 3)
    }
    if (
        (
            (input as unknown as Record<string, string>)
                .rankHistory as unknown as UserRankHistory | undefined
        )?.data !== undefined
    ) {
        trimmedAttributes.push("rankHistory.data")
        ;(
            (input as unknown as Record<string, string>)
                .rankHistory as unknown as UserRankHistory
        ).data = (
            (input as unknown as Record<string, string>)
                .rankHistory as unknown as UserRankHistory
        )?.data.slice(0, 3)
    }
    return trimmedAttributes
})

const usersScores = genericEndpointGenerator<Score[]>("users_scores")
const usersRecentActivity = genericEndpointGenerator<Score[]>(
    "users_recent_activity",
)

Promise.all([usersGet, usersScores, usersRecentActivity]).catch(console.error)
