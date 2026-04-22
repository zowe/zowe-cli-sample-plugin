/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { IHandlerParameters, Session } from "@zowe/imperative";
import { CheckStatus } from "@zowe/zosmf-for-zowe-sdk";
import { SendBaseHandler } from "../SendBaseHandler";

/**
 * Command handler for doing a z/OSMF check status operation
 * @export
 * @class CheckStatusHandler
 * @implements {ICommandHandler}
 */
export default class CheckStatusHandler extends SendBaseHandler {

    /**
     * Process the check-status command.
     * @param {IHandlerParameters} params
     * @returns {Promise<void>}
     * @memberof CheckStatusHandler
     */
    public async processWithSession(params: IHandlerParameters, session: Session): Promise<void> {

        /* We call a Zowe CLI API, just to show that it can be done.
         * We chose zosmf check status, since it is the simplest.
         */
        try {
            const zosResponse = await CheckStatus.getZosmfInfo(session);
            params.response.console.log(`We got the following z/OSMF status information:\n` +
                `host = '${zosResponse.zosmf_hostname}'  port = '${zosResponse.zosmf_port}'\n` +
                `z/OSMF version = '${zosResponse.zosmf_full_version}'  z/OS version = '${zosResponse.zos_version}'\n`
            );

        } catch (except) {
            params.response.console.log(`We got an exception calling Zowe CLI's CheckStatus.getZosmfInfo API for ` +
                `host = '${session.ISession.hostname}'  port = '${session.ISession.port}'\n` +
                `Reason = ${except.message}`
            );
        }
    }
}
