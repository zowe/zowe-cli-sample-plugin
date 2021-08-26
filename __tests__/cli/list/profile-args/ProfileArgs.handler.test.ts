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

import { IHandlerParameters, ImperativeConfig } from "@zowe/imperative";
import { ProfileArgsDefinition } from "../../../../src/cli/list/profile-args/ProfileArgs.definition";
import * as ProfileArgsHandler from "../../../../src/cli/list/profile-args/ProfileArgs.handler";

const DEFAULT_PARAMETERS: IHandlerParameters = {
    arguments: {
        $0: "bright",
        _: ["brightside-sample-plugin", "list", "profile-args"],
    },
    positionals: [],
    profiles: {
        get: (type: string) => {
            return {};
        }
    } as any,
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
    },
    definition: ProfileArgsDefinition,
    fullDefinition: ProfileArgsDefinition
};

describe("profile-args Handler", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    it("should list profile args for team config", async () => {
        Object.defineProperty(ImperativeConfig, "instance", {
            get: () => ({
                config: {
                    exists: true,
                    properties: {
                        defaults: {
                            base: "fakeBase",
                            sample: "fakeSample"
                        }
                    }
                }
            })
        });
        const profileArgs = {
            host: "fakeHost",
            port: 443,
            user: "fakeUser",
            password: "fakePass",
            tshirtSize: "S"
        };

        const handler = new ProfileArgsHandler.default();
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]);
        params.arguments = {...params.arguments, ...profileArgs};

        const expectedOutput = {
            arguments: {
                ...profileArgs,
                rejectUnauthorized: true
            },
            environment: {
                usingTeamConfig: true,
                sampleProfileName: "fakeSample",
                baseProfileName: "fakeBase"
            }
        };
        let actualOutput = null;
        params.response.data.setObj.mockImplementation((obj: any) => {
            actualOutput = obj;
        });

        await handler.process(params);
        expect(actualOutput).toMatchObject(expectedOutput);
    });

    it("should list profile args for old school profiles", async () => {
        Object.defineProperty(ImperativeConfig, "instance", {
            get: () => ({})
        });
        const profileArgs = {
            host: "fakeHost",
            port: 443,
            user: "fakeUser",
            password: "fakePass",
            tshirtSize: "L"
        };

        const handler = new ProfileArgsHandler.default();
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]);
        params.arguments = {...params.arguments, ...profileArgs};
        params.profiles = {
            getMeta: (name: string) => {
                return {
                    name: "fake" + name.charAt(0).toUpperCase() + name.slice(1)
                };
            }
        };

        const expectedOutput = {
            arguments: {
                ...profileArgs,
                rejectUnauthorized: true
            },
            environment: {
                usingTeamConfig: false,
                sampleProfileName: "fakeSample",
                baseProfileName: "fakeBase"
            }
        };
        let actualOutput = null;
        params.response.data.setObj.mockImplementation((obj: any) => {
            actualOutput = obj;
        });

        await handler.process(params);
        expect(actualOutput).toMatchObject(expectedOutput);
    });
});
