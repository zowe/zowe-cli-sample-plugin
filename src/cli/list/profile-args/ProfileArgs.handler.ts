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
        const profileArgs = {
            host: session.ISession.hostname,
            port: session.ISession.port,
            user: session.ISession.user,
            password: session.ISession.password,
            rejectUnauthorized: session.ISession.rejectUnauthorized,
            tshirtSize: params.arguments.tshirtSize
        };

        const usingTeamConfig = ImperativeConfig.instance.config.exists;
        params.response.console.log(`Using team config: ${usingTeamConfig}`);

        let sampleProfileName: string;
        if (usingTeamConfig) {
            sampleProfileName = ImperativeConfig.instance.config.properties.defaults.sample;
        } else {
            sampleProfileName = params.profiles.get("sample", false)?.name;
        }
        if (sampleProfileName != null) {
            params.response.console.log(`Found sample profile: ${sampleProfileName}`);
        } else {
            params.response.console.log("No sample profile found");
        }

        let baseProfileName: string;
        if (usingTeamConfig) {
            baseProfileName = ImperativeConfig.instance.config.properties.defaults.base;
        } else {
            baseProfileName = params.profiles.get("base", false)?.name;
        }
        if (baseProfileName != null) {
            params.response.console.log(`Found base profile: ${baseProfileName}`);
        } else {
            params.response.console.log("No base profile found");
        }

        params.response.data.setObj(profileArgs);
        params.response.format.output({
            output: profileArgs,
            format: "object"
        });
    }
}
