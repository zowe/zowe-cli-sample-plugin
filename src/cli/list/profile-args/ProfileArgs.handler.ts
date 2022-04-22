/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { IHandlerParameters, ImperativeConfig, Session } from "@zowe/imperative";
import { ListBaseHandler } from "../ListBaseHandler";

/**
 * Command handler for listing profile args
 * @export
 * @class ProfileArgsHandler
 * @implements {ICommandHandler}
 */
export default class ProfileArgsHandler extends ListBaseHandler {
    /**
     * Process the list profile args command.
     * @param {IHandlerParameters} params
     * @returns {Promise<void>}
     * @memberof ProfileArgsHandler
     */
    public async processWithSession(params: IHandlerParameters, session: Session): Promise<void> {
        // Build an output object for command response
        const usingTeamConfig = ImperativeConfig.instance.config?.exists || false;
        const output: any = {
            arguments: {
                // Load connection info from session object
                host: session.ISession.hostname,
                port: session.ISession.port,
                user: session.ISession.user,
                password: session.ISession.password,
                rejectUnauthorized: session.ISession.rejectUnauthorized,
                // Example of how to load other profile properties
                tshirtSize: params.arguments.tshirtSize
            },
            environment: {
                usingTeamConfig
            }
        };

        // Show names of base and sample profiles if they exist
        if (usingTeamConfig) {
            output.environment.sampleProfileName = ImperativeConfig.instance.config.properties.defaults.sample;
            output.environment.baseProfileName = ImperativeConfig.instance.config.properties.defaults.base;
        } else {
            output.environment.sampleProfileName = params.profiles.getMeta("sample", false)?.name;
            output.environment.baseProfileName = params.profiles.getMeta("base", false)?.name;
        }

        // Set output for --rfj response and print it to console
        params.response.data.setObj(output);
        params.response.format.output({
            output,
            format: "object"
        });
    }
}
