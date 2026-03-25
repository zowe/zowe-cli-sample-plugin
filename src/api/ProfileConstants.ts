/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { ICommandOptionDefinition } from "@zowe/imperative";

export class ProfileConstants {
    public static SAMPLE_CONN_OPTION_GROUP = "Connection Options";
    public static SAMPLE_TSHIRT_OPTION_GROUP = "Sample T-Shirt Options";
    public static SAMPLE_SCRT_OPTION_GROUP = "SCRT Options";

    public static SAMPLE_CONN_OPTION_PROTOCOL: ICommandOptionDefinition = {
        name: "protocol",
        aliases: ["pr"],
        description: "Communication protocol",
        type: "string",
        defaultValue: "https",
        group: ProfileConstants.SAMPLE_CONN_OPTION_GROUP
    };

    public static SAMPLE_CONN_OPTION_HOST: ICommandOptionDefinition = {
        name: "host",
        aliases: ["H"],
        description: "The sample service host name",
        type: "string",
        group: ProfileConstants.SAMPLE_CONN_OPTION_GROUP
    };

    public static SAMPLE_CONN_OPTION_PORT: ICommandOptionDefinition = {
        name: "port",
        aliases: ["P"],
        description: "The sample service port",
        type: "number",
        group: ProfileConstants.SAMPLE_CONN_OPTION_GROUP
    };

    public static SAMPLE_CONN_BASE_PATH: ICommandOptionDefinition = {
        name: "base-path",
        aliases: ["bp"],
        description: "The base path for your API mediation layer instance." +
            " Specify this option to prepend the base path to all z/OSMF resources when making REST requests." +
            " Do not specify this option if you are not using the API mediation layer.",
        type: "string",
        group: ProfileConstants.SAMPLE_CONN_OPTION_GROUP
    };

    public static SAMPLE_CONN_OPTION_USER: ICommandOptionDefinition = {
        name: "user",
        aliases: ["u"],
        description: "The sample service user name",
        type: "string",
        group: ProfileConstants.SAMPLE_CONN_OPTION_GROUP
    };

    public static SAMPLE_CONN_OPTION_PASSWORD: ICommandOptionDefinition = {
        name: "password",
        aliases: ["p"],
        description: "The sample service password",
        type: "string",
        group: ProfileConstants.SAMPLE_CONN_OPTION_GROUP
    };

    public static SAMPLE_CONN_OPTION_REJECT_UNAUTHORIZED: ICommandOptionDefinition = {
        name: "reject-unauthorized",
        aliases: ["ru"],
        description: "Reject self-signed certificates",
        type: "boolean",
        defaultValue: true,
        group: ProfileConstants.SAMPLE_CONN_OPTION_GROUP
    };

    public static SAMPLE_TSHIRT_OPTION_TSHIRT_SIZE: ICommandOptionDefinition = {
        name: "tshirt-size",
        aliases: ["ts"],
        description: "Sample option for your T-shirt size",
        type: "string",
        allowableValues: { values: ["XS", "S", "M", "L", "XL"] },
        defaultValue: "M",
        group: ProfileConstants.SAMPLE_TSHIRT_OPTION_GROUP
    };

    public static SAMPLE_SCRT_OPTION_REST_RESOURCE: ICommandOptionDefinition = {
        name: "rest-resource",
        aliases: ["rr"],
        description: "The REST resource path which will be added to https://host:port/ in order " +
                     "to send a GET request containing an SCRT header to your desired REST service",
        type: "string",
        group: ProfileConstants.SAMPLE_SCRT_OPTION_GROUP,
        required: true
    };

    public static SAMPLE_SCRT_OPTION_REST_QUERY: ICommandOptionDefinition = {
        name: "rest-query",
        aliases: ["rq"],
        description: "A query string that can be added to the the https://host:port/rest-resource in order " +
            "to successfully perform a GET request to your desired REST service",
        type: "string",
        group: ProfileConstants.SAMPLE_SCRT_OPTION_GROUP,
        required: false
    };

    public static SAMPLE_SCRT_OPTION_FEATURE_NAME: ICommandOptionDefinition = {
        name: "feature-name",
        aliases: ["fn"],
        description: "Name of the feature for the Zowe client app",
        type: "string",
        group: ProfileConstants.SAMPLE_SCRT_OPTION_GROUP,
        required: true
    };

    public static SAMPLE_SCRT_OPTION_PRODUCT_ID: ICommandOptionDefinition = {
        name: "product-id",
        aliases: ["pi"],
        description: "Product ID of the REST service with which the client app is interacting. " +
                     "Only needed if the REST service does not define its own productId property.",
        type: "string",
        group: ProfileConstants.SAMPLE_SCRT_OPTION_GROUP
    };

    public static SAMPLE_SCRT_OPTION_PRODUCT_VERSION: ICommandOptionDefinition = {
        name: "product-version",
        aliases: ["pv"],
        description: "Product version of the REST service with which the client app is interacting. " +
            "Only needed if the REST service does not define its own productVersion property.",
        type: "string",
        group: ProfileConstants.SAMPLE_SCRT_OPTION_GROUP
    };

    public static SAMPLE_CONN_OPTIONS: ICommandOptionDefinition[] = [
        ProfileConstants.SAMPLE_CONN_OPTION_PROTOCOL,
        ProfileConstants.SAMPLE_CONN_OPTION_HOST,
        ProfileConstants.SAMPLE_CONN_OPTION_PORT,
        ProfileConstants.SAMPLE_CONN_BASE_PATH,
        ProfileConstants.SAMPLE_CONN_OPTION_USER,
        ProfileConstants.SAMPLE_CONN_OPTION_PASSWORD,
        ProfileConstants.SAMPLE_CONN_OPTION_REJECT_UNAUTHORIZED
    ];

    public static SAMPLE_SCRT_OPTIONS: ICommandOptionDefinition[] = [
        ... ProfileConstants.SAMPLE_CONN_OPTIONS,
        ProfileConstants.SAMPLE_SCRT_OPTION_REST_RESOURCE,
        ProfileConstants.SAMPLE_SCRT_OPTION_REST_QUERY,
        ProfileConstants.SAMPLE_SCRT_OPTION_FEATURE_NAME,
        ProfileConstants.SAMPLE_SCRT_OPTION_PRODUCT_ID,
        ProfileConstants.SAMPLE_SCRT_OPTION_PRODUCT_VERSION
    ];

    public static SAMPLE_TSHIRT_OPTIONS: ICommandOptionDefinition[] = [
        ...ProfileConstants.SAMPLE_CONN_OPTIONS,
        ProfileConstants.SAMPLE_TSHIRT_OPTION_TSHIRT_SIZE
    ];
}
