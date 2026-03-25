# Using the `send scrt` command

The `zowe zowe-cli-sample send scrt` command supplies SCRT information in a header of an HTTP `GET` request to a specified REST resource. The `send scrt` command can be used to test that a REST service properly processes the SCRT information from the header.

The only HTTP command that the `send scrt` command sends is a `GET` request.

Note that an SCRT header is not sent in a direct connection to the z/OSMF service, because an SCRT header is not processed by z/OSMF and thus it is just unnecessary baggage.

## Configuration

Like all Zowe commands, options can be supplied on the command line. For simplicity, use a zowe.config.json file similar to the one below. Typically, you would only need to specify the SCRT property `featureName`. For completeness, this configuration also specifies the SCRT properties `productId` and `productVersion`.

 ```
 {
    "$schema": "./zowe.schema.json",
    "defaults": {
        "base": "connProps",
        "scrtProfile": "scrtTest"
    },
    "profiles": {
        "connProps": {
            "type": "base",
            "properties": {
                "protocol": "https",
                "host": "Your.host.name.com",
                "port": 1234,
                "user": "YourUserName",
                "password": "YourPassword",
                "rejectUnauthorized": false
            }
        },
        "scrtTest": {
            "type": "scrtProfile",
            "properties": {
                "restResource": "Your/Resource/Path",
                "restQuery": "OptionalQueryStringForYourResource",
                "featureName": "YourScrtFeatureName",
                "productId": "YorPrdId",
                "productVersion": "11.22.33"
            }
        }
    },
    "autoStore": true
}

 ```

## Running the `send scrt` command

Issue the following command:
```
zowe zowe-cli-sample send scrt

This is the response from your service:
<The response from your REST service is displayed>

A successful response above from our GET request to the following URL:
        https://Your.host.name.com:1234/Your/Resource/Path?OptionalQueryStringForYourResource
implies that we transmitted the following SCRT data:
{
  "featureName": "YourScrtFeatureName",
  "productId": "YorPrdId",
  "productVersion": "11.22.33"
}
If your service did not receive SCRT data, check the following log file for errors:
        /Your/home/directory/.zowe/logs/imperative.log
```
