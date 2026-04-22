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

const pluginDef: IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    pluginLifeCycle: __dirname + "/LifeCycleForSample",
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
            type: "tShirtProfile",
            schema: {
                type: "object",
                title: "A sample profile that is like a z/OSMF profile with an extra T-shirt property",
                description: "A profile that includes connection type of properties (which are not used) " +
                             "plus a T-shirt property.",
                properties: {
                    host: {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_CONN_OPTION_HOST
                    },
                    port: {
                        type: "number",
                        includeInTemplate: true,
                        optionDefinition: ProfileConstants.SAMPLE_CONN_OPTION_PORT
                    },
                    user: {
                        type: "string",
                        secure: true,
                        optionDefinition: ProfileConstants.SAMPLE_CONN_OPTION_USER
                    },
                    password: {
                        type: "string",
                        secure: true,
                        optionDefinition: ProfileConstants.SAMPLE_CONN_OPTION_PASSWORD
                    },
                    rejectUnauthorized: {
                        type: "boolean",
                        optionDefinition: ProfileConstants.SAMPLE_CONN_OPTION_REJECT_UNAUTHORIZED
                    },
                    tshirtSize: {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_TSHIRT_OPTION_TSHIRT_SIZE
                    }
                }
            }
        },
        {
            type: "scrtProfile",
            schema: {
                type: "object",
                title: "Scrt Profile",
                description: "An SCRT profile is used to test the transmission of SCRT properties " +
                             "from a Zowe client app to a REST service. It contains connection " +
                             "properties (host, port, etc) and scrt properties (featureName, productId, etc).",
                properties: {
                    protocol: {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_CONN_OPTION_PROTOCOL
                    },
                    host: {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_CONN_OPTION_HOST
                    },
                    port: {
                        type: "number",
                        includeInTemplate: true,
                        optionDefinition: ProfileConstants.SAMPLE_CONN_OPTION_PORT
                    },
                    basePath: {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_CONN_BASE_PATH
                    },
                    user: {
                        type: "string",
                        secure: true,
                        optionDefinition: ProfileConstants.SAMPLE_CONN_OPTION_USER
                    },
                    password: {
                        type: "string",
                        secure: true,
                        optionDefinition: ProfileConstants.SAMPLE_CONN_OPTION_PASSWORD
                    },
                    rejectUnauthorized: {
                        type: "boolean",
                        optionDefinition: ProfileConstants.SAMPLE_CONN_OPTION_REJECT_UNAUTHORIZED
                    },
                    restResource: {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_SCRT_OPTION_REST_RESOURCE
                    },
                    restQuery : {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_SCRT_OPTION_REST_QUERY
                    },
                    featureName: {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_SCRT_OPTION_FEATURE_NAME
                    },
                    productId: {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_SCRT_OPTION_PRODUCT_ID
                    },
                    productVersion: {
                        type: "string",
                        optionDefinition: ProfileConstants.SAMPLE_SCRT_OPTION_PRODUCT_VERSION
                    }
                }
            }
        }
    ]
};

export = pluginDef;
