import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Check the logic of process of voting", async ({}) => {
    test.step("GIVEN: Retrieve vote information", async () => {
      let votesInformation = await (await yaciService()).getVotingProcedure();

      await test.step("THEN: governance committee registration field should not be null ", () => {
        votesInformation.forEach((votesInformationDto) => {
          Assertions.assertNotNull(votesInformationDto.block_number, "block_number should not be null");
          Assertions.assertNotNull(votesInformationDto.block_time, "block_time should not be null");
          Assertions.assertNotNull(votesInformationDto.tx_hash, "tx_hash should not be null");
          Assertions.assertNotNull(votesInformationDto.id, "id should not be null");
          Assertions.assertNotNull(votesInformationDto.slot, "slot should not be null");
          Assertions.assertNotNull(votesInformationDto.epoch, "epoch should not be null");
          Assertions.assertNotNull(votesInformationDto.index, "index should not be null");
          Assertions.assertNotNull(votesInformationDto.slot, "slot should not be null");
          Assertions.assertNotNull(votesInformationDto.voter_type, "voter_type should not be null");
          Assertions.assertNotNull(votesInformationDto.voter_hash, "voter_hash should not be null");
          Assertions.assertNotNull(votesInformationDto.gov_action_tx_hash, "gov_action_tx_hash should not be null");
          Assertions.assertNotNull(votesInformationDto.gov_action_index, "gov_action_index should not be null");
          Assertions.assertNotNull(votesInformationDto.vote, "vote should not be null");
          Assertions.assertNotNull(votesInformationDto.anchor_url, "anchor_url should not be null");
          Assertions.assertNotNull(votesInformationDto.anchor_hash, "anchor_hash should not be null");
          Assertions.assertNotNull(votesInformationDto.drep_id, "drep_id should not be null");
        });
      });
    });
  });
});
