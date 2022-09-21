// Package imports
import { describe, it, Suite } from "mocha"
import { expect } from "chai"
// Local imports
import { OsuApiV2WebRequestError } from "../../src/helpers/custom_errors"

export const customErrorsTestSuite = (): Suite =>
    describe("custom errors", () => {
        describe("OsuApiV2WebRequestError", () => {
            it("should preserve the non private data", () => {
                const error = new OsuApiV2WebRequestError(
                    "message",
                    400,
                    "status",
                    "someUrl",
                    "get",
                    { abc: "def" },
                    { cde: "hij" },
                )
                expect(error.message).equals("message")
                expect(error.statusCode).equals(400)
                expect(error.statusText).equals("status")
                expect(error.url).equals("someUrl")
                expect(error.method).equals("get")
                expect(error.headers).deep.equal({ abc: "def" })
                expect(error.body).equal(JSON.stringify({ cde: "hij" }))
            })
            it("should mask the authorization header", () => {
                const error = new OsuApiV2WebRequestError(
                    "message",
                    400,
                    "text",
                    "someUrl",
                    "get",
                    {
                        authorization:
                            "Bearer 098304982039482039482304829034820934",
                    },
                )
                expect(error.headers?.authorization).equals(
                    "Bearer 098[redacted]",
                )

                const errorNoAuth = new OsuApiV2WebRequestError(
                    "message",
                    400,
                    "text",
                    "someUrl",
                    "get",
                )
                expect(errorNoAuth.headers?.authorization).to.be.undefined
            })
            it("should mask the client secret in body", () => {
                const error = new OsuApiV2WebRequestError(
                    "message",
                    400,
                    "text",
                    "someUrl",
                    "get",
                    undefined,
                    {
                        client_secret: "fjdsnfkdsfnksdfnskfns",
                        test: "abc",
                    },
                )
                expect(error.body).equals(
                    JSON.stringify({
                        client_secret: "fjdsnfkdsf[redacted]",
                        test: "abc",
                    }),
                )

                const errorNoClientSecret = new OsuApiV2WebRequestError(
                    "message",
                    400,
                    "text",
                    "someUrl",
                    "get",
                    undefined,
                    {
                        test: "abc",
                    },
                )
                expect(errorNoClientSecret.body).equals(
                    JSON.stringify({
                        test: "abc",
                    }),
                )

                const errorNoBody = new OsuApiV2WebRequestError(
                    "message",
                    400,
                    "text",
                    "someUrl",
                    "get",
                )
                expect(errorNoBody.body).to.be.undefined
            })
        })
    })
