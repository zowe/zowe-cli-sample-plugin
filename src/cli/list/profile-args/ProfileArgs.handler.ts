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
        const usingTeamConfig = ImperativeConfig.instance.config.exists;
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

        if (usingTeamConfig) {
            output.environment.sampleProfileName = ImperativeConfig.instance.config.properties.defaults.sample;
            output.environment.baseProfileName = ImperativeConfig.instance.config.properties.defaults.base;
        } else {
            output.environment.sampleProfileName = params.profiles.get("sample", false)?.name;
            output.environment.baseProfileName = params.profiles.get("base", false)?.name;
        }

        params.response.data.setObj(output);
        params.response.format.output({
            output,
            format: "object"
        });
    }
}