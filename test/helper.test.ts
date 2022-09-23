// Package imports
import { describe } from "mocha"
// Local imports
import { customErrorsTestSuite } from "./helper/custom_errors.test"
import { urlParameterGeneratorTestSuite } from "./helper/url_parameter_generator.test"
import { urlPathGeneratorTestSuite } from "./helper/url_path_generator.test"
import { webRequestTestSuite } from "./helper/web_request.test"

describe("helper", () => {
    customErrorsTestSuite()
    urlParameterGeneratorTestSuite()
    urlPathGeneratorTestSuite()
    webRequestTestSuite()
})
