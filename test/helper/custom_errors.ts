// Package imports
import { expect } from "chai"
// Local imports
import { OsuApiV2ErrorCode } from "../../src/helpers/custom_errors"
// Type imports
import type {
    OsuApiV2Error,
    OsuApiV2WebRequestError,
} from "../../src/helpers/custom_errors"

export const enum OsuApiV2WebRequestExpectedErrorType {
    NOT_FOUND,
    UNAUTHORIZED,
}

export const checkOsuApiV2WebRequestError = (
    error: OsuApiV2WebRequestError,
    expectedErrorType: OsuApiV2WebRequestExpectedErrorType,
): void => {
    expect(error).to.be.an("Error")

    switch (expectedErrorType) {
        case OsuApiV2WebRequestExpectedErrorType.NOT_FOUND:
        case OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED:
            expect(error.statusCode).to.be.a("number")
            expect(error.statusText).to.be.a("string")
            break
    }

    switch (expectedErrorType) {
        case OsuApiV2WebRequestExpectedErrorType.NOT_FOUND:
            expect(error.statusCode).equal(404)
            expect(error.statusText).equal("Not Found")
            break
        case OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED:
            expect(error.statusCode).equal(401)
            expect(error.statusText).equal("Unauthorized")
            break
    }
}

export const checkOsuApiV2Error = (
    error: OsuApiV2Error | null,
    errorCode?: OsuApiV2ErrorCode,
): void => {
    expect(error).to.be.an("Error")
    if (error == null) {
        return
    }
    expect(error.code).to.be.a("string")
    expect(error.message).to.be.a("string")

    switch (errorCode) {
        case OsuApiV2ErrorCode.NOT_FOUND:
            expect(error.code).equal(OsuApiV2ErrorCode.NOT_FOUND)
            break
        case OsuApiV2ErrorCode.UNEXPECTED_RETURN_TYPE:
            expect(error.code).equal(OsuApiV2ErrorCode.UNEXPECTED_RETURN_TYPE)
            break
    }
}
