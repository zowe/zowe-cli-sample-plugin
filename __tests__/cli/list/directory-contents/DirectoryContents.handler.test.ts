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

import {CheckStatus, ZosmfSession} from "@zowe/cli";
import {Files} from "../../../../src/api/Files";
import {IHandlerParameters} from "@zowe/imperative";
import * as DirectoryDefinition from "../../../../src/cli/list/directory-contents/DirectoryContents.definition";
import * as DirectoryHandler from "../../../../src/cli/list/directory-contents/DirectoryContents.handler";

jest.mock("../../../../src/api/Files");

process.env.FORCE_COLOR = "0";

const DEFAULT_PARAMTERS: IHandlerParameters = {
    arguments: {
        $0: "bright",
        _: ["zowe-cli-sample", "list", "directory-contents"],
    },
    positionals: ["zowe-cli-sample", "list", "directory-contents"],
    profiles: {
        get: (type: string) => {
            return {};
        }
    } as any,
    response: {
        data: {
            setMessage: jest.fn((setMsgArgs) => {
                expect("" + setMsgArgs).toMatchSnapshot();
            }),
            setObj: jest.fn((setObjArgs) => {
                expect(setObjArgs).toMatchSnapshot();
            })
        },
        console: {
            log: jest.fn((logs) => {
                expect("" + logs).toMatchSnapshot();
            }),
            error: jest.fn((errors) => {
                expect("" + errors).toMatchSnapshot();
            }),
            errorHeader: jest.fn(() => undefined)
        },
        progress: {
            startBar: jest.fn((parms) => undefined),
            endBar: jest.fn(() => undefined)
        }
    } as any,
    definition: DirectoryDefinition.DirectoryContentsDefinition,
    fullDefinition: DirectoryDefinition.DirectoryContentsDefinition,
};

describe("directory-contents Handler", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it("should read a mocked directory", async () => {
        const fakeDir: string = "fake/directory";
        // Mock the files api call
        Files.listDirectoryContents = jest.fn((dir) => {
            return [{
                fake: "file",
                moreFake: "directory"
            }];
        });
        CheckStatus.getZosmfInfo = jest.fn(async () => {
            return {zosmf_hostname: "dummy"};
        });
        ZosmfSession.createBasicZosmfSession = jest.fn();
        const handler = new DirectoryHandler.default();
        const params = Object.assign({}, ...[DEFAULT_PARAMTERS]);
        params.arguments.directory = fakeDir;

        // The handler should succeed
        await handler.process(params);

        expect(Files.listDirectoryContents).toHaveBeenCalledWith(fakeDir);
    });
});
