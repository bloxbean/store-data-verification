import { TimeOut } from "@api-common/constants/project.constants";
import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of process committee", async ({}) => {
    test.step("GIVEN: Retrieve committee information", async () => {
      let committeeInformation = await (
        await yaciService()
      ).getCurrentCommitteeInfo();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) =>
          setTimeout(resolve, TimeOut.FIVE_SECONDS)
        ); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve committee information after wait", async () => {
        let committeeInformationAfterWait = await (
          await yaciService()
        ).getCurrentCommitteeInfo();

        await test.step("THEN: committee information should be different after wait ", () => {
          Assertions.assertNotEqual(
            committeeInformation,
            committeeInformationAfterWait,
            "committee information should be different."
          );
        });
      });
    });
  });
});
