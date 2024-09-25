import { TimeOut } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Check the logic of process consitution", async ({}) => {
    test.step("GIVEN: Retrieve consitution information", async () => {
      let consitutionInformation = await (await yaciService()).getCurrentConsitution();

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, TimeOut.FIVE_SECONDS)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve consitution information after wait", async () => {
        let consitutionInformationAfterWait = await (await yaciService()).getCurrentConsitution();

        await test.step("THEN: consitution information should be different after wait ", () => {
          Assertions.assertNotEqual(
            consitutionInformation,
            consitutionInformationAfterWait,
            "consitution information should be different."
          );
        });
      });
    });
  });
});
