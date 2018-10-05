/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at *
* https://www.eclipse.org/legal/epl-v20.html                                      *
*                                                                                 *
* SPDX-License-Identifier: EPL-2.0                                                *
*                                                                                 *
* Copyright Contributors to the Zowe Project.                                     *
*                                                                                 *
*/

describe("error-handler Handler", () => {
    it("throw an error", async () => {
        const handlerReq = require("../../../../src/cli/fail/error_handler/ErrorHandler.handler");
        const handler = new handlerReq.default();
        let error;
        try {
            await handler.process({
                arguments: {
                    $0: "fake",
                    _: ["fake"]
                }
            });
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect(error.message).toMatchSnapshot();
    });
});
