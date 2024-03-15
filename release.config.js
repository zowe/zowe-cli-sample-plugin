module.exports = {
    branches: [
        {
            name: "master",
            level: "minor"
        },
        {
            name: "zowe-v?-lts",
            level: "patch"
        },
        {
            name: "next",
            level: "none",
            prerelease: true
        }
    ],
    plugins: [
        "@octorelease/changelog",
        ["@octorelease/npm", {
            aliasTags: {
                "latest": ["zowe-v2-lts"]
            },
            smokeTest: true
        }],
        ["@octorelease/github", {
            checkPrLabels: true
        }],
        "@octorelease/git"
    ]
};
