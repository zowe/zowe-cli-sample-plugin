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

import {runCliScript} from "../../../__src__/TestUtils";
import {ITestEnvironment} from "../../../__src__/environment/doc/response/ITestEnvironment";
import {TestEnvironment} from "../../../__src__/environment/TestEnvironment";

// Test environment will be populated in the "beforeAll"
let TEST_ENVIRONMENT: ITestEnvironment;

describe("zowe-cli-sample issue command-with-positionals", () => {

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            installPlugin: true,
            testName: "command_with_positionals"
        });
    });
    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should issue a response with the number and string inputted", async () => {
        const response = await runCliScript(__dirname + "/__scripts__/issue_command_with_positionals.sh",
            TEST_ENVIRONMENT,
            ["one", 2]);

        expect(response.stderr.toString()).toBe("");
        expect(response.status).toBe(0);
        expect(response.stdout.toString()).toMatchSnapshot();
    });
});
