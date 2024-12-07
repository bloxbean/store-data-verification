import { TimeOut } from "@integration-common/constants/project.constants";
import { Assertions } from "@integration-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@integration-common/helpers/misc/slack-notify.helper";
import { test } from "@playwright/test";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec); // Using promisify to handle async exec

test.describe("@regression @integration", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of create-node command with different eras", async ({}) => {
    // Array of era options to run commands for
    const eras = ["conway", "babbage"];

    for (let era of eras) {
      test.step(`GIVEN: Execute create-node command with era ${era}`, async () => {
        let createNodeCommand = `create-node -o --era ${era}`;

        let createNodeResult = await execPromise(createNodeCommand);

        await test.step("WHEN: Wait for a certain period of time", async () => {
          await new Promise((resolve) =>
            setTimeout(resolve, TimeOut.FIVE_SECONDS)
          ); // Wait for 5 seconds to simulate some processing time
        });

        await test.step(`AND: Verify the command executed successfully for era ${era}`, async () => {
          Assertions.assertNotNull(
            createNodeResult.stdout,
            "Command output should not be null."
          );
          Assertions.assertNotNull(
            createNodeResult.stderr,
            "Command error output should not be null."
          );

          Assertions.assertTrue(
            createNodeResult.stdout.includes("Node created successfully"), // Replace with the actual success message
            `The command for era ${era} should indicate that the node was created successfully.`
          );
        });
      });
    }
  });
});
