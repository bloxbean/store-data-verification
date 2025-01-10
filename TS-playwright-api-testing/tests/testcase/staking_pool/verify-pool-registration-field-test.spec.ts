import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { DataGenerator } from "@api-common/helpers/misc/data-generator.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @pool", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the pool registration information in Yaci and Koios", async ({}) => {
    test.step("GIVEN: Retrieve pool information", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 999);
      let poolInformationYaci = await (
        await yaciService()
      ).getPoolRegistration(randomNumber);

      await test.step(`THEN: Verify fields in pool information  are not null`, () => {
        poolInformationYaci.forEach((poolInformationYaciDto) => {
          Assertions.assertNotNull(
            poolInformationYaciDto.block_number,
            "block_number should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.block_time,
            "block_time should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.cert_index,
            "cert_index should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.pool_id,
            "pool_id should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.vrf_key_hash,
            "vrf_key_hash should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.pledge,
            "pledge should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.cost,
            "cost should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.margin,
            "margin should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.reward_account,
            "reward_account should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.pool_owners,
            "pool_owners should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.relays,
            "relays should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.metadata_url,
            "metadata_url should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.metadata_hash,
            "metadata_hash should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.epoch,
            "epoch should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.slot,
            "slot should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.block_hash,
            "block_hash should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.reward_account_bech32,
            "reward_account_bech32 should not be null"
          );
          Assertions.assertNotNull(
            poolInformationYaciDto.pool_id_bech32,
            "pool_id_bech32 should not be null"
          );
        });
      });
    });
  });
});
