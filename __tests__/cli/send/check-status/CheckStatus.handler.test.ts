/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { CheckStatus, IZosmfInfoResponse } from "@zowe/zosmf-for-zowe-sdk";
import { Files } from "../../../../src/api/Files";
import { mockHandlerParameters } from "@zowe/cli-test-utils";
import { IHandlerParameters } from "@zowe/imperative";
import { CheckStatusDefinition } from "../../../../src/cli/send/check-status/CheckStatus.definition";
import * as CheckStatusHandler from "../../../../src/cli/send/check-status/CheckStatus.handler";

jest.mock("../../../../src/api/Files");

process.env.FORCE_COLOR = "0";

const fakeHostNm = "fakeHostName";
const fakePort = "1234";
const fakeZosmfVersion = "111.222";
const fakeZosVersion = "333.444";

let logMessage = "";

const DEFAULT_PARAMETERS: IHandlerParameters = mockHandlerParameters({
    arguments: {
        host: fakeHostNm,
        port: fakePort,
        user: "admin",
        password: "123456"
    },
    positionals: ["zowe-cli-sample", "send", "check-status"],
    definition: CheckStatusDefinition
});

describe("check-status Handler", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should report data from a successful zosmf check status", async () => {
        // return fake check-status values
        CheckStatus.getZosmfInfo = jest.fn(async () => {
            return {
                zosmf_hostname: fakeHostNm,
                zosmf_port: fakePort,
                zosmf_full_version: fakeZosmfVersion,
                zos_version: fakeZosVersion,
            };
        });

        // place desired input and expected output into params
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]) as any;
        params.response =  {
            console: {
                log: jest.fn((logArgs) => {
                    logMessage = logArgs;
                })
            }
        } as any;

        // The handler should succeed
        const checkStatHandler = new CheckStatusHandler.default();
        await checkStatHandler.process(params);
        expect(logMessage).toContain(`We got the following z/OSMF status information:`);
        expect(logMessage).toContain(`host = '${fakeHostNm}'`);
        expect(logMessage).toContain(`port = '${fakePort}'`);
        expect(logMessage).toContain(`z/OSMF version = '${fakeZosmfVersion}'`);
        expect(logMessage).toContain(`z/OS version = '${fakeZosVersion}'`);
    });

    it("should catch an exception from zosmf check status", async () => {
        const checkStatusErr = "CheckStatus.getZosmfInfo() threw this fake error";

        // create a failure
        CheckStatus.getZosmfInfo = jest.fn(async () => {
            throw checkStatusErr;
        });

        // place desired input and expected output into params
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]) as any;
        params.response = {
            console: {
                log: jest.fn((logArgs) => {
                    logMessage = logArgs;
                })
            }
        } as any;

        // The handler should succeed
        const checkStatHandler = new CheckStatusHandler.default();
        await checkStatHandler.process(params);
        expect(logMessage).toContain(`We got an exception calling Zowe CLI's CheckStatus.getZosmfInfo API for ` +
            `host = '${fakeHostNm}'  port = '${fakePort}`);
        expect(logMessage).toContain("Reason = ");
    });
});
