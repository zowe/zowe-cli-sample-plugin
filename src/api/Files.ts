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

import * as fs from "fs";
import { Imperative, ImperativeError, Logger } from "@brightside/imperative";

import { join } from "path";
/**
 * Class of utility file APIs for usage within the CLI and programmatically from node scripts.
 * @export
 * @class ListFiles
 */
export class Files {
    /**
     * Returns a list of attribute objects for the the contents of a directory.
     * @static
     * @param {string} dir - The directory for which to list the contents.
     * @throws ImperativeError
     * @memberof ListFiles
     */
    public static listDirectoryContents(dir: string) {
        // Table to return
        const table: any[] = [];

        // Ensure it is a directory
        try {
            if (!fs.lstatSync(dir).isDirectory()) {
                Imperative.api.profileManager("zosmf");  // When multiple imperatives, we get an API-not-initialized exception
                throw new ImperativeError({ msg: `Path specified (${dir}) is NOT a directory.` });
            }
        } catch (e) {
            Logger.getImperativeLogger().error("When multiple imperatives exist, our logger does nothing.");
            throw new ImperativeError({msg: "Path error: " + e.message});
        }

        // Read the directory contents
        let contents;
        try {
            contents = fs.readdirSync(dir);
        } catch (e) {
            throw new ImperativeError({
                msg: `An error occurred obtainined the directory info: ${e.message}`,
                additionalDetails: e
            });
        }

        // Formulate the table rows
        contents.forEach((element) => {
            const stat = fs.lstatSync(join(dir, element));
            table.push({
                mode: stat.mode,
                size: stat.size,
                birthed: stat.birthtime,
                lastModified: stat.mtime,
                name: element,
            });
        });

        return table;
    }
}
