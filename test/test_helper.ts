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
 * Helper method to cache osu!api v2 responses in text files.
 *
 * @param prefix The prefix of the file name.
 * @param name The specifics of the data that is represented.
 * @param jsonData The actual response data that should be cached.
 */
export const saveResponse = async <DATA_TYPE>(
    prefix: string,
    name: string,
    jsonData: DATA_TYPE,
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

/**
 * Helper method to check if osu!api v2 responses fit the expected type.
 *
 * @param jsonData The actual response data that should be cached.
 * @param jsonDataChecker Function that checks the response data.
 * @param jsonDataCheckerOptions Options for data checker.
 */
export const checkResponse = <DATA_TYPE, DATA_TYPE_OPTIONS>(
    jsonData: DATA_TYPE,
    jsonDataChecker: (input: DATA_TYPE, options?: DATA_TYPE_OPTIONS) => void,
    jsonDataCheckerOptions?: DATA_TYPE_OPTIONS,
): void => {
    jsonDataChecker(jsonData, jsonDataCheckerOptions)
}

/**
 * Helper method to cache osu!api v2 responses in text files and check if they
 * fit the expected type.
 *
 * @param prefix The prefix of the file name.
 * @param name The specifics of the data that is represented.
 * @param jsonData The actual response data that should be cached.
 * @param jsonDataChecker Function that checks the response data.
 * @param jsonDataCheckerOptions Options for data checker.
 */
export const saveAndCheckResponse = async <DATA_TYPE, DATA_TYPE_OPTIONS>(
    prefix: string,
    name: string,
    jsonData: DATA_TYPE,
    jsonDataChecker: (input: DATA_TYPE, options?: DATA_TYPE_OPTIONS) => void,
    jsonDataCheckerOptions?: DATA_TYPE_OPTIONS,
): Promise<void> => {
    await saveResponse(prefix, name, jsonData)
    checkResponse(jsonData, jsonDataChecker, jsonDataCheckerOptions)
}
