import { describe, it } from "mocha"
import { expect } from "chai"
import { promises as fsp } from "fs"
import path from "path"

import { urlParameterGenerator } from "../src/helpers/url_parameter_generator"
import { OsuApiV2WebRequestError } from "../src/helpers/custom_errors"

export const saveOsuResponseObjectAsFile = async (
    fileName: string,
    jsonObject: unknown,
): Promise<void> => {
    const outputDir = path.join(__dirname, "..", "cached-osu-api-responses")
    await fsp.mkdir(outputDir, {
        recursive: true,
    })
    const outputFile = path.join(outputDir, `${fileName}.json`)
    await fsp.writeFile(outputFile, JSON.stringify(jsonObject, undefined, 4), {
        encoding: "utf8",
    })
}

export enum OsuApiV2WebRequestErrorType {
    NOT_FOUND,
    UNAUTHORIZED,
}

export const checkOsuApiV2WebRequestError = (
    error: OsuApiV2WebRequestError | null,
    errorType?: OsuApiV2WebRequestErrorType,
): void => {
    expect(error).to.be.an("Error")
    if (error == null) {
        return
    }
    expect(error.statusCode).to.be.a("number")
    expect(error.statusText).to.be.a("string")

    switch (errorType) {
        case OsuApiV2WebRequestErrorType.NOT_FOUND:
            expect(error.statusCode).equal(404)
            expect(error.statusText).equal("Not Found")
            break
        case OsuApiV2WebRequestErrorType.UNAUTHORIZED:
            expect(error.statusCode).equal(401)
            expect(error.statusText).equal("Unauthorized")
            break
        default:
            break
    }
}

describe("helper", async () => {
    it("urlParameterGenerator", async () => {
        const paramGeneratorEmpty = urlParameterGenerator()
        expect(paramGeneratorEmpty).to.equal("")

        const paramGeneratorEmptyArray = urlParameterGenerator([])
        expect(paramGeneratorEmptyArray).to.equal("")

        const paramGeneratorArrayWithUndefinedValues1 = urlParameterGenerator([
            { name: "a", value: undefined },
        ])
        expect(paramGeneratorArrayWithUndefinedValues1).to.equal("")

        const paramGeneratorArrayWithUndefinedValues2 = urlParameterGenerator([
            { name: "a" },
        ])
        expect(paramGeneratorArrayWithUndefinedValues2).to.equal("")

        const paramGeneratorArrayWithUndefinedValues3 = urlParameterGenerator([
            { name: "a", value: undefined },
            { name: "b", value: undefined },
        ])
        expect(paramGeneratorArrayWithUndefinedValues3).to.equal("")

        const paramGeneratorSingleString = urlParameterGenerator([
            { name: "a", value: "b" },
        ])
        expect(paramGeneratorSingleString).to.equal("?a=b")

        const paramGeneratorMultipleStrings = urlParameterGenerator([
            { name: "a", value: "b" },
            { name: "c", value: "d" },
        ])
        expect(paramGeneratorMultipleStrings).to.equal("?a=b&c=d")
    })
})
