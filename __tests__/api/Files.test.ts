/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

jest.mock("fs");
const fs = require("fs");
import { Files } from "../../src/api/Files";
const EXPECTED_LSTAT_CALLS: number = 3;
describe("Files", () => {
    it("should return attributes for a mocked directory", () => {
        const PARENT_DIR = "pathTo/parentDir";
        fs.__setMockFiles({
            [PARENT_DIR]: ["file1", "directory1"]
        });

        // note: __mocks__\fs.ts is used
        const lstatSyncSpy = jest.spyOn(fs, "lstatSync");
        const readdirSyncSpy = jest.spyOn(fs, "readdirSync");

        const contents = Files.listDirectoryContents(PARENT_DIR);
        expect(contents).toMatchSnapshot();
        expect(lstatSyncSpy).toHaveBeenCalledTimes(EXPECTED_LSTAT_CALLS);
        expect(readdirSyncSpy).toHaveBeenCalledTimes(1);
    });
});
