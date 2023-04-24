// Package imports
import { promises as fs } from "fs"

export const fsExists = async (filePath: string) => {
    try {
        await fs.stat(filePath)
        return true
    } catch {
        return false
    }
}

export const camelize = (str: string): string =>
    str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase(),
        )
        .replace(/\s+/g, "")

export const pascalize = (str: string): string => {
    const camelizedName = camelize(str)
    if (camelizedName.length > 0) {
        return camelizedName.charAt(0).toUpperCase() + camelizedName.slice(1)
    }
    return ""
}

export type ComparatorValues = -1 | 0 | 1

export const genericStringSorter = (
    stringA?: string,
    stringB?: string,
): ComparatorValues => {
    if (stringA === undefined || stringB === undefined) {
        return 0
    }
    return stringA < stringB ? -1 : stringA > stringB ? 1 : 0
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const removeDuplicates = <ELEMENT_TYPE extends unknown>(
    array: ReadonlyArray<ELEMENT_TYPE>,
    same: (a: Readonly<ELEMENT_TYPE>, b: Readonly<ELEMENT_TYPE>) => boolean = (
        a,
        b,
    ) => a === b,
): ELEMENT_TYPE[] =>
    array.filter(
        (value, index, self) => index === self.findIndex((t) => same(value, t)),
    )
