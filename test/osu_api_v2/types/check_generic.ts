// Package imports
import { expect } from "chai"

export const genericCheckObjectForUncheckedKeys = <DATA_TYPE extends object>(
    input: Readonly<DATA_TYPE>,
    checkedKeys: readonly string[],
): void => {
    for (const [key, value] of Object.entries(input)) {
        if (!checkedKeys.includes(key) && value !== undefined) {
            expect.fail(
                `Found unchecked key '${key}': '${JSON.stringify(value)}'`,
            )
        }
    }
}
