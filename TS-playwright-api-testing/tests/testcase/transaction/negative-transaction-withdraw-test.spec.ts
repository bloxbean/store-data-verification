import {
  Empty,
  Null,
  StakeAddresses,
} from "@api-common/constants/project.constants";
import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { DataGenerator } from "@api-common/helpers/misc/data-generator.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @transaction", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("the withdraw processor in Yaci if error happen -1", async ({}) => {
    test.step("GIVEN: get withdraw list", async () => {
      let detailWithdrawals = await (
        await yaciService()
      ).getDetailWithdrawals(StakeAddresses.FAULT_STAKE_ADDRESS);

      await test.step("THEN: withdraw should be null", () => {
        Assertions.assertNull(detailWithdrawals, "withdraw should be null.");
      });
    });
  });
});

test("the withdraw processor in Yaci if error happen -2", async ({}) => {
  test.step("GIVEN: get detail withdrawal", async () => {
    const randomNumber = DataGenerator.generateRandomNumber(1, 9);
    let detailWithdrawals = await (
      await yaciService()
    ).getDetailWithdrawals(randomNumber);

    await test.step("THEN: withdraw should be null", () => {
      Assertions.assertNull(detailWithdrawals, "withdraw should be null.");
    });
  });
});

test("the withdraw processor in Yaci if error happen -3", async ({}) => {
  test.step("GIVEN: get withdraw list", async () => {
    let detailWithdrawals = await (
      await yaciService()
    ).getDetailWithdrawals(Empty.EMPTY);

    await test.step("THEN: withdraw should be null", () => {
      Assertions.assertNull(detailWithdrawals, "withdraw should be null.");
    });
  });
});

test("the withdraw processor in Yaci if error happen -4", async ({}) => {
  test.step("GIVEN: get withdraw list", async () => {
    let detailWithdrawals = await (
      await yaciService()
    ).getDetailWithdrawals(Null.NULL);

    await test.step("THEN: withdraw should be null", () => {
      Assertions.assertNull(detailWithdrawals, "withdraw should be null.");
    });
  });
});
