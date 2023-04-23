// Package imports
import { describe } from "mocha"
// Local imports
import { customErrorsTestSuite } from "./helper/custom_errors.test.mjs"
import { urlParameterGeneratorTestSuite } from "./helper/url_parameter_generator.test.mjs"
import { urlPathGeneratorTestSuite } from "./helper/url_path_generator.test.mjs"
import { webRequestTestSuite } from "./helper/web_request.test.mjs"

describe("helper", () => {
    customErrorsTestSuite()
    urlParameterGeneratorTestSuite()
    urlPathGeneratorTestSuite()
    webRequestTestSuite()
})
