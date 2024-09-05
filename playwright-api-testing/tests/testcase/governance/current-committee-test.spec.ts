import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { TimeOut } from "@common/constants/project.constants";

test.describe("@regression @governance", () => {
  test("Check the logic of process committee", async ({}) => {
    test.step("GIVEN: Retrieve committee information", async () => {
      let committeeInformation = await (await yaciService()).getCurrentCommitteeInfo();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve committee information after wait", async () => {
        let committeeInformationAfterWait = await (await yaciService()).getCurrentCommitteeInfo();

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
