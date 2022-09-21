// Package imports
import { promises as fsp } from "fs"
import path from "path"

/**
 * Helper method to timeout tests where a request takes more than a certain time per request on average.
 *
 * @param requests The number of expected requests being made by the test case.
 * @returns The maximum number of time this test case should take to run before timing it out.
 */
export const timeoutForRequestsInMs = (requests: number) => 2 * 1000 * requests

const cachedOsuApiResponses = path.join(
    __dirname,
    "..",
    "cached-osu-api-responses",
)

/**
 * Helper method to cache osu! api v2 responses in text files.
 *
 * @param prefix The prefix of the file name.
 * @param name The specifics of the data that is represented.
 * @param jsonData The actual response data that should be cached.
 */
export const saveResponse = async (
    prefix: string,
    name: string,
    jsonData: unknown,
): Promise<void> => {
    const outputFile = path.join(
        cachedOsuApiResponses,
        `${prefix}_${name}.json`,
    )
    await fsp.mkdir(cachedOsuApiResponses, {
        recursive: true,
    })
    await fsp.writeFile(outputFile, JSON.stringify(jsonData), {
        encoding: "utf8",
    })
}
