import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression  @governance", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of process a governance action proposal", async ({}) => {
    test.step("GIVEN: Retrieve governance action proposal", async () => {
      let governanceActionProposals = await (
        await yaciService()
      ).getGovernanceActionProposals();

      await test.step("THEN: governance action proposal should not be null ", () => {
        governanceActionProposals.forEach((governanceActionProposalsDto) => {
          Assertions.assertNotNull(
            governanceActionProposalsDto.block_number,
            "block_number should not be null"
          );
          Assertions.assertNotNull(
            governanceActionProposalsDto.block_time,
            "block_time should not be null"
          );
          Assertions.assertNotNull(
            governanceActionProposalsDto.tx_hash,
            "tx_hash should not be null"
          );
          Assertions.assertNotNull(
            governanceActionProposalsDto.index,
            "index should not be null"
          );
          Assertions.assertNotNull(
            governanceActionProposalsDto.slot,
            "slot should not be null"
          );
          Assertions.assertNotNull(
            governanceActionProposalsDto.epoch,
            "epoch should not be null"
          );
          Assertions.assertNotNull(
            governanceActionProposalsDto.type,
            "type should not be null"
          );
          Assertions.assertNotNull(
            governanceActionProposalsDto.deposit,
            "deposit should not be null"
          );
          Assertions.assertNotNull(
            governanceActionProposalsDto.anchor_url,
            "anchor_url should not be null"
          );
          Assertions.assertNotNull(
            governanceActionProposalsDto.anchor_hash,
            "anchor_hash should not be null"
          );
          Assertions.assertNotNull(
            governanceActionProposalsDto.return_address,
            "anchor_url should not be null"
          );
          Assertions.assertNotNull(
            governanceActionProposalsDto.details,
            "anchor_hash should not be null"
          );
        });
      });
    });
  });
});
