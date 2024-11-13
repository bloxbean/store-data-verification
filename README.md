# Playwright Framework

Playwright TypeScript Automation Framework

## Playwright Introduction

- Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast. Headless execution is supported for all browsers on all platforms.
- As Playwright is written by the creators of the Puppeteer, you would find a lot of similarities between them.
- Playwright has its own test runner for end-to-end tests, we call it Playwright Test.
- Cross-browser. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox.
- Cross-platform. Test on Windows, Linux, and macOS, locally or on CI, headless or headed.
- Cross-language. Use the Playwright API in TypeScript, JavaScript, Python, .NET, Java. The core framework is implemented using TypeScript.
- Playwright development is sponsored by Microsoft.

[GitHub](https://github.com/microsoft/playwright)
[Documentation](https://playwright.dev/docs/intro)
[API reference](https://playwright.dev/docs/api/class-playwright/)
[Changelog](https://github.com/microsoft/playwright/releases)

# Playwright - Framework

This is an automation framework using Playwright written in TypeScript.

## Requirements

```
- Visual Code
- NodeJS version > 14 (Node.js 14 is no longer supported since it reached its end-of-life on April 30, 2023.)
- Playwright 1.32.3
```

# Getting Started

```
This is the quick and easy getting started assuming you already have git, Visual Code and NodeJS installed.
```

## Open project in Visual Code

```
- Launch Visual Code
- File -> Open Folder OR ctrl+K ctrl+O
- Select project root folder
```

## Install the required items

1. Install all required packages for project defined in the package.json file: Playwright, etc

```sh

Open Terminal window in Visual Code (ctrl + `) then execute command:
npm install

Or go to project root folder then open CMD windows and execute command:
npm install

```

2. Install Playwright Browsers

```sh

Open Terminal window in Visual Code (ctrl + `) then execute command:
npx playwright install

Or go to project root folder then open CMD windows and execute command:
npx playwright install

```

## Debug Tests

````sh
Debug
ENV=local npx playwright test --debug

## Run Tests

### Run tests on Chrome
please refer to script path in package.json


```sh
npm run test:local
npm run test:dev
````

run with trace on

```sh
npm run test:local-trace
npm run test:dev-trace
```

run smoke test on local machine

```sh
npm run smoke-test
```

run in preprod and mainnet

```sh
npm run test:mainnet
npm run test:preprod
```

## Deploy the automation framework as a standalone job

first we need to have a script to :

1. run the automation framework
2. generate Allure report
3. store the Allure report in a history file

```sh
#!/bin/bash


# Check the Docker build command and run the corresponding script
if [[ $1 == "yaci" ]]; then
  #sleep for 1 min for the build to finish
  sleep 1m

  # Set the working directory to the script repository
  cd /app/store-data-verification

  # navigate to the test folder
  cd /playwright-api-testing

  # Run the script then serve allure report
  npx playwright test --reporter=allure-playwright
  allure generate allure-results --clean -o playwright-api-testing/allure-report && allure serve playwright-api-testing/allure-results

  # Store allure reports somewhere
  cp -r allure-report/history/ allure-results

# Check the Docker  build command and run the corresponding script
elif [[ $1 == "ls" ]]; then
  #sleep for 1 min for the build to finish
  sleep 1m

  # Set the working directory to the script repository
  cd /app/cf-ls-sync-data-verification

  # navigate to the test folder
  cd /playwright-database-testing

  # Run the script then serve allure report
  npx playwright test --reporter=allure-playwright
  allure generate allure-results --clean -o playwright-database-testing/allure-report && allure serve playwright-database-testing/allure-results

  # Store allure reports somewhere
    cp -r allure-report/history/ allure-results

else
  echo "Invalid Docker build command. Please specify either 'yaci' or 'ls'."
  exit 1
fi
```

then we need a docker file to build and deploy the script

```sh
# Use a base image with Node.js and SSH client installed
FROM node:14

# Install SSH client and cron
RUN apt-get update && apt-get install -y openssh-client cron

# Set the working directory inside the container
WORKDIR /app

# Copy the SSH private key to the container
COPY id_rsa /root/.ssh/id_rsa

# Set the permissions for the SSH private key
RUN chmod 600 /root/.ssh/id_rsa

# Disable strict host key checking for SSH
RUN echo "StrictHostKeyChecking no" >> /etc/ssh/ssh_config

# Clone the script repository using SSH
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts && \
    git clone git@github.com:bloxbean/store-data-verification.git

# Set the working directory to the cloned repository
WORKDIR /app/store-data-verification

# Install dependencies using npm ci
RUN npm cache clean --force
RUN npm install --only=prod

# Copy the shell script to the container
COPY run-script.sh /usr/local/bin/run-script.sh

# Give execution rights to the script
RUN chmod +x /usr/local/bin/run-script.sh

# Add cron job to run the script every 1 hour
RUN echo "0 * * * * /usr/local/bin/run-script.sh >> /var/log/cron.log 2>&1" | crontab -

# Run cron in the foreground
CMD ["cron", "-f"]

# Add cron job to run the script at midnight UTC+0
RUN echo "0 0 * * * /usr/local/bin/run-script.sh >> /var/log/cron.log 2>&1" | crontab -

# Run cron in the foreground
CMD ["cron", "-f"]
```

## Export a report into a pdf file

first we need to have a script to :

1. run the automation framework
2. generate Playwright report
3. store the playwright report somewhere
4. then we use this command to export the report
5. WARNING : because Allure report is a web-server host report and it got multi layer so it cannot be export in a PDF file

```sh
npm run export-pdf
```

## Slack notify

first we need to create a slack-notify helper :

```typescript
import axios from "axios";

const SLACK_WEBHOOK_URL = "YOU_DESIRE_WEBHOOK_URL";

export const sendSlackNotification = async (message: string) => {
  try {
    await axios.post(SLACK_WEBHOOK_URL, {
      text: message,
    });
    console.log("Notification sent to Slack successfully");
  } catch (error) {
    console.error("Error sending notification to Slack:", error);
  }
};
```

then we import it to your test and make it to run after a test have run and that test is failed :

```typescript
// This will run after each test
test.afterEach(async ({}, testInfo) => {
  if (testInfo.status === "failed") {
    await sendSlackNotification(`Test failed: ${testInfo.title}`);
  }
});
```
