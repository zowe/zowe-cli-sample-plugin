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

import { IHandlerParameters, ISession } from "@zowe/imperative";
import { ListBaseHandler } from "../../../src/cli/list/ListBaseHandler";

class ListTestHandler extends ListBaseHandler {
    public async processWithSession(params: IHandlerParameters, session: any): Promise<void> {
        /* Do nothing */
    }
}

const DEFAULT_PARAMETERS: Partial<IHandlerParameters> = {
    response: {
        data: {
            setMessage: jest.fn((setMsgArgs) => {
                expect("" + setMsgArgs).toMatchSnapshot();
                return "";
            }),
            setObj: jest.fn((setObjArgs) => {
                expect(setObjArgs).toMatchSnapshot();
            }),
            setExitCode: jest.fn()
        },
        console: {
            log: jest.fn((logs) => {
                expect("" + logs).toMatchSnapshot();
                return "";
            }),
            error: jest.fn((errors) => {
                expect("" + errors).toMatchSnapshot();
                return "";
            }),
            errorHeader: jest.fn(() => undefined),
            prompt: jest.fn(() => undefined)
        },
        progress: {
            startBar: jest.fn((parms) => undefined),
            endBar: jest.fn(() => undefined)
        },
        format: {
            output: jest.fn((parms) => {
                expect(parms).toMatchSnapshot();
            })
        }
    }
};

describe("ListBaseHandler", () => {
    let finalSessCfg: ISession;
    let testHandler: ListTestHandler;

    beforeEach(() => {
        finalSessCfg = null;
        testHandler = new ListTestHandler();
        testHandler.processWithSession = jest.fn().mockImplementation((params, session) => {
            finalSessCfg = session.ISession;
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should create session config of type basic", async () => {
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]);
        params.arguments = {
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
        params.arguments = {
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
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]);
        params.arguments = {
            host: "fakeHost",
            port: 443
        };
        params.response.console.prompt.mockResolvedValueOnce("fakeUser").mockResolvedValueOnce("fakePass");
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
