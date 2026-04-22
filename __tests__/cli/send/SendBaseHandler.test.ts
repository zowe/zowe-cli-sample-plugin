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
import { ConfigUtils, IHandlerParameters, ISession } from "@zowe/imperative";
import { SendBaseHandler } from "../../../src/cli/send/SendBaseHandler";

class SendTestHandler extends SendBaseHandler {
    public async processWithSession(params: IHandlerParameters, session: any): Promise<void> {
        /* Do nothing */
    }
}

const DEFAULT_PARAMETERS: IHandlerParameters = mockHandlerParameters({} as any);

describe("SendBaseHandler", () => {
    let finalSessCfg: ISession;
    let testHandler: SendTestHandler;

    beforeEach(() => {
        finalSessCfg = null as unknown as ISession;
        testHandler = new SendTestHandler();
        testHandler.processWithSession = jest.fn().mockImplementation((params, session) => {
            finalSessCfg = session.ISession;
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should create session config of type basic", async () => {
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]);
        (params.arguments as any) = {
            host: "fakeHost",
            port: 443,
            user: "fakeUser",
            password: "fakePass"
        };
        await testHandler.process(params);

        const expectedSessCfg: ISession = {
            hostname: "fakeHost",
            port: 443,
            user: "fakeUser",
            password: "fakePass",
            type: "basic"
        };
        expect(finalSessCfg).toMatchObject(expectedSessCfg);
    });

    it("should create session config of type token", async () => {
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]);
        (params.arguments as any) = {
            host: "fakeHost",
            port: 443,
            tokenType: "fakeTokenType",
            tokenValue: "fakeTokenValue"
        };
        await testHandler.process(params);

        const expectedSessCfg: ISession = {
            hostname: "fakeHost",
            port: 443,
            tokenType: "fakeTokenType",
            tokenValue: "fakeTokenValue",
            type: "token"
        };
        expect(finalSessCfg).toMatchObject(expectedSessCfg);
    });

    it("should prompt for properties missing from session config", async () => {
        // a mock to avoid trying to get cliHome
        jest.spyOn(ConfigUtils, "onlyV1ProfilesExist", "get").mockReturnValue(false);

        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]);
        (params.arguments as any) = {
            host: "fakeHost",
            port: 443
        };
        (params.response.console.prompt as any).mockResolvedValueOnce("fakeUser").mockResolvedValueOnce("fakePass");
        await testHandler.process(params);

        const expectedSessCfg: ISession = {
            hostname: "fakeHost",
            port: 443,
            user: "fakeUser",
            password: "fakePass",
            type: "basic"
        };
        expect(finalSessCfg).toMatchObject(expectedSessCfg);
    });
});
