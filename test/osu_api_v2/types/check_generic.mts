// Package imports
import { expect } from "chai"

export interface DefaultCheckResponseOptions {
    doNotCheckForUncheckedKeys?: boolean
}

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

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export interface DefaultCheckOptions<VALUE extends unknown> {
    checkedKey?: string
    checkedKeys?: string[]
    orNull?: boolean
    orUndef?: boolean
    value?: Readonly<VALUE>
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const genericCheckIfType = <DATA_TYPE extends unknown>(
    type: string,
    otherChecks?: (arg: Readonly<DATA_TYPE>) => void,
    input?: Readonly<DATA_TYPE> | null,
    options: Readonly<DefaultCheckOptions<DATA_TYPE>> = {},
): void => {
    if (input === null && options.orNull === true) {
        expect(input).to.be.null
        if (options.checkedKeys && options.checkedKey) {
            options.checkedKeys.push(options.checkedKey)
        }
    } else if (input === undefined && options.orUndef === true) {
        expect(input).to.be.undefined
    } else {
        expect(input).to.be.a(type)
        if (
            otherChecks !== undefined &&
            input !== null &&
            input !== undefined
        ) {
            otherChecks(input)
        }
        if (options.checkedKeys && options.checkedKey) {
            options.checkedKeys.push(options.checkedKey)
        }
    }
}

export interface DefaultCheckOptionsString extends DefaultCheckOptions<string> {
    notEmpty?: boolean
}

export const genericCheckIfString = (
    input?: string | null,
    options: DefaultCheckOptionsString = {},
): void =>
    genericCheckIfType<string>(
        "string",
        (input) => {
            if (options.notEmpty) {
                expect(input).with.a.lengthOf.greaterThan(0)
            }
            if (options.value !== undefined) {
                expect(input).to.be.equal(options.value)
            }
        },
        input,
        options,
    )

export const genericCheckIfBoolean = (
    input?: boolean | null,
    options: Readonly<DefaultCheckOptions<boolean>> = {},
): void =>
    genericCheckIfType(
        "boolean",
        (input) => {
            if (options.value !== undefined) {
                expect(input).to.be.equal(options.value)
            }
        },
        input,
        options,
    )

export interface DefaultCheckOptionsNumber extends DefaultCheckOptions<number> {
    isGreaterThanZero?: boolean
    isPositive?: boolean
}

export const genericCheckIfNumber = (
    input?: number | null,
    options: Readonly<DefaultCheckOptionsNumber> = {},
): void =>
    genericCheckIfType<number>(
        "number",
        (input) => {
            if (options.isPositive) {
                expect(input).to.be.greaterThanOrEqual(0)
            }
            if (options.isGreaterThanZero) {
                expect(input).to.be.greaterThan(0)
            }
            if (options.value !== undefined) {
                expect(input).to.be.equal(options.value)
            }
        },
        input,
        options,
    )

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export interface DefaultCheckOptionsArray<ARRAY_TYPE extends unknown>
    extends DefaultCheckOptions<ARRAY_TYPE[]> {
    hasLength?: number
    notEmpty?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const genericCheckIfArray = <ARRAY_TYPE extends unknown>(
    input?: ReadonlyArray<ARRAY_TYPE> | null,
    options: Readonly<DefaultCheckOptionsArray<ARRAY_TYPE>> = {},
): void =>
    genericCheckIfType(
        "array",
        (input) => {
            if (options.notEmpty) {
                expect(input).with.a.lengthOf.greaterThan(0)
            }
            if (options.hasLength !== undefined) {
                expect(input).with.a.lengthOf(options.hasLength)
            }
        },
        input,
        options,
    )

export const genericCheckIfEnum = <ENUM_TYPE extends string>(
    input: ENUM_TYPE | null | undefined,
    enumValues: ReadonlyArray<ENUM_TYPE>,
    options: Readonly<DefaultCheckOptions<ENUM_TYPE>> = {},
): void =>
    genericCheckIfType(
        "string",
        (input) => {
            expect(enumValues).includes(input, "not a valid enum value")
            if (options.value !== undefined) {
                expect(input).to.be.equal(options.value)
            }
        },
        input,
        options,
    )
