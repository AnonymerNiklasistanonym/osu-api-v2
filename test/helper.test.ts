// Package imports
import { describe } from "mocha"
// Local imports
import { customErrorsTestSuite } from "./helper/custom_errors.test"
import { urlParameterGeneratorTestSuite } from "./helper/url_parameter_generator.test"

describe("helper", () => {
    customErrorsTestSuite()
    urlParameterGeneratorTestSuite()
})
