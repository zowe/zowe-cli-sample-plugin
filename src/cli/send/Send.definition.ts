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
import { CheckStatusDefinition } from "./check-status/CheckStatus.definition";
import { ScrtDefinition } from "./scrt/Scrt.definition";

/**
 * Command definition for the "send" command. The send command is of type
 * "group", which means it must have children.
 *
 * We can send a chack-status to z/OSMF, or send SCRT data to a REST service.
 *
 * Property Summary:
 * =================
 * "name" of the [action]. Always a verb (e.g. "copy")
 * "summary" will display when issuing the help for the [group] (e.g. zowe zos-files --help)
 * "type" is "group" which means it has children (the [objects])
 * "children" is the set of child definitions (the [objects])
 */
const SendDefinition: ICommandDefinition = {
    name: "send",
    summary: "Send a REST request",
    description: "The 'send' command sends a REST request. " +
                 "The type of request is determined by which command is specified.",
    type: "group",
    children: [CheckStatusDefinition, ScrtDefinition]
};

export = SendDefinition;
