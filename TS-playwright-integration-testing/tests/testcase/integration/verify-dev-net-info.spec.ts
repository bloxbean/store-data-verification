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

  test("Check the logic of create-node and info commands", async ({}) => {
    const commands = ["create-node -o --start", "info"];

    for (let command of commands) {
      test.step(`GIVEN: Execute command: ${command}`, async () => {
        let commandResult = await execPromise(command);

        await test.step("WHEN: Wait for a certain period of time", async () => {
          await new Promise((resolve) =>
            setTimeout(resolve, TimeOut.FIVE_SECONDS)
          );
        });

        await test.step("AND: Verify the command executed successfully", async () => {
          Assertions.assertNotNull(
            commandResult.stdout,
            "Command output should not be null."
          );
          Assertions.assertNotNull(
            commandResult.stderr,
            "Command error output should not be null."
          );

          if (command === "create-node -o --start") {
            Assertions.assertTrue(
              commandResult.stdout.includes("Node started successfully"),
              "The command should indicate that the node was started successfully."
            );
          } else if (command === "info") {
            Assertions.assertTrue(
              commandResult.stdout.includes("info"),
              "The stop command should indicate success."
            );
          }
        });
      });
    }
  });
});
