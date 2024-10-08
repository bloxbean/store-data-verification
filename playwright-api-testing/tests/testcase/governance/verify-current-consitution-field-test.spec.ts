import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Check the field of consitution", async ({}) => {
    test.step("GIVEN: Retrieve consitution information", async () => {
      let consitution = await (await yaciService()).getCurrentConsitution();

      await test.step("THEN: consitution information should not be null ", () => {
        consitution.forEach((consitutionDto) => {
          Assertions.assertNotNull(consitutionDto.active_epoch, "active_epoch should not be null");
          Assertions.assertNotNull(consitutionDto.anchor_hash, "anchor_hash should not be null");
          Assertions.assertNotNull(consitutionDto.anchor_url, "anchor_url should not be null");
          Assertions.assertNotNull(consitutionDto.script, "script should not be null");
        });
      });
    });
  });
});

test("Check the min and max of active epoch", async ({}) => {
  test.step("GIVEN: Retrieve consitution information", async () => {
    let consitution = await (await yaciService()).getCurrentConsitution();

    await test.step("WHEN: get the min max value of  active_epoch", async () => {
      let active_epoch = consitution.map((consitutionDto) => consitutionDto.active_epoch);
      let minActiveEpoch: number = active_epoch[0];
      let maxActiveEpoch: number = Math.max(...active_epoch);

      await test.step("THEN: Compare the value", async () => {
        Assertions.assertNotEqual(minActiveEpoch, maxActiveEpoch, "min and max value should not be equal");
      });
    });
  });
});
