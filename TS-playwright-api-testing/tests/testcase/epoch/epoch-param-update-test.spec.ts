import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { DataGenerator } from "@api-common/helpers/misc/data-generator.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { koiosService } from "@api-common/service/koios-api-service/koios.service";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @epoch", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of epoch parameter", async ({}) => {
    test.step("GIVEN: Retrieve epoch parameter", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 9);
      let epochParameterKoios = await (
        await koiosService()
      ).getEpochParameter(randomNumber);
      let epochParameterYaci = await (
        await yaciService()
      ).getEpochParameter(randomNumber);

      await test.step("THEN: Compare epoch parameter information", () => {
        Assertions.assertEqual(
          epochParameterKoios,
          epochParameterYaci,
          "epoch information should be equal."
        );
      });

      await test.step("WHEN: Get latest epoch parameter", async () => {
        let latestEpochParameterYaci = await (
          await yaciService()
        ).getLatestEpochParameters();

        await test.step("THEN: epoch param should be different ", () => {
          Assertions.assertNotEqual(
            latestEpochParameterYaci,
            epochParameterKoios,
            "epoch information should be different."
          );
          Assertions.assertNotEqual(
            latestEpochParameterYaci,
            epochParameterYaci,
            "epoch information should be different."
          );
        });
      });
    });
  });
});
