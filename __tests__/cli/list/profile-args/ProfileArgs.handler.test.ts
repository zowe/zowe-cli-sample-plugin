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
import { IHandlerParameters, ImperativeConfig } from "@zowe/imperative";
import { ProfileArgsDefinition } from "../../../../src/cli/list/profile-args/ProfileArgs.definition";
import * as ProfileArgsHandler from "../../../../src/cli/list/profile-args/ProfileArgs.handler";

const DEFAULT_PARAMETERS: IHandlerParameters = mockHandlerParameters({
    positionals: ["zowe-sample-plugin", "list", "profile-args"],
    definition: ProfileArgsDefinition
});

describe("profile-args Handler", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    it("should list profile args for team config", async () => {
        Object.defineProperty(ImperativeConfig, "instance", {
            get: () => ({
                config: {
                    api: {
                        layers: {
                            get: jest.fn()
                        },
                        secure: {
                            findSecure: jest.fn(() => [] as any),
                            secureFields: jest.fn(() => [] as any)
                        }
                    },
                    exists: true,
                    properties: {
                        defaults: {
                            base: "fakeBase",
                            tShirtProfile: "fakeTshirt"
                        }
                    },
                    mProperties: {
                        profiles: {}
                    }

                },
                envVariablePrefix: "TEST",
                loadedConfig: {
                    profiles: []
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
                teamConfigExists: true,
                tShirtProfileName: "fakeTshirt",
                baseProfileName: "fakeBase"
            }
        };
        let actualOutput = null;

        params.response.data.setObj = jest.fn((setObjArg: any) => {
            actualOutput = setObjArg;
        });

        await handler.process(params);
        expect(actualOutput).toMatchObject(expectedOutput);
    });
});
