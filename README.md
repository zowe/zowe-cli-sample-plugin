# Zowe CLI Sample Plug-in

This repository contains a sample Zowe CLI Plug-in that adheres to the contribution guidelines for the project. Use this project and the associated tutorials as a starting point for creating Zowe CLI Plug-ins.

- [Zowe CLI Sample Plug-in](#zowe-cli-sample-plug-in)
  - [Sample Plug-in Overview](#sample-plug-in-overview)
  - [Why Create a Zowe CLI Plug-in?](#why-create-a-zowe-cli-plug-in)
  - [Tutorials, Documentation, and Guidelines](#tutorials-documentation-and-guidelines)
    - [Tutorials](#tutorials)
    - [Imperative CLI Framework Documentation](#imperative-cli-framework-documentation)
    - [Contribution Guidelines](#contribution-guidelines)
    - [CICD Guidelines](#cicd-guidelines)
  - [Set up your Development Environment](#set-up-your-development-environment)
    - [Prerequisites](#prerequisites)
    - [Initial Setup](#initial-setup)
    - [Next Steps: Using your Sample Plug-in](#next-steps-using-your-sample-plug-in)

## Sample Plug-in Overview

This sample includes:
- Source code for extending the Zowe CLI with a command that lists the contents of a remote directory.
- Tutorials for:
  - [Building the plug-in](docs/tutorials/list-directory-contents/ListDirectoryContentsPlugin.md) to use its `zowe zowe-cli-sample list directory-contents` command.
  - [Enhancing the sample](docs/tutorials/files-util/FilesUtilPlugin.md) with a third-party package and creating a new command for file-diff highlighting.
  - [Augmenting the code](docs/tutorials/list-typicode-todo/ListTypicodeTodoPlugin.md) to connect with Typicode's external API, a simulator of backend data, to walk through the cli's interaction with RESTful services.
  - [Using profiles](docs/tutorials/profile-example/ProfilePlugin.md) with your plug-in.
- Examples of lifecycle hooks and GitHub Actions workflows for CICD.
- Templates for unit, system and integration testing suites.

## Why Create a Zowe CLI Plug-in?

You might want to create a Zowe CLI Plug-in to accomplish the following:

* Provide new script-able functionality for yourself, your organization, or to a broader community.
* Make use of Zowe CLI infrastructure (profiles and programmatic APIs).
* Participate in the Zowe CLI community space.


## Tutorials, Documentation, and Guidelines


### Tutorials

This sample plug-in comes with [tutorial information](docs/tutorials), but more in-depth documentation can be found online. See [Extend Zowe CLI](https://docs.zowe.org/stable/extend/extend-zowe-overview/#extend-zowe-cli) to learn more about how to work with this sample plug-in, build new commands, or build a new Zowe CLI Plug-in.


**Note:** For an advanced example on how to create a plug-in that serves as a Credential Manager, see [Zowe CLI secrets for Kubernetes](https://github.com/zowe/zowe-cli-secrets-for-kubernetes/)

### Imperative CLI Framework Documentation

Previously, Zowe CLI required the Imperative CLI Framework as an external dependency. Starting with V3, the Imperative Framework is integrated directly into the CLI, forming its core foundation. Archived details on the [Imperative CLI Framework](https://github.com/zowe/imperative/wiki) remain useful for understanding Zowe CLI's features and structure. Refer to this information when developing plug-ins.

### Contribution Guidelines

The Zowe CLI [contribution guidelines](CONTRIBUTING.md) contain standards and conventions for developing Zowe CLI Plug-ins.

The guidelines contain critical information about working with the code, running/writing/maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates with Zowe CLI properly.

### CICD Guidelines

Reference our [included GitHub Actions workflows](.github/workflows/) for guidance about setting up and maintaining automated testing and deployment for your plug-in with GitHub Actions.

## Set up your Development Environment

### Prerequisites

[Install Zowe CLI](https://docs.zowe.org/stable/user-guide/cli-installcli) and its dependencies globally.

### Initial Setup

To create your development space, you will clone and build the zowe-cli-sample-plugin from source.

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

## Next steps: Using your Sample Plug-in

After you complete your setup, follow the [Installing the sample plug-in to Zowe CLI](docs/tutorials/list-directory-contents/ListDirectoryContentsPlugin.md) tutorial to install, use and test this sample plug-in with the Zowe CLI.