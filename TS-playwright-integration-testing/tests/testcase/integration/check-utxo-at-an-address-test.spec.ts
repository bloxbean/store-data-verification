import { TimeOut } from "@integration-common/constants/project.constants";
import Logger from "@integration-common/helpers/logger/logger.helper";
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

  test("Check the logic of create-node, default-addresses, and utxos commands with address extraction", async ({}) => {
    let extractedAddress: string | undefined;

    test.step("GIVEN: Execute create-node command", async () => {
      const createNodeCommand = "create-node -o --start";
      Logger.info(`Executing command: ${createNodeCommand}`);

      try {
        let createNodeResult = await execPromise(createNodeCommand);
        Logger.info(`Command executed successfully: ${createNodeCommand}`);

        await test.step("WHEN: Wait for a certain period of time", async () => {
          await new Promise((resolve) =>
            setTimeout(resolve, TimeOut.FIVE_SECONDS)
          );
          Logger.info("Waited for 5 seconds.");
        });

        await test.step("AND: Verify create-node command executed successfully", async () => {
          Assertions.assertNotNull(
            createNodeResult.stdout,
            "Command output should not be null."
          );
          Assertions.assertNotNull(
            createNodeResult.stderr,
            "Command error output should not be null."
          );
          Assertions.assertTrue(
            createNodeResult.stdout.includes("Node started successfully"),
            "The create-node command should indicate that the node was started successfully."
          );
          Logger.info("Verified that the node was started successfully.");
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          Logger.error(`Error executing create-node command: ${error.message}`);
          throw error;
        } else {
          Logger.error("An unknown error occurred");
          throw new Error("An unknown error occurred");
        }
      }
    });

    test.step("GIVEN: Execute default-addresses command", async () => {
      const defaultAddressesCommand = "default-addresses";
      Logger.info(`Executing command: ${defaultAddressesCommand}`);

      try {
        let defaultAddressesResult = await execPromise(defaultAddressesCommand);
        Logger.info(
          `Command executed successfully: ${defaultAddressesCommand}`
        );

        await test.step("WHEN: Wait for a certain period of time", async () => {
          await new Promise((resolve) =>
            setTimeout(resolve, TimeOut.FIVE_SECONDS)
          );
          Logger.info("Waited for 5 seconds.");
        });

        extractedAddress = defaultAddressesResult.stdout.trim();
        Logger.info(`Extracted address: ${extractedAddress}`);

        await test.step("AND: Verify default-addresses command executed successfully", async () => {
          Assertions.assertNotNull(
            defaultAddressesResult.stdout,
            "Command output should not be null."
          );
          Assertions.assertNotNull(
            defaultAddressesResult.stderr,
            "Command error output should not be null."
          );
          Assertions.assertTrue(
            defaultAddressesResult.stdout.includes(
              "Address retrieved successfully"
            ),
            "The default-addresses command should indicate success."
          );
          Logger.info(
            "Verified that the default addresses were retrieved successfully."
          );
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          Logger.error(
            `Error executing default-addresses command: ${error.message}`
          );
          throw error;
        } else {
          Logger.error("An unknown error occurred");
          throw new Error("An unknown error occurred");
        }
      }
    });

    if (extractedAddress) {
      test.step("GIVEN: Execute utxos command with extracted address", async () => {
        const utxosCommand = `utxos ${extractedAddress}`;
        Logger.info(`Executing command: ${utxosCommand}`);

        try {
          let utxosResult = await execPromise(utxosCommand);
          Logger.info(`Command executed successfully: ${utxosCommand}`);

          await test.step("WHEN: Wait for a certain period of time", async () => {
            await new Promise((resolve) =>
              setTimeout(resolve, TimeOut.FIVE_SECONDS)
            );
            Logger.info("Waited for 5 seconds.");
          });

          await test.step("AND: Verify utxos command executed successfully", async () => {
            Assertions.assertNotNull(
              utxosResult.stdout,
              "Command output should not be null."
            );
            Assertions.assertNotNull(
              utxosResult.stderr,
              "Command error output should not be null."
            );
            Assertions.assertTrue(
              utxosResult.stdout.includes("UTXO retrieved successfully"),
              "The utxos command should indicate success."
            );
            Logger.info("Verified that the UTXOs were retrieved successfully.");
          });
        } catch (error: unknown) {
          if (error instanceof Error) {
            Logger.error(`Error executing utxos command: ${error.message}`);
            throw error;
          } else {
            Logger.error("An unknown error occurred");
            throw new Error("An unknown error occurred");
          }
        }
      });
    } else {
      Logger.error(
        "No address extracted from default-addresses command. Skipping utxos command."
      );
    }
  });
});
