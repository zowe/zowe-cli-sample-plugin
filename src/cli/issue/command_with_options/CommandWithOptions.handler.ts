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

import getStdin = require("get-stdin");
import {ICommandHandler, IHandlerParameters} from "@zowe/imperative";

export default class CommandWithOptionsHandler implements ICommandHandler {
    public async process(params: IHandlerParameters): Promise<void> {
        const responseData = {
            arg: params.arguments.testArg,
            env: params.arguments.testEnv,
            stdin: await getStdin() || undefined
        };
        params.response.data.setObj(responseData);
        params.response.console.log("arg:\t" + responseData.arg);
        params.response.console.log("env:\t" + responseData.env);
        params.response.console.log("stdin:\t" + responseData.stdin);

        // // Log the command issued and set the API message (for JSON response)
        // const msg: string = `"zowe ${params.arguments._.join(" ")}" command issued!`;
        // params.response.data.setMessage(msg);
        // params.response.console.log(msg);

        // // If "use-the-string" (notice that hyphenated words are converted to camel case) is specified, print the string
        // if (params.arguments.useTheString) {
        //     params.response.console.log(`The string specified:\n"${params.arguments.theString}"`);
        // }

        // // Print the number specified
        // params.response.console.log(`The number specified was "${params.arguments.requiredNumber}".`);
    }
}
