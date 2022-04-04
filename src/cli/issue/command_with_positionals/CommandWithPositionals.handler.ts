/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { ICommandHandler, IHandlerParameters } from "@zowe/imperative";

export default class CommandWithPositionalsHandler implements ICommandHandler {
    public async process(params: IHandlerParameters): Promise<void> {

        // Log the command issued and set the API message (for JSON response)
        const msg: string = `"zowe ${params.arguments._.join(" ")}" command issued!`;
        params.response.data.setMessage(msg);
        params.response.console.log(msg);

        // Print the two positional parameters
        params.response.console.log(`The first positional parameter: ${params.arguments.firstpositional}`);
        params.response.console.log(`The second positional parameter: ${params.arguments.secondpositional}`);
    }
}
