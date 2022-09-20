// This script creates example outputs for all files found in the directory
// 'cached-osu-api-responses'

// Package imports
import { promises as fsp } from "fs"
import path from "path"
// Type imports
import type { User, UserRankHistory } from "../src/index"

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

const usersGet = async () => {
    const files = await fsp.readdir(cachedOsuApiResponsesDir)
    for (const file of files) {
        if (!file.startsWith("users_get_")) {
            continue
        }
        const fileName = file.substring(0, file.lastIndexOf("."))
        const filePath = path.join(cachedOsuApiResponsesDir, file)
        const fileDataRaw = await fsp.readFile(filePath)
        const fileData = JSON.parse(fileDataRaw.toString()) as User
        // Trim long content
        const trimmedAttributes: string[] = []
        if (fileData.page?.html !== undefined) {
            trimmedAttributes.push("page.html")
            fileData.page.html = fileData.page.html.substring(0, 20) + "..."
        }
        if (fileData.page?.raw !== undefined) {
            trimmedAttributes.push("page.raw")
            fileData.page.raw = fileData.page.raw.substring(0, 20) + "..."
        }
        if (fileData.replays_watched_counts !== undefined) {
            trimmedAttributes.push("replays_watched_counts")
            fileData.replays_watched_counts =
                fileData.replays_watched_counts.slice(0, 3)
        }
        if (fileData.monthly_playcounts !== undefined) {
            trimmedAttributes.push("monthly_playcounts")
            fileData.monthly_playcounts = fileData.monthly_playcounts.slice(
                0,
                3,
            )
        }
        if (fileData.user_achievements !== undefined) {
            trimmedAttributes.push("user_achievements")
            fileData.user_achievements = fileData.user_achievements.slice(0, 3)
        }
        if (fileData.rank_history?.data !== undefined) {
            trimmedAttributes.push("rank_history.data")
            fileData.rank_history.data = fileData.rank_history.data.slice(0, 3)
        }
        if (
            (
                (fileData as unknown as Record<string, string>)
                    .rankHistory as unknown as UserRankHistory | undefined
            )?.data !== undefined
        ) {
            trimmedAttributes.push("rankHistory.data")
            ;(
                (fileData as unknown as Record<string, string>)
                    .rankHistory as unknown as UserRankHistory
            ).data = (
                (fileData as unknown as Record<string, string>)
                    .rankHistory as unknown as UserRankHistory
            )?.data.slice(0, 3)
        }
        const outputFileName = path.join(
            pagesDirExampleOutput,
            `${fileName}.md`,
        )
        await fsp.mkdir(pagesDirExampleOutput, { recursive: true })
        console.log(
            `created page example output 'users_get': '${outputFileName}'`,
        )
        await fsp.writeFile(
            outputFileName,
            `${trimmedLongDataString(
                trimmedAttributes,
            )}\`\`\`json\n${JSON.stringify(fileData, undefined, 4)}\n\`\`\`\n`,
        )
    }
}

Promise.all([usersGet()]).catch(console.error)
