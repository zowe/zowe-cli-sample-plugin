/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { ICommandHandler, IHandlerParameters, TextUtils } from "@zowe/imperative";
import { Files } from "../../../api/Files";

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
            "blue", DirectoryContentsHandler.MAX_WIDTH, true, false, false))
        );
    }
}
