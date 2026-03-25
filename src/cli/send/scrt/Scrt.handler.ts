/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import * as os from 'os';
import { IHandlerParameters, Session } from "@zowe/imperative";
import { ScrtRestClient } from "./ScrtRestClient";
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
        // form the path portion of the URL from the SCRT restResource & restQuery properties
        const urlPath = `${params.arguments.restResource}` +
            (params.arguments.restQuery ? `?${params.arguments.restQuery}` : "");

        const fullUrl = `${params.arguments.protocol}://${params.arguments.host}:${params.arguments.port}` +
            (params.arguments.basePath ? `/${params.arguments.basePath}` : "") +
            `/${urlPath}`;

        // If scrtData is available, add it to our session.
        // Because the scrt command of the sample plugin is used as a test tool,
        // we gather SCRT properties from our sample scrtProfile for flexibility.
        // If you follow recommended practices, a real client app will specify only featureName.
        // Further, a real client app might simply supply its featureName as a hard-coded value.
        // Thus the following block of code could be much simpler in a real Zowe client app.
        if (params.arguments.featureName) {
            session.ISession["scrtData"] = { featureName: params.arguments.featureName };

            // only if we have the feature, do we bother with the other scrt properties
            if (params.arguments.productId) {
                session.ISession.scrtData.productId = params.arguments.productId;
            }
            if (params.arguments.productVersion) {
                session.ISession.scrtData.productVersion = params.arguments.productVersion;
            }
        }

        try {
            const restResponse = await ScrtRestClient.getExpectJSON(session, urlPath);
            params.response.console.log(
                `This is the response from your service:\n` +
                JSON.stringify(restResponse, null, 2) +
                `\n\nA successful response above from our GET request to the following URL:` +
                `\n\t${fullUrl}` +
                `\nimplies that we transmitted the following SCRT data:\n` +
                (session.ISession["scrtData"] ?
                    JSON.stringify(session.ISession["scrtData"], null, 2) :
                    "No SCRT data was supplied"
                ) +
                `\nIf your service did not receive SCRT data, check the following log file for errors:` +
                `\n\t${os.homedir() }/.zowe/logs/imperative.log`
            );
        } catch (except) {
            params.response.console.log("We got an exception when calling the following REST service:\n\t" +
                fullUrl + "\nReason = " + except.message
            );
        }
    }
}
