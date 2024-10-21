import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @block", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the rollback process", async ({}) => {
    test.step("GIVEN: Retrieve block latest information", async () => {
      let blockInformation = await (await yaciService()).getBlockLatestInformation();

      await test.step("WHEN: Get block information", async () => {
        let number = blockInformation.map((blockInformationDto) => blockInformationDto.number);
        let time = blockInformation.map((blockInformationDto) => blockInformationDto.time);
        let height = blockInformation.map((blockInformationDto) => blockInformationDto.height);
        let slot = blockInformation.map((blockInformationDto) => blockInformationDto.slot);
        let hash = blockInformation.map((blockInformationDto) => blockInformationDto.hash);
        let epoch = blockInformation.map((blockInformationDto) => blockInformationDto.epoch);
        let era = blockInformation.map((blockInformationDto) => blockInformationDto.era);
        let epoch_slot = blockInformation.map((blockInformationDto) => blockInformationDto.epoch_slot);
        let slot_leader = blockInformation.map((blockInformationDto) => blockInformationDto.slot_leader);
        let size = blockInformation.map((blockInformationDto) => blockInformationDto.size);
        let tx_count = blockInformation.map((blockInformationDto) => blockInformationDto.tx_count);
        let output = blockInformation.map((blockInformationDto) => blockInformationDto.output);
        let fees = blockInformation.map((blockInformationDto) => blockInformationDto.fees);
        let block_vrf = blockInformation.map((blockInformationDto) => blockInformationDto.block_vrf);
        let op_cert = blockInformation.map((blockInformationDto) => blockInformationDto.op_cert);
        let op_cert_counter = blockInformation.map((blockInformationDto) => blockInformationDto.op_cert_counter);
        let op_cert_sigma = blockInformation.map((blockInformationDto) => blockInformationDto.op_cert_sigma);
        let previous_block = blockInformation.map((blockInformationDto) => blockInformationDto.previous_block);
        let issuer_vkey = blockInformation.map((blockInformationDto) => blockInformationDto.issuer_vkey);
        let nonce_vrf = blockInformation.map((blockInformationDto) => blockInformationDto.nonce_vrf);
        let leader_vrf = blockInformation.map((blockInformationDto) => blockInformationDto.leader_vrf);
        let vrf_result = blockInformation.map((blockInformationDto) => blockInformationDto.vrf_result);
        let block_body_hash = blockInformation.map((blockInformationDto) => blockInformationDto.block_body_hash);
        let protocol_version = blockInformation.map((blockInformationDto) => blockInformationDto.protocol_version);

        await test.step("THEN: Verify block information is not null", async () => {
          Assertions.assertNotNull(number, "field should not be null");
          Assertions.assertNotNull(time, "field should not be null");
          Assertions.assertNotNull(height, "field should not be null");
          Assertions.assertNotNull(slot, "field should not be null");
          Assertions.assertNotNull(epoch, "field should not be null");
          Assertions.assertNotNull(hash, "field should not be null");
          Assertions.assertNotNull(era, "field should not be null");
          Assertions.assertNull(nonce_vrf, "field should be null");
          Assertions.assertNull(leader_vrf, "field should be null");
          Assertions.assertNotNull(epoch_slot, "field should not be null");
          Assertions.assertNotNull(slot_leader, "field should not be null");
          Assertions.assertNotNull(size, "field should not be null");
          Assertions.assertNotNull(tx_count, "field should not be null");
          Assertions.assertNotNull(output, "field should not be null");
          Assertions.assertNotNull(fees, "field should not be null");
          Assertions.assertNotNull(block_vrf, "field should not be null");
          Assertions.assertNotNull(op_cert, "field should not be null");
          Assertions.assertNotNull(op_cert_counter, "field should not be null");
          Assertions.assertNotNull(op_cert_sigma, "field should not be null");
          Assertions.assertNotNull(previous_block, "field should not be null");
          Assertions.assertNotNull(issuer_vkey, "field should not be null");
          Assertions.assertNotNull(vrf_result, "field should not be null");
          Assertions.assertNotNull(block_body_hash, "field should not be null");
          Assertions.assertNotNull(protocol_version, "field should not be null");
        });
      });
    });
  });
});
