The zowe.config_sample.json file in this folder can be customized to enable you to run each of the available commands of the zowe sample plug-in.

1. Install Zowe CLI.  See instructions in the sample plugin's main [README](https://github.com/zowe/zowe-cli-sample-plugin/blob/master/README.md) file.
2. Install the Zowe sample plug-in.  Again, see instructions in the sample plugin's main [README](https://github.com/zowe/zowe-cli-sample-plugin/blob/master/README.md)) file.
3. Copy `zowe.config_sample.json` to `zowe.config.json` in a directory of your choice.
4. Update the properties in zowe.config.json to reflect the values used at your company.
5. You can then successfully run each of the following sample plug-in commands:

```
zowe zowe-cli-sample fail error-handler
zowe zowe-cli-sample issue command-with-options
zowe zowe-cli-sample issue command-with-options --required-number 1111
zowe zowe-cli-sample issue command-with-options --required-number 1111 --use-the-string
zowe zcsp issue command-with-options --required-number 1111 --use-the-string --the-string "Test string"
zowe zowe-cli-sample issue command-with-positionals parmOne 222
zowe zowe-cli-sample list directory-contents
zowe zowe-cli-sample list profile-args
zowe zowe-cli-sample send check-status
zowe zowe-cli-sample send scrt
```
