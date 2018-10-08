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

import {AbstractCredentialManager, IProfileLoaded, Logger, SecureCredential} from "@brightside/imperative";

/*
 * This is an example of overriding the CredentialManager component of the
 * Imperative framework. You can enable it for a test by editing
 *
 *     $ZOWE_CLI_HOME/settings/imperative.json
 *
 * to contain:
 *    {
 *         "overrides": {
 *         "CredentialManager": "@brightside/zowe-cli-sample-plugin"
 *    }
 *
 * You can then try this CredentialManager override with commands like the following:
 *
 *    zowe profiles create zosmf-profile YourTestProfileName ...
 *    zowe profiles delete zosmf-profile YourTestProfileName
 *
 * This is just a sample of the mechanism. Do not try to actually use this to
 * store any credentials. Instead, use the Imperative default CredentialManager,
 * or write a real CredentialManager override of your own.
 */
export = class CredentialManagerOverrides extends AbstractCredentialManager {

    private consoleLog = Logger.getConsoleLogger();

    constructor(service: string, displayName: string) {
        super(service, displayName);
    }

    public async deleteCredentials(account: string) {
        this.consoleLog.info("CredentialManager in sample-plugin is deleting:\n" +
            `    service = ${this.service}\n` +
            `    account = ${account}`
        );
    }

    public async loadCredentials(account: string) {
        this.consoleLog.info("CredentialManager in sample-plugin is loading:\n" +
             `    service = ${this.service}\n` +
             `    account = ${account}`
        );
        const loadedProfResult: IProfileLoaded = {
            message: "Creds loaded from sample-plugin",
            type: "SomeTypeOfProfile",
            failNotFound: true
        };
        const loadResultString = JSON.stringify(loadedProfResult, null, 2);
        return Buffer.from(loadResultString).toString("base64");
    }

    public async saveCredentials(account: string, credentials: SecureCredential) {
        this.consoleLog.info("CredentialManager in sample-plugin is saving these creds:\n" +
            `    service     = ${this.service}\n` +
            `    account     = ${account}\n` +
            `    credentials = ${credentials.length * Math.random()}`
        );
    }
};
