/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { mockHandlerParameters } from "@zowe/cli-test-utils";
import { IHandlerParameters } from "@zowe/imperative";
import { ScrtRestClient } from "../../../../src/cli/send/scrt/ScrtRestClient";
import { ScrtDefinition } from "../../../../src/cli/send/scrt/Scrt.definition";
import * as ScrtHandler from "../../../../src/cli/send/scrt/Scrt.handler";

process.env.FORCE_COLOR = "0";

const fakeProtocol = "https";
const fakeHostNm = "fakeHostName";
const fakePort = "1234";
const fakeRestResource = "path/to/your/rest/resource";
const fakeRestQuery = "OptionalQueryStringForYourResource";
const fakeFeatureName = "YourScrtFeatureName";
const fakePoductId = "YorPrdId";
const fakeProductVersion = "11.22.33"

const URL = `${fakeProtocol}://${fakeHostNm}:${fakePort}/${fakeRestResource}?${fakeRestQuery}`;

const CMD_PARMS: IHandlerParameters = mockHandlerParameters({
    arguments: {
        protocol: fakeProtocol,
        host: fakeHostNm,
        port: fakePort,
        user: "admin",
        password: "123456",
        restResource: fakeRestResource,
        restQuery: fakeRestQuery,
        featureName: fakeFeatureName,
        productId: fakePoductId,
        productVersion: fakeProductVersion
    },
    positionals: ["zowe-cli-sample", "send", "scrt"],
    definition: ScrtDefinition
});

describe("scrt Handler", () => {
    let params: any;
    let logMessage = "";

    beforeEach(() => {
        logMessage = "";

        // place desired input and expected output into params
        params = Object.assign({}, ...[CMD_PARMS]) as any;
        params.response = {
            console: {
                log: jest.fn((logArgs) => {
                    logMessage = logArgs;
                })
            }
        } as any;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should report successful transmission of scrt data", async () => {
        // return fake response from GET request of REST service
        const CMD_RESPONSE = {
            appSvcResponse: "All we care about is a valid json object"
        };
        const getExpectJSONSpy = jest.spyOn(ScrtRestClient as any, "getExpectJSON")
            .mockReturnValue(CMD_RESPONSE);

        const SCRT_DATA_FROM_SESSION = {
            featureName: fakeFeatureName,
            productId: fakePoductId,
            productVersion: fakeProductVersion
        };

        // The handler should succeed
        const scrtHandler = new ScrtHandler.default();
        await scrtHandler.process(params);
        expect(logMessage).toContain("This is the response from your service");
        expect(logMessage).toContain(JSON.stringify(CMD_RESPONSE, null, 2));
        expect(logMessage).toContain("our GET request to the following URL:");
        expect(logMessage).toContain(URL);
        expect(logMessage).toContain("we transmitted the following SCRT data");
        expect(logMessage).toContain(JSON.stringify(SCRT_DATA_FROM_SESSION, null, 2));
    });

    it("should catch an exception from getExpectJSON", async () => {
        // create a failure
        const scrtErrText = "ScrtRestClient.getExpectJSON() threw this fake error";
        jest.spyOn(ScrtRestClient as any, "getExpectJSON")
            .mockImplementation(() =>{
                throw new Error(scrtErrText);
            });

        // The handler should fail with an error
        const scrtHandler = new ScrtHandler.default();
        await scrtHandler.process(params);
        expect(logMessage).toContain("We got an exception when calling the following REST service");
        expect(logMessage).toContain(URL);
        expect(logMessage).toContain("Reason = ");
        expect(logMessage).toContain(scrtErrText);
    });
});
