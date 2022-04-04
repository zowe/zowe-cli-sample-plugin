/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { CheckStatus } from "@zowe/zosmf-for-zowe-sdk";
import { Files } from "../../../../src/api/Files";
import { mockHandlerParameters } from "@zowe/cli-test-utils";
import { IHandlerParameters } from "@zowe/imperative";
import { DirectoryContentsDefinition } from "../../../../src/cli/list/directory-contents/DirectoryContents.definition";
import * as DirectoryContentsHandler from "../../../../src/cli/list/directory-contents/DirectoryContents.handler";

jest.mock("../../../../src/api/Files");

process.env.FORCE_COLOR = "0";

const DEFAULT_PARAMETERS: IHandlerParameters = mockHandlerParameters({
    arguments: {
        host: "fake",
        port: 443,
        user: "admin",
        password: "123456"
    },
    positionals: ["zowe-cli-sample", "list", "directory-contents"],
    definition: DirectoryContentsDefinition
});

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
        const handler = new DirectoryContentsHandler.default();
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]);
        params.arguments.directory = fakeDir;

        // The handler should succeed
        await handler.process(params);

        expect(Files.listDirectoryContents).toHaveBeenCalledWith(fakeDir);
    });

    it("should read a mocked directory, even if checkStatus fails", async () => {
        const fakeDir: string = "fake/directory";
        // Mock the files api call
        Files.listDirectoryContents = jest.fn((dir) => {
            return [{
                fake: "file",
                moreFake: "directory"
            }];
        });
        CheckStatus.getZosmfInfo = jest.fn(async () => {
            throw "dummy error";
        });
        const handler = new DirectoryContentsHandler.default();
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]);
        params.arguments.directory = fakeDir;

        // The handler should succeed
        await handler.process(params);

        expect(Files.listDirectoryContents).toHaveBeenCalledWith(fakeDir);
    });

    it("should read a mocked directory, even if dir is null", async () => {
        // Mock the files api call
        Files.listDirectoryContents = jest.fn((dir) => {
            return [{
                fake: "file",
                moreFake: "directory"
            }];
        });
        CheckStatus.getZosmfInfo = jest.fn(async () => {
            throw "dummy error";
        });
        const handler = new DirectoryContentsHandler.default();
        const params = Object.assign({}, ...[DEFAULT_PARAMETERS]);
        params.arguments.directory = null;

        // The handler should succeed
        await handler.process(params);

        expect(Files.listDirectoryContents).toHaveBeenCalledWith(".");
    });
});
