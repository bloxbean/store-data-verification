import { TimeOut } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @governance", () => {
  test("Check the logic of process of voting", async ({}) => {
    test.step("GIVEN: Retrieve vote information", async () => {
      let votesInformation = await (await yaciService()).getVotingProcedure();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve vote information after wait", async () => {
        let votesInformationAfterWait = await (await yaciService()).getVotingProcedure();

        await test.step("THEN: vote informationl should be different after wait ", () => {
          Assertions.assertNotEqual(
            votesInformation,
            votesInformationAfterWait,
            "Vote information should be different."
          );
        });
      });
    });
  });
});
