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

import { ICommandDefinition } from "@brightside/imperative";
import { ErrorHandlerDefinition } from "./error_handler/ErrorHandler.definition";
/**
 * [action] command defintion for the [action] two group. The [action] is of imperative command definition type
 * "group", which means it must have children.
 *
 * In this case, the action is "fail" - which will cause handlers to fail in a variety of ways.
 *
 * Property Summary:
 * =================
 * "name" of the [action]. Always a verb (e.g. "copy")
 * "summary" will display when issuing the help for the [group] (e.g. zowe zos-files --help)
 * "type" is "group" which means it has children (the [objects])
 * "children" is the set of child definitions (the [objects])
 */
const FailDefinition: ICommandDefinition = {
    name: "fail",
    summary: "Perform \"the fail [action]\" on some [objects]",
    description: "[actions] in Zowe CLI are groups of commands. [actions] are always verbs. " +
        "For example, for command \"zowe zos-files delete data-set\", the [action] is \"delete\".\n\n" +
        "For this action (\"fail\") we will fail handlers.",
    type: "group",
    children: [ErrorHandlerDefinition]
};

export = FailDefinition;
