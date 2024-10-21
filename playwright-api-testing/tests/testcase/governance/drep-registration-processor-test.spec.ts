import { TimeOut } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @governance", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of process a drep registration", async ({}) => {
    test.step("GIVEN: Retrieve drep registration", async () => {
      let drepRegistration = await (await yaciService()).getDrepRegistrations();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve drep registration after wait", async () => {
        let drepRegistrationAfterWait = await (await yaciService()).getDrepRegistrations();

        await test.step("THEN: drep registration should be different after wait ", () => {
          Assertions.assertNotEqual(
            drepRegistration,
            drepRegistrationAfterWait,
            "Drep registration should be different."
          );
        });
      });
    });
  });
});
