import { TimeOut } from "@integration-common/constants/project.constants";
import { Assertions } from "@integration-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@integration-common/helpers/misc/slack-notify.helper";
import { test } from "@playwright/test";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

test.describe("@regression @integration", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of create-node command", async ({}) => {
    test.step("GIVEN: Execute create-node command", async () => {
      let createNodeCommand = "create-node";
      let createNodeResult = await execPromise(createNodeCommand);

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) =>
          setTimeout(resolve, TimeOut.FIVE_SECONDS)
        ); // Wait for 5 seconds to simulate some processing time
      });

      await test.step("AND: Verify the command executed successfully", async () => {
        Assertions.assertNotNull(
          createNodeResult.stdout,
          "Command output should not be null."
        );
        Assertions.assertNotNull(
          createNodeResult.stderr,
          "Command error output should not be null."
        );
        Assertions.assertTrue(
          createNodeResult.stdout.includes("Node created successfully"),
          "The command should indicate that the node was created successfully."
        );
      });
    });
  });
});
