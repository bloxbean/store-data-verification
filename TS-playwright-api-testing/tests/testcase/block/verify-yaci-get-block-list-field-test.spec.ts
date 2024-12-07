import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @block", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the logic of process a new block", async ({}) => {
    test.step("GIVEN: Retrieve block list", async () => {
      let blockListYaci = await (await yaciService()).getBlockList();

      await test.step("WHEN: Retrieve block list information", async () => {
        let time = blockListYaci.map(
          (blockListYaciDto) => blockListYaciDto.time
        );
        let number = blockListYaci.map(
          (blockListYaciDto) => blockListYaciDto.number
        );
        let slot = blockListYaci.map(
          (blockListYaciDto) => blockListYaciDto.slot
        );
        let epoch = blockListYaci.map(
          (blockListYaciDto) => blockListYaciDto.epoch
        );
        let era = blockListYaci.map((blockListYaciDto) => blockListYaciDto.era);
        let output = blockListYaci.map(
          (blockListYaciDto) => blockListYaciDto.output
        );
        let fees = blockListYaci.map(
          (blockListYaciDto) => blockListYaciDto.fees
        );
        let slot_leader = blockListYaci.map(
          (blockListYaciDto) => blockListYaciDto.slot_leader
        );
        let size = blockListYaci.map(
          (blockListYaciDto) => blockListYaciDto.size
        );
        let tx_count = blockListYaci.map(
          (blockListYaciDto) => blockListYaciDto.tx_count
        );
        let issuer_vkey = blockListYaci.map(
          (blockListYaciDto) => blockListYaciDto.issuer_vkey
        );

        await test.step("THEN: block list should not be null", () => {
          Assertions.assertNotNull(number, "field should not be null");
          Assertions.assertNotNull(time, "field should not be null");
          Assertions.assertNotNull(slot, "field should not be null");
          Assertions.assertNotNull(epoch, "field should not be null");
          Assertions.assertNotNull(era, "field should not be null");
          Assertions.assertNotNull(slot_leader, "field should not be null");
          Assertions.assertNotNull(size, "field should not be null");
          Assertions.assertNotNull(tx_count, "field should not be null");
          Assertions.assertNotNull(output, "field should not be null");
          Assertions.assertNotNull(fees, "field should not be null");
          Assertions.assertNotNull(issuer_vkey, "field should not be null");
        });
      });
    });
  });
});
