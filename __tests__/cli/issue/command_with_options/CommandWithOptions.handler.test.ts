/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 *
 */

describe("command-with-options handler", () => {
    it("should accept options and print messages", async () => {
        // Require the handler and create a new instance
        const handlerReq = require("../../../../src/cli/issue/command_with_options/CommandWithOptions.handler");
        const handler = new handlerReq.default();

        // Vars populated by the mocked function - error should remain undefined.
        let error;
        let apiMessage = "";
        let logMessage = "";

        // The handler should succeed
        try {
            // Invoke the handler with a full set of mocked arguments and response functions
            await handler.process({
                arguments: {
                    $0: "fake",
                    _: ["fake"],
                    useTheString: true,
                    theString: "mocked string",
                    requiredNumber: 0
                },
                response: {
                    data: {
                        setMessage: jest.fn((setMsgArgs) => {
                            apiMessage = setMsgArgs;
                        })
                    },
                    console: {
                        log: jest.fn((logArgs) => {
                            logMessage += " " + logArgs;
                        })
                    }
                }
            });
        } catch (e) {
            error = e;
        }
        expect(error).toBeUndefined();
        expect(apiMessage).toMatchSnapshot();
        expect(logMessage).toMatchSnapshot();
    });
});
