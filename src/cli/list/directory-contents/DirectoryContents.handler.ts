/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { IHandlerParameters, Session, TextUtils } from "@zowe/imperative";
import { Files } from "../../../api/Files";
import { CheckStatus } from "@zowe/zosmf-for-zowe-sdk";
import { ListBaseHandler } from "../ListBaseHandler";

/**
 * Command handler for listing directory contents
 * @export
 * @class DirectoryContentsHandler
 * @implements {ICommandHandler}
 */
export default class DirectoryContentsHandler extends ListBaseHandler {
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
    public async processWithSession(params: IHandlerParameters, session: Session): Promise<void> {

        /* We call a Zowe CLI API, just to show that it can be done.
         * We chose zosmf check status, since it is the simplest.
         */
        try {
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
