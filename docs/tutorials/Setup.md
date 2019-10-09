# Setting up your development environment

Before you follow the development tutorials for installing, extending, and creating a Zowe CLI plug-in, follow these steps to set up your environment.

## Prequisites

[Install Zowe CLI](https://zowe.github.io/docs-site/latest/user-guide/cli-installcli.html).

## Initial setup

To create your development space, you will clone and build [zowe-cli-sample-plugin](/README.md#create-a-local-development-space) from source.

### Clone zowe-cli-sample-plugin and build from source

Clone the repository into your development folder to match the following structure:
```
zowe-tutorial
└── zowe-cli-sample-plugin
```

1. `cd` to your `zowe-tutorial` folder
2. `git clone https://github.com/zowe/zowe-cli-sample-plugin`
3. `cd zowe-cli-sample-plugin`
4. `npm install`
5. `npm run build`

### (Optional) Run the automated tests

1. `cd __tests__/__resources__/properties`
2. Copy `example_properties.yaml` to `custom_properties.yaml`.
3. Edit the properties within `custom_properties.yaml` to contain valid system information for your site.
4. `cd` to your `zowe-cli-sample-plugin` folder
5. `npm run test`

## Next steps

After you complete your setup, follow the [Installing the sample plug-in to Zowe CLI](./list-directory-contents/ListDirectoryContentsPlugin.md) tutorial to install this sample plug-in to Zowe CLI.
