/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { IImperativeError, Logger, RestConstants, SessConstants } from "@zowe/imperative";
import { ScrtRestClient } from "../../../../src/cli/send/scrt/ScrtRestClient";

describe("ScrtRestClient", () => {

    const fakeSess: any = {
        ISession: {
            user: "fakeUser",
            _authCache: {
                availableCreds: [] as any
            }
        }
    };

    let scrtRestClient: ScrtRestClient = new ScrtRestClient(fakeSess as any);;

    beforeEach(() => {
        scrtRestClient = new ScrtRestClient(fakeSess as any);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should get the zowe logger", async () => {
        expect(scrtRestClient.log instanceof Logger).toBe(true);
    });

    it("should create a new headers array", async () => {
        const fakeHeadersToAdd: any = null;
        const expectedHeaders = [{ "X-CSRF-ZOSMF-HEADER": true }];
        const returnedHeaders = scrtRestClient["appendHeaders"](fakeHeadersToAdd);
        expect(returnedHeaders).toEqual(expectedHeaders);
    });

    it("should push new header into headers array", async () => {
        const fakeHeadersToAdd = [{ fakeHeader1: "fakeHeaderVal1" }, { fakeHeader1: "fakeHeaderVal2" }];
        const expectedHeaders = [...fakeHeadersToAdd, ...[{ "X-CSRF-ZOSMF-HEADER": true }]];
        const returnedHeaders = scrtRestClient["appendHeaders"](fakeHeadersToAdd);
        expect(returnedHeaders).toEqual(expectedHeaders);
    });

    describe("processError", () => {
        let logMessage = "";

        beforeEach(() => {
            // create a fake logger in scrtRestClient that stores the log message
            logMessage = "";
            Object.defineProperty(scrtRestClient, "log", {
                configurable: true,
                get: jest.fn(() => {
                    return {
                        debug: jest.fn((message: string, ...args: any[]) => {
                            logMessage += message;
                            return message;
                        }),
                        error: jest.fn((message: string, ...args: any[]) => {
                            logMessage += message;
                            return message;
                        })
                    };
                })
            });
        });

        it("should append causeErrors.details to the message", async () => {
            const fakeErr: IImperativeError = {
                msg: "fakeErrMsg",
                causeErrors: '{"details": ["detail1", "detail2", "detail3"]}'
            };
            scrtRestClient["processError"](fakeErr);
            expect(fakeErr.msg).toContain("fakeErrMsg");
            expect(fakeErr.msg).toContain("detail1");
            expect(fakeErr.msg).toContain("detail2");
            expect(fakeErr.msg).toContain("detail3");
        });

        it("should delete stack from causeErrors", async () => {
            const fakeErr: IImperativeError = {
                msg: "fakeErrMsg",
                causeErrors: '{"stack": "fakeStackTrace"}'
            };
            scrtRestClient["processError"](fakeErr);
            expect(fakeErr).not.toHaveProperty("stack");
            expect(fakeErr.causeErrors).toEqual('{}');
            expect(logMessage).toContain("An error was encountered which contains a stack trace");
            expect(logMessage).toContain("The stack has been deleted from the error before displaying the error to the user");
        });

        it("should log a message when causeErrors is invalid JSON", async () => {
            const fakeErr: IImperativeError = {
                msg: "fakeErrMsg",
                causeErrors: '{BadJasonKeyHasNoQuotes: "fakeStackTrace"}'
            };
            scrtRestClient["processError"](fakeErr);
            expect(logMessage).toContain("Encountered an error trying to parse causeErrors as JSON  - " +
                "causeErrors is likely not JSON format"
            );
        });

        it("should append causeErrors.message to the message", async () => {
            const fakeErr: IImperativeError = {
                msg: "fakeErrMsg",
                causeErrors: '{"message": "message within causeErrors"}'
            };
            scrtRestClient["processError"](fakeErr);
            expect(fakeErr.msg).toContain("fakeErrMsg");
            expect(fakeErr.msg).toContain("message within causeErrors");
        });

        it("should append array of messages from causeErrors.messages to the message", async () => {
            const fakeErr: IImperativeError = {
                msg: "fakeErrMsg",
                causeErrors: '{"messages": [' +
                    '{"messageContent": "message1"},' +
                    '{"messageContent": "message2"},' +
                    '{"messageContent": "message3"}' +
                ']}'
            };
            scrtRestClient["processError"](fakeErr);
            expect(fakeErr.msg).toContain("fakeErrMsg");
            expect(fakeErr.msg).toContain("message1");
            expect(fakeErr.msg).toContain("message2");
            expect(fakeErr.msg).toContain("message3");
        });

        it("should report bad user_password for HTTP 401 error with session type of basic", async () => {
            // simulate 401 code
            Object.defineProperty(scrtRestClient, "response", {
                configurable: true,
                get: jest.fn(() => {
                    return {
                        statusCode: RestConstants.HTTP_STATUS_401
                    };
                })
            });

            const fakeErr: IImperativeError = {
                msg: "original401ErrMsg"
            };

            fakeSess.ISession.type = SessConstants.AUTH_TYPE_BASIC;
            scrtRestClient["processError"](fakeErr);

            expect(fakeErr.msg).toContain("original401ErrMsg");
            expect(fakeErr.msg).toContain("This operation requires authentication");
            expect(fakeErr.msg).toContain("Username or password are not valid or expired");
            expect(fakeErr.causeErrors).toBe('{"Error": "original401ErrMsg"}');
        });

        it("should report missing basePath for HTTP 401 error with no basePath and session type of token", async () => {
            // simulate 401 code
            Object.defineProperty(scrtRestClient, "response", {
                configurable: true,
                get: jest.fn(() => {
                    return {
                        statusCode: RestConstants.HTTP_STATUS_401
                    };
                })
            });

            const fakeErr: IImperativeError = {
                msg: "original401ErrMsg"
            };

            fakeSess.ISession.type = SessConstants.AUTH_TYPE_TOKEN;
            fakeSess.ISession.tokenType = SessConstants.TOKEN_TYPE_APIML;
            scrtRestClient["processError"](fakeErr);

            expect(fakeErr.msg).toContain("original401ErrMsg");
            expect(fakeErr.msg).toContain("This operation requires authentication");
            expect(fakeErr.msg).toContain('Token type "apimlAuthenticationToken" requires base path to be defined');
            expect(fakeErr.msg).toContain("You must either connect with username and password or provide a base path");
            expect(fakeErr.causeErrors).toBe('{"Error": "original401ErrMsg"}');
        });
    });

    it("should report invalid token for HTTP 401 error when basePath exists and session type is token", async () => {
        // simulate 401 code
        Object.defineProperty(scrtRestClient, "response", {
            configurable: true,
            get: jest.fn(() => {
                return {
                    statusCode: RestConstants.HTTP_STATUS_401
                };
            })
        });

        const fakeErr: IImperativeError = {
            msg: "original401ErrMsg"
        };

        fakeSess.ISession.basePath = "fake/base/path";
        fakeSess.ISession.type = SessConstants.AUTH_TYPE_TOKEN;
        fakeSess.ISession.tokenType = SessConstants.TOKEN_TYPE_APIML;
        scrtRestClient["processError"](fakeErr);

        expect(fakeErr.msg).toContain("original401ErrMsg");
        expect(fakeErr.msg).toContain("This operation requires authentication");
        expect(fakeErr.msg).toContain("Token type = 'apimlAuthenticationToken' is not valid, token is invalid, or token is expired");
        expect(fakeErr.msg).toContain("To obtain a new valid token, use the following command: `zowe config secure`");
        expect(fakeErr.msg).toContain("For CLI usage, see `zowe config secure --help`");
        expect(fakeErr.causeErrors).toBe('{"Error": "original401ErrMsg"}');
    });

    it("should report bad certificate for HTTP 401 error with session type of cert_pem", async () => {
        // simulate 401 code
        Object.defineProperty(scrtRestClient, "response", {
            configurable: true,
            get: jest.fn(() => {
                return {
                    statusCode: RestConstants.HTTP_STATUS_401
                };
            })
        });

        const fakeErr: IImperativeError = {
            msg: "original401ErrMsg"
        };

        fakeSess.ISession.type = SessConstants.AUTH_TYPE_CERT_PEM;
        scrtRestClient["processError"](fakeErr);

        expect(fakeErr.msg).toContain("original401ErrMsg");
        expect(fakeErr.msg).toContain("This operation requires authentication");
        expect(fakeErr.msg).toContain("Certificate is not valid or expired");
        expect(fakeErr.causeErrors).toBe('{"Error": "original401ErrMsg"}');
    });
});
