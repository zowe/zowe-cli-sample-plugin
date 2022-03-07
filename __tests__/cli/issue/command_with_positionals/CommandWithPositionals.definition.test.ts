/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { relative, sep, posix } from "path";

describe("Command With Positionals definition", () => {
    it("should match the snapshot", () => {
        const contents = require("../../../../src/cli/issue/command_with_positionals/CommandWithPositionals.definition");
        Object.keys(contents).forEach(key => contents[key].handler = relative(__dirname, contents[key].handler).split(sep).join(posix.sep));
        expect(contents).toMatchSnapshot();
    });
});
