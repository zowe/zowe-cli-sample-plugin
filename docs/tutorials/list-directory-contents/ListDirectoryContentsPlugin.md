# Using the sample plug-in

Before you begin, ensure you've completed the [initial setup](../../../README.md#initial-setup) of your environment to install a plug-in.

## Overview

This tutorial covers running this bundled Zowe CLI plug-in as-is (without modification), which will display your current directory contents.

The plug-in adds a command to the CLI that lists the contents of a directory on your PC.

## Installing the sample plug-in to Zowe CLI


To begin, `cd` into your `zowe-tutorial` folder.

Issue the following commands to install the sample plug-in to Zowe CLI:

1. `cd zowe-tutorial`
2. `zowe plugins install ./zowe-cli-sample-plugin`

## Viewing the installed plug-in

Issue `zowe zowe-cli-sample` in the command line to return information for the installed `zowe-cli-sample` command group:

```
zowe zowe-cli-sample

 DESCRIPTION
 -----------

   Welcome to the sample plug-in for Zowe CLI!

   The sample plug-in (& CLI) follows the Zowe CLI command syntax 'zowe [group]
   [action] [object] [options]'. Where, in the case of the plugin, the [group] is
   the package.json name, the [actions] are defined in the project under
   'src/cli/', & the [objects] (definitions & handler) are defined in the project
   under 'src/cli/'.

 USAGE
 -----

   zowe zowe-cli-sample <group>

   Where <group> is one of the following:

 GROUPS
 ------

   fail  Perform "the fail [action]" on some [objects]
   issue Perform "the issue [action]" on some [objects]
   list  Perform "the list [action]" on some [objects]
```

## Using the installed plug-in

To use the plug-in functionality, issue: `zowe zowe-cli-sample list directory-contents`:

```
zowe zowe-cli-sample list directory-contents
We just got a valid z/OSMF status response from system = YourHost.YourCompany.com

mode  size   birthed                                                   lastModified                                              name
33206 2288   Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) .eslintrc.js
16822        Tue Sep 20 2022 12:44:17 GMT-0400 (Eastern Daylight Time) Tue May 09 2023 15:05:34 GMT-0400 (Eastern Daylight Time) .git
16822        Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) .github
33206 204    Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) .gitignore
16822        Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Thu Apr 13 2023 16:47:47 GMT-0400 (Eastern Daylight Time) .husky
33206        Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) .npmignore
33206 37     Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) .npmrc
33206 1384   Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Wed May 03 2023 16:10:46 GMT-0400 (Eastern Daylight Time) CHANGELOG.md
33206 2176   Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) CONTRIBUTING.md
16822        Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) docs
16822        Tue May 09 2023 13:19:02 GMT-0400 (Eastern Daylight Time) Tue May 09 2023 13:19:02 GMT-0400 (Eastern Daylight Time) lib
33206 25556  Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) LICENSE
33206 407    Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) LICENSE_HEADER
16822        Tue May 09 2023 13:01:34 GMT-0400 (Eastern Daylight Time) Tue May 09 2023 13:03:29 GMT-0400 (Eastern Daylight Time) node_modules
33206 760236 Tue Apr 18 2023 17:15:23 GMT-0400 (Eastern Daylight Time) Tue May 09 2023 13:03:29 GMT-0400 (Eastern Daylight Time) package-lock.json
33206 4506   Tue Apr 18 2023 16:56:39 GMT-0400 (Eastern Daylight Time) Mon May 08 2023 13:10:32 GMT-0400 (Eastern Daylight Time) package.json
33206 4324   Thu Apr 13 2023 16:37:29 GMT-0400 (Eastern Daylight Time) Tue May 09 2023 14:03:45 GMT-0400 (Eastern Daylight Time) README.md
33206 609    Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) release.config.js
16822        Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) scripts
16822        Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) server
16822        Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Wed May 03 2023 17:27:17 GMT-0400 (Eastern Daylight Time) src
33206 565    Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) tsconfig.json
16822        Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) __mocks__
16822        Tue Sep 20 2022 12:44:18 GMT-0400 (Eastern Daylight Time) Wed May 03 2023 13:47:37 GMT-0400 (Eastern Daylight Time) __tests__

```
## (Optional) Testing the installed plug-in

**Note:** If you don't have access to a z/OSMF instance at your site, run `npm run server:start` to launch a mock server at http://localhost:3000.

#### Setup your system connection details:
i. `cd __tests__/__resources__/properties`\
ii. Copy `example_properties.yaml` to `custom_properties.yaml`.\
iii. Edit the properties within `custom_properties.yaml` to contain valid system information for your site.

#### Run tests:
i. `cd` to your `zowe-cli-sample-plugin` folder\
ii. `npm run test`

## Next steps

You successfully installed a plug-in to Zowe CLI! Next, try the [Extending an existing plug-in](../list-typicode-todo/ListTypicodeTodoPlugin.md) tutorial to learn about developing new commands for this plug-in.