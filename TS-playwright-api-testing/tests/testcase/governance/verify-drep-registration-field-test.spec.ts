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

  test("Check the logic of process a drep registration", async ({}) => {
    test.step("GIVEN: Retrieve drep registration", async () => {
      let drepRegistration = await (await yaciService()).getDrepRegistrations();

      await test.step("THEN: drep registration should be different after wait ", () => {
        drepRegistration.forEach((drepRegistrationDto) => {
          Assertions.assertNotNull(
            drepRegistrationDto.block_number,
            "block_number should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.block_time,
            "block_time should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.tx_hash,
            "tx_hash should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.cert_index,
            "cert_index should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.slot,
            "slot should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.drep_hash,
            "drep_hash should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.drep_id,
            "drep_id should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.cred_type,
            "cred_type should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.epoch,
            "epoch should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.type,
            "type should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.deposit,
            "deposit should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.anchor_url,
            "anchor_url should not be null"
          );
          Assertions.assertNotNull(
            drepRegistrationDto.anchor_hash,
            "anchor_hash should not be null"
          );
        });
      });
    });
  });
});
