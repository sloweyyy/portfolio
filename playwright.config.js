const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./tests/playwright",
    timeout: 90_000,
    expect: {
        timeout: 10_000,
    },
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: [["list"]],
    use: {
        baseURL: "http://127.0.0.1:3000",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },
    projects: [
        {
            name: "desktop",
            use: {
                browserName: "chromium",
                viewport: { width: 1440, height: 900 },
            },
        },
        {
            name: "mobile",
            use: {
                browserName: "chromium",
                viewport: { width: 390, height: 844 },
            },
        },
    ],
    webServer: {
        command: "npm run dev",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: true,
        timeout: 180_000,
    },
});
