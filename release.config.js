module.exports = {
    branches: [
        {
            name: "master",
            level: "minor"
        },
        {
            name: "next",
            prerelease: true
        },
        {
            name: "lts-*",
            level: "patch"
        }
    ],
    plugins: [
        "@octorelease/changelog",
        ["@octorelease/npm", {
            aliasTags: {
                "latest": "zowe-v1-lts"
            },
            smokeTest: true
        }],
        ["@octorelease/github", {
            checkPrLabels: true
        }],
        "@octorelease/git"
    ]
};
