// Package imports
import { describe, it } from "mocha"
import { expect } from "chai"
// Local imports
import { urlParameterGenerator } from "../../src/helpers/url_parameter_generator.mjs"
// Type imports
import type { Suite } from "mocha"

export const urlParameterGeneratorTestSuite = (): Suite =>
    describe("urlParameterGenerator", () => {
        it("empty parameter list produces empty string", () => {
            const paramGeneratorEmpty = urlParameterGenerator()
            expect(paramGeneratorEmpty).to.equal("")

            const paramGeneratorEmptyArray = urlParameterGenerator([])
            expect(paramGeneratorEmptyArray).to.equal("")
        })
        it("not empty parameter list produces correct string", () => {
            const paramGeneratorArrayWithUndefinedValues1 =
                urlParameterGenerator([{ name: "a", value: undefined }])
            expect(paramGeneratorArrayWithUndefinedValues1).to.equal("")

            const paramGeneratorArrayWithUndefinedValues2 =
                urlParameterGenerator([{ name: "a" }])
            expect(paramGeneratorArrayWithUndefinedValues2).to.equal("")

            const paramGeneratorArrayWithUndefinedValues3 =
                urlParameterGenerator([
                    { name: "a", value: undefined },
                    { name: "b", value: undefined },
                ])
            expect(paramGeneratorArrayWithUndefinedValues3).to.equal("")

            const paramGeneratorSingleString = urlParameterGenerator([
                { name: "a", value: "b" },
            ])
            expect(paramGeneratorSingleString).to.equal("?a=b")

            const paramGeneratorSingleNumber = urlParameterGenerator([
                { name: "a", value: 42 },
            ])
            expect(paramGeneratorSingleNumber).to.equal("?a=42")

            const paramGeneratorSingleStringArray = urlParameterGenerator([
                { name: "a", value: ["one", "two", "three"] },
            ])
            expect(paramGeneratorSingleStringArray).to.equal("?a=one two three")

            const paramGeneratorMultipleStrings = urlParameterGenerator([
                { name: "a", value: "b" },
                { name: "c", value: "d" },
            ])
            expect(paramGeneratorMultipleStrings).to.equal("?a=b&c=d")

            const paramGeneratorMultipleMixed = urlParameterGenerator([
                { name: "a", value: "b" },
                { name: "c", value: 12 },
            ])
            expect(paramGeneratorMultipleMixed).to.equal("?a=b&c=12")
        })
    })
