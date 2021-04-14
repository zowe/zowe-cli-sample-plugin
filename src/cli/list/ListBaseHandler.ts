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

import { ConnectionPropsForSessCfg, ICommandArguments, ICommandHandler, IHandlerParameters, ISession, Session } from "@zowe/imperative";

/**
 * Command handler for listing profile args
 * @export
 * @class ProfileArgsHandler
 * @implements {ICommandHandler}
 */
export abstract class ListBaseHandler implements ICommandHandler {
    /**
     * Process the list profile args command.
     * @param {IHandlerParameters} params
     * @returns {Promise<void>}
     * @memberof ProfileArgsHandler
     */
    public async process(params: IHandlerParameters): Promise<void> {
        // use the user's zosmf profile to create a session to the desired zosmf subsystem
        const session = await this.createSessCfgFromArgs(params.arguments);
        this.processWithSession(params, session);
    }

    public abstract processWithSession(params: IHandlerParameters, session: Session): Promise<void>;

    /**
     * Given command line arguments, create a REST Client Session.
     * @static
     * @param {ICommandArguments} args - The arguments specified by the user
     * @param {boolean} doPrompting - Whether to prompt for missing arguments (defaults to true)
     * @returns {Session} - A session for usage with the sample API
     */
    private async createSessCfgFromArgs(args: ICommandArguments, doPrompting = true): Promise<Session> {
        const sessCfg: ISession = {
            type: "basic",
            hostname: args.host,
            port: args.port,
            user: args.user,
            password: args.password,
            basePath: args.basePath,
            rejectUnauthorized: args.rejectUnauthorized,
            protocol: args.protocol || "https"
        };

        const sessCfgWithCreds = await ConnectionPropsForSessCfg.addPropsOrPrompt<ISession>(sessCfg, args, {doPrompting});
        return new Session(sessCfgWithCreds);
    }
}
