import { test, expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { koiosService } from "@common/service/koios_api_service/koios.service";
import { yaciService } from "@common/service/yaci_api_service/yaci.service";

test.describe("@block", () => {
  test("Check the logic of process a new block", async ({}) => {
    test.step("GIVEN: Retrieve block list", async () => {
      let blockListKoios = await (await koiosService()).getBlockList();
      let blockListYaci = await (await yaciService()).getBlockList();

      await test.step("THEN: Compare block list information", () => {
        Assertions.assertEqual(blockListKoios, blockListYaci, "Block information should be equal.");
      });

      await test.step("WHEN: Wait for a certain period of time", async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
      });

      await test.step("AND: Retrieve block information after wait", async () => {
        let blockListKoiosAfterWait = await (await koiosService()).getBlockList();
        let blockListYaciAfterWait = await (await yaciService()).getBlockList();

        await test.step("THEN: Compare block list information after wait", () => {
          Assertions.assertEqual(blockListKoiosAfterWait, blockListYaciAfterWait, "Block information should be equal.");
        });

        await test.step("THEN: Block information should be different after wait ", () => {
          Assertions.assertNotEqual(blockListKoios, blockListKoiosAfterWait, "Block information should be different.");
          Assertions.assertNotEqual(blockListYaci, blockListYaciAfterWait, "Block information should be different.");
          Assertions.assertNotEqual(blockListKoios, blockListYaciAfterWait, "Block information should be different.");
          Assertions.assertNotEqual(blockListYaci, blockListKoiosAfterWait, "Block information should be different.");
        });
      });
    });
  });
});
