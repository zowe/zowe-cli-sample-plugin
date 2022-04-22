/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import {IImperativeConfig} from "@zowe/imperative";
import { ProfileConstants } from "./api/ProfileConstants";

const config: IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    pluginHealthCheck: __dirname + "/healthCheck.Handler",
    pluginSummary: "Zowe CLI sample plug-in",
    pluginAliases: ["zcsp"],
    rootCommandDescription: "Welcome to the sample plug-in for Zowe CLI!\n\n The sample plug-in " +
        "(& CLI) follows the Zowe CLI command syntax 'zowe [group] [action] [object] [options]'. " +
        "Where, in the case of the plugin, " +
        "the [group] is the package.json name, " +
        "the [actions] are defined in the project under 'src/cli/', " +
        "& the [objects] (definitions & handler) are defined in the project under 'src/cli/'.",
    productDisplayName: "Zowe CLI Sample Plug-in",
    name: "zowe-cli-sample",
    profiles: [
        {
            type: "sample",
            schema: {
                type: "object",
                title: "Sample Profile",
                description: "A sample profile is required to issue commands that interact with the sample API. The " +
                    "sample profile contains your host, port, user name, and password to connect to the sample API.",
                properties: {
                    host: {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_OPTION_HOST
                    },
                    port: {
                        type: "number",
                        includeInTemplate: true,
                        optionDefinition: ProfileConstants.SAMPLE_OPTION_PORT
                    },
                    user: {
                        type: "string",
                        secure: true,
                        optionDefinition: ProfileConstants.SAMPLE_OPTION_USER
                    },
                    password: {
                        type: "string",
                        secure: true,
                        optionDefinition: ProfileConstants.SAMPLE_OPTION_PASSWORD
                    },
                    rejectUnauthorized: {
                        type: "boolean",
                        optionDefinition: ProfileConstants.SAMPLE_OPTION_REJECT_UNAUTHORIZED
                    },
                    tshirtSize: {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_OPTION_TSHIRT_SIZE
                    }
                }
            }
        }
    ]
};

export = config;
