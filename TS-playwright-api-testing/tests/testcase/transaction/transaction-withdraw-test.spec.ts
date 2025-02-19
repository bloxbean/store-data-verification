import { StakeAddresses } from "@api-common/constants/project.constants";
import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { DataGenerator } from "@api-common/helpers/misc/data-generator.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @transaction", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("the withdraw processor in Yaci", async ({}) => {
    test.step("GIVEN: get withdraw list", async () => {
      let withdrawals = await (await yaciService()).getWithdrawals();

      await test.step("WHEN: get detail withdraws", async () => {
        let detailWithdrawals = await (
          await yaciService()
        ).getDetailWithdrawals(StakeAddresses.STAKE_ADDRESS_1);

        await test.step("THEN: Compare transaction information", () => {
          Assertions.assertJsonContain(
            detailWithdrawals,
            withdrawals,
            "withdraw list should contain witdraws information."
          );
        });
      });
    });
  });
});

test("the withdraw processor in Yaci if error happen", async ({}) => {
  test.step("GIVEN: get withdraw list", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let withdrawals = await (await yaciService()).getWithdrawals();

    await test.step("WHEN: get detail transaction", async () => {
      let detailWithdrawals = await (
        await yaciService()
      ).getDetailWithdrawals(randomNumber);

      await test.step("THEN: Compare transaction information", () => {
        Assertions.assertNotJsonContain(
          detailWithdrawals,
          withdrawals,
          "withdraw list should not contain witdraws information."
        );
      });
    });
  });
});
