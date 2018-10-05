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

jest.mock("fs");
import * as fs from "fs";
import { Files } from "../../src/api/Files";
const EXPECTED_LSTAT_CALLS: number = 3;
describe("Files", () => {
    it("should return attributes for a mocked directory", () => {

        // Mock lstatSync to have a mocked isDirectory function
        const mockedLstat = jest.fn((args) => {
            return {
                isDirectory: jest.fn((isDirArgs) => {
                    return true;
                }),
                size: "big!",
                mode: "000",
                birthtime: "unknown",
                mtime: "unknown",
                name: args
            };
        });
        (fs.lstatSync as any) = mockedLstat;

        // Mock readdirSync to return a mocked list
        const mockedReadDir = jest.fn((readDir) => {
            return ["file1", "directory1"];
        });
        (fs.readdirSync as any) = mockedReadDir;

        const contents = Files.listDirectoryContents("fake");
        expect(contents).toMatchSnapshot();
        expect(mockedLstat).toHaveBeenCalledTimes(EXPECTED_LSTAT_CALLS);
        expect(mockedReadDir).toHaveBeenCalledTimes(1);
    });
});
