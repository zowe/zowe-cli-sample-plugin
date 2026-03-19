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
import { SendBaseHandler } from "../SendBaseHandler";

/**
 * Command handler for sending SCRT data.
 * It send an REST GET request to an arbitrary REST service, to test the transmission
 * of an SCRT header on that request.
 * @export
 * @class ScrtHandler
 * @implements {ICommandHandler}
 */
export default class ScrtHandler extends SendBaseHandler {

    /**
     * Process the scrt command.
     * @param {IHandlerParameters} params
     * @returns {Promise<void>}
     * @memberof ScrtHandler
     */
    public async processWithSession(params: IHandlerParameters, session: Session): Promise<void> {
        // form the URL from our connection properties and the SCRT restResource property
        const url = `${params.arguments.protocol}://${params.arguments.host}:${params.arguments.port}/` +
            `${params.arguments.restResource}`;

        try {
            /* zzz
            const zosResponse = await CheckStatus.getZosmfInfo(session);
            params.response.console.log("We just got a valid z/OSMF status response from system = " +
                zosResponse.zosmf_hostname + "\n"
            );
            zzz */
            params.response.console.log(
                `Pretend that we sent featureName = '${params.arguments.featureName}' ` +
                `in an SCRT header to\n\t'${url}'.`
            );
            // console.log("ScrtHandler.processWithSession:zzz: params:\n" + JSON.stringify(params, null, 2));

        } catch (except) {
            params.response.console.log("We got an exception when calling the following REST service:\n\t" +
                url + "\nReason = " + except.message
            );
        }
    }
}
