# Zowe CLI Sample Plug-in

This repository contains a sample Zowe CLI Plug-in that adheres to the contribution guidelines for the project. Use this project and the associated tutorials as a starting point for creating Zowe CLI Plug-ins.

- [Zowe CLI Sample Plug-in](#zowe-cli-sample-plug-in)
  - [Plug-in Sample Overview](#plug-in-sample-overview)
  - [Why Create a Zowe CLI Plug-in?](#why-create-a-zowe-cli-plug-in)
  - [Tutorials, Documentation, and Guidelines](#tutorials-documentation-and-guidelines)
    - [Tutorials](#tutorials)
    - [Contribution Guidelines](#contribution-guidelines)
    - [Imperative CLI Framework Documentation](#imperative-cli-framework-documentation)
    - [CICD Guidelines](#cicd-guidelines)
  - [Prerequisites](#prerequisites)
  - [Create a Local Development Space](#create-a-local-development-space)
    - [Clone zowe-cli-sample-plugin and Build From Source](#clone-zowe-cli-sample-plugin-and-build-from-source)
    - [Run the Automated Tests](#run-the-automated-tests)
    - [Install the zowe-cli-sample-plugin to Zowe CLI](#install-the-zowe-cli-sample-plugin-to-zowe-cli)

## Plug-in Sample Overview

This plug-in sample includes:
- Source code for extending the Zowe CLI with a command that lists the contents of a remote directory.
- Tutorials on:
  - [Building the plug-in](docs/tutorials/list-directory-contents/ListDirectoryContentsPlugin.md) to use its `zowe zowe-cli-sample list directory-contents` command.
  - [Enhancing the sample](docs/tutorials/files-util/FilesUtilPlugin.md) with a third-party package and creating a new command for file-diff highlighting.
  - [Augmenting the code](docs/tutorials/list-typicode-todo/ListTypicodeTodoPlugin.md) to connect with Typicode's external API, a simulator of backend data, to walk through the cli's interaction with RESTful services.
- Examples of lifecycle hooks and GitHub Actions workflows for CICD.
- Templates for model testing suites.

## Why Create a Zowe CLI Plug-in?

You might want to create a Zowe CLI Plug-in to accomplish the following:

* Provide new script-able functionality for yourself, your organization, or to a broader community.
* Make use of Zowe CLI infrastructure (profiles and programmatic APIs).
* Participate in the Zowe CLI community space.


## Tutorials, Documentation, and Guidelines

We provide the following tutorials, guidelines, and documentation to assist you during development:

### Tutorials

This sample plug-in comes with [tutorial information](docs/tutorials), but more in-depth documentation can be found online. See [Extend Zowe CLI](https://docs.zowe.org/stable/extend/extend-zowe-overview/#extend-zowe-cli) to learn more about how to work with this sample plug-in, build new commands, or build a new Zowe CLI Plug-in.


**Note:** For an advanced example on how to create a plug-in that serves as a Credential Manager, see [Zowe CLI secrets for Kubernetes](https://github.com/zowe/zowe-cli-secrets-for-kubernetes/)

### Contribution Guidelines

The Zowe CLI [contribution guidelines](CONTRIBUTING.md) contain standards and conventions for developing Zowe CLI Plug-ins.

The guidelines contain critical information about working with the code, running/writing/maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates with Zowe CLI properly.

### Imperative CLI Framework Documentation

The Zowe CLI once required the [Imperative CLI Framework](https://github.com/zowe/imperative/wiki) as a dependency. As of V3 of the CLI, Imperative has become a built-in package of the CLI. Many of the CLI's capabilities stem from Imperative's provided structural foundation. The following archived information about the Imperative CLI Framework is still relevant and will provide you with a good understanding about the underpinnings and features of the Zowe CLI. Refer to these documents during the development of your plug-in.

### CICD Guidelines

Reference our [included GitHub Actions workflows](.github/workflows/) for guidance about setting up and maintaining automated testing and deployment for your plug-in with GitHub Actions.

## Prerequisites

Before you work with the Zowe CLI sample plug-in, [install Zowe CLI](https://docs.zowe.org/stable/user-guide/cli-installcli) and its dependencies globally.

## Create a Local Development Space

To create your development space, clone and build the Zowe CLI sample plug-in from source.

Create a local development folder named `zowe-tutorial`. You will clone and build all projects in this folder. Then install all dependencies.

Clone the repositories into your development folder to match the following structure:

```
zowe-tutorial
└── zowe-cli-sample-plugin
```

### Clone zowe-cli-sample-plugin and Build From Source

See [setup](docs/tutorials/Setup.md).

### Run the Automated Tests

**Note:** If you don't have access to a z/OSMF instance at your site, run `npm run server:start` to launch a mock server at http://localhost:3000.

#### If you have a z/OSMF system you are connecting to:
1. `cd __tests__/__resources__/properties`
2. a) Copy `example_properties.yaml` to `custom_properties.yaml`.\
b) Edit the properties within `custom_properties.yaml` to contain valid system information for your site.

#### Run your tests:
3. `cd` to your `zowe-cli-sample-plugin` folder
4. `npm run test`

### Install the zowe-cli-sample-plugin to Zowe CLI

This process assumes that you already installed Zowe CLI on your PC in the previous steps.

1. `cd` to your `zowe-tutorial` folder.
2. `zowe plugins install ./zowe-cli-sample-plugin`
3. `zowe zowe-cli-sample`
   You should see help text displayed if the installation was successful.
