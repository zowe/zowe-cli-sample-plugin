/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at *
* https://www.eclipse.org/legal/epl-v20.html                                      *
*                                                                                 *
* SPDX-License-Identifier: EPL-2.0                                                *
*                                                                                 *
* Copyright Contributors to the Zowe Project.                                     *
*                                                                                 *
*/

import { ICommandHandler, IHandlerParameters, TextUtils } from "@brightside/imperative";
import { Files } from "../../../api/Files";
import { CheckStatus, ZosmfSession } from "@brightside/core";

/**
 * Command handler for listing directory contents
 * @export
 * @class DirectoryContentsHandler
 * @implements {ICommandHandler}
 */
export default class DirectoryContentsHandler implements ICommandHandler {
    /**
     * Max table width
     * @static
     * @memberof DirectoryContentsHandler
     */
    public static readonly MAX_WIDTH = 9999;

    /**
     * Process the list directory contents command.
     * @param {IHandlerParameters} params
     * @returns {Promise<void>}
     * @memberof DirectoryContentsHandler
     */
    public async process(params: IHandlerParameters): Promise<void> {

        /* We call a Zowe CLI API, just to show that it can be done.
         * We chose zosmf check status, since it is the simplest.
         */
        try {
            // use the user's zosmf profile to create a session to the desired zosmf subsystem
            const profile = params.profiles.get("zosmf");
            const session = ZosmfSession.createBasicZosmfSession(profile);
            const zosResponse = await CheckStatus.getZosmfInfo(session);
            params.response.console.log("We just got a valid z/OSMF status response from system = " +
                zosResponse.zosmf_hostname + "\n"
            );

        } catch (except) {
            params.response.console.log("We just got an exception calling Zowe CLI's CheckStatus.getZosmfInfo API.\n" +
                "Reason = " + except.message +
                "\nWe will continue on anyway.\n"
            );
        }

        // Extract the directory specified
        let dir: string = params.arguments.directory;
        if (dir == null) {
            dir = ".";
        }

        // Set the message
        params.response.data.setMessage(`Listing contents of "${dir}"`);

        // Get the directory contents
        const contents = Files.listDirectoryContents(dir);
        params.response.data.setObj(contents);
        params.response.console.log(Buffer.from(TextUtils.getTable(contents,
            "blue", DirectoryContentsHandler.MAX_WIDTH, true, false, false)));
    }
}
