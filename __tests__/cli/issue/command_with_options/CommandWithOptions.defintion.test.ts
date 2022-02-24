/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html, or the Apache License, Version 2.0
* which is available at https://www.apache.org/licenses/LICENSE-2.0.
*
* SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

describe("Command With Options definition", () => {
    it("should match the snapshot", () => {
        const contents = require("../../../../src/cli/issue/command_with_options/CommandWithOptions.definition");
        Object.keys(contents).forEach(key => delete contents[key].handler);
        expect(contents).toMatchSnapshot();
    });
});
