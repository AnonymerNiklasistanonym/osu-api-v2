import { describe, it } from "mocha"
import { expect } from "chai"
import { urlParameterGenerator } from "../src/helpers/url_parameter_generator"

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
