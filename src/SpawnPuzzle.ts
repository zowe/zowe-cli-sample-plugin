/*
Problem:
    The following error occurs in a CI pipeline, so it is not easy to debug on your local machine.

        msg: 'Install Failed',
        causeErrors: ImperativeError: Failed to fetch metadata for package: C:\ourstuff\repos\others\plugins\zowe-cli-sample-plugin

    We are *NOT* asking for what failed. We want to know what code changes you recommend to better identify the real problem, when it does occur.

The following set of functions are called during this error.
The functions are snippets from various files, so you can ignore any syntax errors.
*/
// _______________________________________

public async process(params: IHandlerParameters): Promise<void> {
    try {
      // install stuff including calling the following function
      const packageInfo = getPackageInfo(npmPackage);
    } catch {
        let installResultMsg = "Install Failed";
        throw new ImperativeError({
            msg: installResultMsg,
            causeErrors: e,
            additionalDetails: e.message
        });

    }
}
// _______________________________________

/**
 * Fetch name and version of NPM package that was installed
 * @param pkgSpec The package name as specified on NPM install
 */
export function getPackageInfo(pkgSpec: string): { name: string, version: string, [key: string]: unknown } {
    const pkgInfo = npmPackageArg(pkgSpec);
    let packageName = pkgInfo.name;
    if (!pkgInfo.registry) {
        // Package name is unknown, so fetch it with 'npm pack' command
        try {
            const execOutput = ExecUtils.spawnAndGetOutput(npmCmd, ["pack", pkgSpec, "--dry-run", "--json"]);
            packageName = JSON.parse(execOutput.toString())[0].name;
        } catch (err) {
            throw new ImperativeError({
                msg: `Failed to fetch metadata for package: ${pkgSpec}`,
                additionalDetails: (err as Error).message,
            });
        }
    }
    return readFileSync(path.join(PMFConstants.instance.PLUGIN_HOME_LOCATION, packageName, "package.json"));
}

// _______________________________________

/**
 * Spawn a process with arguments and throw an error if the process fails.
 * Parameters are same as `child_process.spawnSync` (see Node.js docs).
 * Use this method if you want the safe argument parsing of `spawnSync`
 * combined with the smart output handling of `execSync`.
 * @returns Contents of stdout as buffer or string
 */
public static spawnAndGetOutput(command: string, args?: string[], options?: SpawnSyncOptions): Buffer | string {
    const result = spawn.sync(command, args, options);
    return this.handleSpawnResult(result, [command, ...args ?? []]);
}

// _______________________________________

private static handleSpawnResult<T = Buffer | string>(result: SpawnSyncReturns<Buffer | string>, argv: string[]): T {
    // Implementation based on the child_process module
    // https://github.com/nodejs/node/blob/main/lib/child_process.js
    if (result.error != null) {
        throw result.error;
    } else if (result.status !== 0) {
        let msg = `Command failed: ${argv.join(" ")}`;
        if (result.stderr?.length > 0) {
            msg += `\n${result.stderr.toString()}`;
        }
        throw new Error(msg);
    }
    return result.stdout as T;
}
//_______________________________________

