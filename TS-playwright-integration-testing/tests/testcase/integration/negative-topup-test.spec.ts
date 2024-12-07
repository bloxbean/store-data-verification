import { TimeOut } from "@integration-common/constants/project.constants";
import Logger from "@integration-common/helpers/logger/logger.helper";
import { Assertions } from "@integration-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@integration-common/helpers/misc/slack-notify.helper";
import { test } from "@playwright/test";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

test.describe("@regression @integration", () => {
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of create-node, default-addresses, utxos, and topup commands", async ({}) => {
    let extractedAddress: string | undefined;
    let adaValue: string;

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

    if (!extractedAddress) {
      Logger.error(
        "No address extracted from default-addresses command. Skipping subsequent steps."
      );
      return; // If the address is not defined, exit early
    }

    const testCases = [
      {
        description: "Negative ADA value",
        address: extractedAddress,
        adaValue: "-100",
      },
      {
        description: "False address",
        address: "SomeTextBeforeAddress" + extractedAddress, // Simulate a false address
        adaValue: "100",
      },
      {
        description: "Negative ADA value and false address",
        address: "SomeTextBeforeAddress" + extractedAddress, // Simulate a false address
        adaValue: "-100",
      },
    ];

    for (const testCase of testCases) {
      test.step(`GIVEN: Execute topup command with ${testCase.description}`, async () => {
        const { address, adaValue } = testCase;
        const topupCommand = `topup ${address} ${adaValue}`;
        Logger.info(`Executing command: ${topupCommand}`);

        try {
          let topupResult = await execPromise(topupCommand);
          Logger.info(`Command executed successfully: ${topupCommand}`);

          await test.step("WHEN: Wait for a certain period of time", async () => {
            await new Promise((resolve) =>
              setTimeout(resolve, TimeOut.FIVE_SECONDS)
            );
            Logger.info("Waited for 5 seconds.");
          });

          await test.step("AND: Verify topup command executed successfully", async () => {
            Assertions.assertNotNull(
              topupResult.stdout,
              "Command output should not be null."
            );
            Assertions.assertNotNull(
              topupResult.stderr,
              "Command error output should not be null."
            );
            if (parseFloat(adaValue) < 0) {
              Assertions.assertTrue(
                topupResult.stdout.includes(
                  "Error: ADA value cannot be negative"
                ),
                "The topup command should indicate an error for negative ADA values."
              );
            } else if (address.includes("SomeTextBeforeAddress")) {
              Assertions.assertTrue(
                topupResult.stdout.includes("Error: Invalid address format"),
                "The topup command should indicate an error for invalid address format."
              );
            } else {
              Assertions.assertTrue(
                topupResult.stdout.includes("Top-up successful"),
                "The topup command should indicate success."
              );
              Logger.info("Verified that the top-up was successful.");
            }
          });
        } catch (error: unknown) {
          if (error instanceof Error) {
            Logger.error(`Error executing topup command: ${error.message}`);
            throw error;
          } else {
            Logger.error("An unknown error occurred");
            throw new Error("An unknown error occurred");
          }
        }
      });
    }
  });
});
