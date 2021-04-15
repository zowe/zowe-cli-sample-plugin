/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import * as fs from "fs";
import * as path from "path";
import { ITestEnvironment, TestEnvironment, runCliScript } from "@zowe/cli-test-utils";
import { IO } from "@zowe/imperative";
import { ITestPropertiesSchema } from "../../../__src__/environment/doc/ITestPropertiesSchema";

// Test environment will be populated in the "beforeAll"
let TEST_ENVIRONMENT: ITestEnvironment<ITestPropertiesSchema>;

const configJson = "zowe.config.json";
const configUserJson = "zowe.config.user.json";
const baseYaml = "my_base.yaml";
const sampleYaml = "my_sample.yaml";

describe("zowe-cli-sample list profile-args command", () => {
    // Create the unique test environment
    beforeEach(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            installPlugin: true,
            testName: "list_profile_args_command",
            skipProperties: true
        });
    });

    afterEach(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should list profile args from team config profile and other sources", () => {
        fs.copyFileSync(path.join(__dirname, "__resources__", configJson), path.join(TEST_ENVIRONMENT.workingDir, configJson));
        fs.copyFileSync(path.join(__dirname, "__resources__", configUserJson), path.join(TEST_ENVIRONMENT.workingDir, configUserJson));

        const response = runCliScript(__dirname + "/__scripts__/list_profile_args.sh", TEST_ENVIRONMENT);
        expect(response.stderr.toString()).toBe("");
        expect(response.status).toBe(0);
        const output = response.stdout.toString();
        expect(output).toMatch(/host:\s+new.host.com/);
        expect(output).toMatch(/port:\s+1337/);
        expect(output).toMatch(/user:\s+user1/);
        expect(output).toMatch(/password:\s+123456/);
        expect(output).toMatch(/usingTeamConfig:\s+true/);
        expect(output).toMatch(/sampleProfileName:\s+my_sample/);
        expect(output).toMatch(/baseProfileName:\s+my_base/);
        expect(output).toMatchSnapshot();
    });

    it("should list profile args from old school profile and other sources", () => {
        IO.mkdirp(path.join(TEST_ENVIRONMENT.workingDir, "profiles", "base"));
        fs.copyFileSync(path.join(__dirname, "__resources__", baseYaml), path.join(TEST_ENVIRONMENT.workingDir, "profiles", "base", baseYaml));
        IO.mkdirp(path.join(TEST_ENVIRONMENT.workingDir, "profiles", "sample"));
        fs.copyFileSync(path.join(__dirname, "__resources__", sampleYaml), path.join(TEST_ENVIRONMENT.workingDir, "profiles", "sample", sampleYaml));

        const response = runCliScript(__dirname + "/__scripts__/list_profile_args.sh", TEST_ENVIRONMENT);
        expect(response.stderr.toString()).toBe("");
        expect(response.status).toBe(0);
        const output = response.stdout.toString();
        expect(output).toMatch(/host:\s+new.host.com/);
        expect(output).toMatch(/port:\s+1337/);
        expect(output).toMatch(/user:\s+user1/);
        expect(output).toMatch(/password:\s+123456/);
        expect(output).toMatch(/usingTeamConfig:\s+false/);
        expect(output).toMatch(/sampleProfileName:\s+my_sample/);
        expect(output).toMatch(/baseProfileName:\s+my_base/);
        expect(output).toMatchSnapshot();
    });
});
