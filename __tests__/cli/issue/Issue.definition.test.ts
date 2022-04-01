/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { ICommandDefinition } from "@zowe/imperative";
import { relative, sep, posix } from "path";

describe("Issue definition", () => {
    it("should match the snapshot", () => {
        const contents = require("../../../src/cli/issue/Issue.definition");
        contents.children.forEach((child: ICommandDefinition) => child.handler = relative(__dirname, child.handler).split(sep).join(posix.sep));
        expect(contents).toMatchSnapshot();
    });
});
