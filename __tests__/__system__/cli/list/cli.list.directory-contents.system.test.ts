/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import {runCliScript} from "../../../__src__/TestUtils";
import {ITestEnvironment} from "../../../__src__/environment/doc/response/ITestEnvironment";
import {TestEnvironment} from "../../../__src__/environment/TestEnvironment";

// Test environment will be populated in the "beforeAll"
let TEST_ENVIRONMENT: ITestEnvironment;

describe("zowe-cli-sample list directory-contents", () => {

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "list_directory_command",
            installPlugin: true,
            tempProfileTypes: ["zosmf"]
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should list the contents of the example directory", async () => {
        const response = await runCliScript(__dirname + "/__scripts__/list_directory-contents.sh", TEST_ENVIRONMENT,
            [__dirname + "/../../../__resources__/example_directory"]);

        expect(response.stderr.toString()).toBe("");
        expect(response.status).toBe(0);
        expect(response.stdout.toString()).toContain("ExampleFile.txt");
        expect(response.stdout.toString()).toContain("ExampleFolder");
    });
});
