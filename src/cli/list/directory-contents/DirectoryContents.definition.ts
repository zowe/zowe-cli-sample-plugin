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

import { ICommandDefinition } from "@brightside/imperative";
/**
 * Command one [object] defintion. This definition is of imperative type "command" and therefore must have a
 * command handler (which performs the "work" for this command).
 *
 * In this case, "error-messages" will simply print console error (stderr) messages.
 *
 * Property Summary:
 * =================
 * "name" of the [object]. Should be a noun (e.g. data-set)
 * "aliases" normally contains a shortened form of the command
 * "summary" will display when issuing the help on this [objects] [action]
 * "type" is "command" which means a handler is required
 * "handler" is the file path to the handler (does the work)
 * "options" an array of options
 */
export const DirectoryContentsDefinition: ICommandDefinition = {
    name: "directory-contents",
    aliases: ["dc"],
    summary: "Lists directory contents",
    description: "[objects] in Zowe CLI are the entities on which [actions] are performed. [objects] are always nouns. " +
        "For example, for command \"zowe zos-files delete data-set\", the [object] is \"data-set\".\n\nFor this command, " +
        "we list contents of the specified directory.",
    type: "command",
    handler: __dirname + "/DirectoryContents.handler",
    positionals: [
        {
            name: "directory",
            description: "The directory/path to list the contents. Blank/Omitted will list the current directory",
            type: "string"
        }
    ],
    profile: {
        required: ["zosmf"],
    }
};
