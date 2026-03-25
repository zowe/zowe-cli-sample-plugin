# Using the `send check-status` command

The `zowe zowe-cli-sample send check-status` command obtains information from a z/OSMF instance on a specified host. The command displays the versions of z/OSMF and the z/OS operating system.

This command demonstrates how a command handler can use an existing Zowe z/OSMF SDK function named
`CheckStatus.getZosmfInfo(session)` to perform a desired operation.

## Configuration

Like all Zowe commands, options can be supplied on the command line. For simplicity,
use a zowe.config.json file similar to the one below.

 ```
 {
    "$schema": "./zowe.schema.json",
    "defaults": {
        "base": "baseProfile",
        "zosmf": "zosmfProfile"
    },
    "profiles": {
        "baseProfile": {
            "type": "base",
            "properties": {
                "protocol": "https",
                "rejectUnauthorized": false
            }
        },
        "zosmfProfile": {
            "type": "zosmf",
            "properties": {
                "host": "Your.host.name.com",
                "port": 443,
                "user": "YourUserName",
                "password": "YourPassword"
            }
        }
    },
    "autoStore": true
}
 ```

## Running the `send check-status` command

Issue the following command:
```
zowe zowe-cli-sample send check-status
We got the following z/OSMF status information:
host = 'Your.host.name.com'  port = '443'
z/OSMF version = '29.0'  z/OS version = '05.29.00'
```
