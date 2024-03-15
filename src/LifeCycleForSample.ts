/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import {AbstractPluginLifeCycle, ImperativeError, Logger} from "@zowe/imperative";

/**
 * This class performs lifecycle functions for your plug-in. You are free to
 * change the name of this class to reflect your plug-in and its actions.
 *
 * You only have to supply such a class if you specify the 'pluginLifeCycle'
 * property in your IImperativeConfig definition for your plug-in. In this sample,
 * that definition is supplied in src/pluginDef.ts.
 */
export class LifeCycleForSample extends AbstractPluginLifeCycle {
    /**
     * This function will be called after a plug-in is installed.
     * A plug-in can use this opportunity to perform a sanity test or to
     * perform some additional setup which is specific to your plug-in.
     *
     * If your plug-in's postInstall function performs an asynchronous operation,
     * its postInstall function should return a promise, allowing the CLI
     * to await the postInstall function. Such a signature would be like this:
     *
     *      public async postInstall(): Promise<void>
     *
     * If it has no asynchronous operation, the postInstall function can be
     * written as a synchronous function. That is the style which this trivial
     * synchronous sample uses below.
     *
     * If you supply this class, you must supply this function. If you have nothing to
     * do post-install, then simply return from the function.
     */
    public postInstall(): void {
        /* It is up to you to decide what actions are meaningful for you
         * to perform immediately after your plug-in is installed.
         *
         * When all goes well, you probably should display nothing to the user.
         */

        const somethingWeirdOccurred = true;
        if ( somethingWeirdOccurred ) {
            /* If you display a message about a problem, you should also log the
             * message to a file, so that the message can be found later.
             *
             * You can use a consoleLogger to display a message. The available logging
             * levels can be found in the Zowe doc:
             * https://docs.zowe.org/stable/user-guide/cli-configuringcli-ev/#setting-cli-log-levels
             *
             * Note that the user controls the logging level with the
             * ZOWE_IMPERATIVE_LOG_LEVEL environment variable. When not set, the
             * default log level is WARN. So by default, only messages displayed at
             * the WARN, ERROR, and FATAL levels will be displayed (or logged).
             */
            const warnMsg = "Something weird happened in the sample plug-in's " +
                 "postInstall function. However, things should still work ok.";
            Logger.getConsoleLogger().warn(warnMsg);
            Logger.getImperativeLogger().warn(warnMsg);
        }

        /* When you are unable to achieve your desired actions, you should throw
         * an imperative error. The "zowe plugins install" command will catch
         * that error, display it, and add some additional information.
         *
         * Your plug-in has already been installed. However, when you throw an
         * error during your postInstall function, the 'zowe plugins install'
         * command will exit with a non-zero exit code.
         */
        const someBigProblemOccurred = false;
        if ( someBigProblemOccurred ) {
            throw new ImperativeError({
                msg: "Something awful happened in the sample plug-in's " +
                     "postInstall function. Thus, the plug-in could not be properly setup."
            });
        }
    }

    /**
     * This function will be called before a plug-in is uninstalled.
     * This lifecycle hook is intended to replace the capability that used to
     * be performed by the NPM pre-uninstall action before NPM removed that
     * capability in NPM version 7.
     * See https://docs.npmjs.com/cli/v9/using-npm/scripts#a-note-on-a-lack-of-npm-uninstall-scripts
     *
     * A plug-in can use this opportunity to revert any specialized setup that was
     * established during the lifetime of your plug-in.
     *
     * If your plug-in's preUninstall function performs an asynchronous operation,
     * its preUninstall function should return a promise, allowing the CLI
     * framework to await the preUninstall function. Such a signature would be like this:
     *
     *      public async preUninstall(): Promise<void>
     *
     * If it has no asynchronous operation, the preUninstall function can be
     * written as a synchronous function. That is the style which this trivial
     * synchronous sample uses below.
     *
     * If you supply this class, you must supply this function. If you have nothing to
     * do pre-uninstall, then simply return from the function.
     */
    public preUninstall(): void {
        /* The comments from the postInstall function also apply to the
         * preUninstall function.
         */
        const somethingWeirdOccurred = true;
        if ( somethingWeirdOccurred ) {
            const warnMsg = "Something weird happened in the sample plug-in's " +
                "preUninstall function that we thought you should know about.";
            Logger.getConsoleLogger().warn(warnMsg);
            Logger.getImperativeLogger().warn(warnMsg);
        }

        /* When you throw an error during your preUninstall function, the
         * 'zowe plugins uninstall' catches the error and still performs the
         * uninstall operation that was requested by the user. If the actual
         * uninstall operation succeeds, the command will exit with a zero
         * exit code.
         */
        const someBigProblemOccurred = false;
        if ( someBigProblemOccurred ) {
            throw new ImperativeError({
                msg: "Something awful happened during the sample plug-in's " +
                     "preUninstall function. Maybe you have to manually release " +
                     "some resource that was used by this plug-in."
            });
        }
    }
}

module.exports = LifeCycleForSample;