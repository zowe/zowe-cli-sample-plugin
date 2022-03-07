/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import {Files} from "../../../src/index";

describe("Files", () => {
    it ("should read the example directory", () => {
        // Get the example directory contents
        const contents = Files.listDirectoryContents(__dirname + "/../../__resources__/example_directory/");

        // Expect the contents to exist & have two entries... and expect that the fields are present
        expect(contents).toBeDefined();
        expect(contents.length).toBe(2);
        contents.forEach((entry) => {
            expect(entry.mode).toBeDefined();
            expect(entry.size).toBeDefined();
            expect(entry.birthed).toBeDefined();
            expect(entry.lastModified).toBeDefined();
            expect(entry.name).toMatchSnapshot();
        });
    });
});
