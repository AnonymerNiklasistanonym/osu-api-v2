// Package imports
import { describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import { urlPathGenerator } from "../../src/helpers/url_path_generator"

export const urlPathGeneratorTestSuite = (): Suite =>
    describe("urlPathGenerator", () => {
        it("empty path list produces wmpty string", () => {
            const pathGeneratorEmpty = urlPathGenerator()
            expect(pathGeneratorEmpty).to.equal("")

            const pathGeneratorOnlyUndefinedValues1 =
                urlPathGenerator(undefined)
            expect(pathGeneratorOnlyUndefinedValues1).to.equal("")

            const pathGeneratorOnlyUndefinedValues2 = urlPathGenerator(
                undefined,
                undefined,
                undefined,
            )
            expect(pathGeneratorOnlyUndefinedValues2).to.equal("")
        })
        it("not empty path list produces correct string", () => {
            const pathGeneratorOnlyStrings1 = urlPathGenerator("a", "b", "c")
            expect(pathGeneratorOnlyStrings1).to.equal("a/b/c")

            const pathGeneratorOnlyStrings2 = urlPathGenerator("a")
            expect(pathGeneratorOnlyStrings2).to.equal("a")

            const pathGeneratorOnlyNumbers1 = urlPathGenerator(1, 2, 3)
            expect(pathGeneratorOnlyNumbers1).to.equal("1/2/3")

            const pathGeneratorOnlyNumbers2 = urlPathGenerator(1)
            expect(pathGeneratorOnlyNumbers2).to.equal("1")

            const pathGeneratorMixed1 = urlPathGenerator("a", 2, 3, "four")
            expect(pathGeneratorMixed1).to.equal("a/2/3/four")

            const pathGeneratorMixed2 = urlPathGenerator("users", 2, undefined)
            expect(pathGeneratorMixed2).to.equal("users/2")
        })
    })
