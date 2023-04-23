// Package imports
import { expect } from "chai"
// Type imports
import type { DefaultCheckResponseOptions } from "../../test_helper.mjs"

export const genericCheckObjectForUncheckedKeys = <DATA_TYPE extends object>(
    input: Readonly<DATA_TYPE>,
    checkedKeys: ReadonlyArray<string>,
    options?: DefaultCheckResponseOptions,
): ReadonlyArray<string> => {
    if (options?.doNotCheckForUncheckedKeys) {
        return checkedKeys
    }
    for (const [key, value] of Object.entries(input)) {
        if (!checkedKeys.includes(key) && value !== undefined) {
            expect.fail(
                `Found unchecked key '${key}': '${JSON.stringify(
                    value,
                )}' (${JSON.stringify(input)})`,
            )
        }
    }
    return checkedKeys
}
