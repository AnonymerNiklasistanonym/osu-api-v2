import { describe, it } from "mocha"
import { expect } from "chai"
import { promises as fsp } from "fs"
import path from "path"

import { urlParameterGenerator } from "../src/helpers/url_parameter_generator"

export const saveOsuResponseObjectAsFile = async (
    fileName: string,
    jsonObject: any,
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
