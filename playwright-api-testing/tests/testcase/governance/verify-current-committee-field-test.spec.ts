import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Check the field of", async ({}) => {
    test.step("GIVEN: Retrieve committee information", async () => {
      let committeeInformation = await (await yaciService()).getCurrentCommitteeInfo();

      await test.step("THEN: committee information should be different after wait ", () => {
        committeeInformation.forEach((committeeInformationDto) => {
          Assertions.assertNotNull(committeeInformationDto.hash, "hash should not be null");
          Assertions.assertNotNull(committeeInformationDto.cred_type, "cred_type should not be null");
          Assertions.assertNotNull(committeeInformationDto.start_epoch, "start_epoch should not be null");
          Assertions.assertNotNull(committeeInformationDto.expired_epoch, "expired_epoch should not be null");
        });
      });
    });
  });
});
