import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Check the logic of process a new delegation vote", async ({}) => {
    test.step("GIVEN: Retrieve delegation vote", async () => {
      let delegationVote = await (await yaciService()).getDelegationVotes();

      await test.step("THEN: verify delegation vote field ", () => {
        delegationVote.forEach((delegationVoteDto) => {
          Assertions.assertNotNull(delegationVoteDto.block_number, "block_number should not be null");
          Assertions.assertNotNull(delegationVoteDto.block_time, "block_time should not be null");
          Assertions.assertNotNull(delegationVoteDto.tx_hash, "tx_hash should not be null");
          Assertions.assertNotNull(delegationVoteDto.cert_index, "cert_index should not be null");
          Assertions.assertNotNull(delegationVoteDto.slot, "slot should not be null");
          Assertions.assertNotNull(delegationVoteDto.address, "address should not be null");
          Assertions.assertNotNull(delegationVoteDto.drep_hash, "drep_hash should not be null");
          Assertions.assertNotNull(delegationVoteDto.drep_id, "drep_id should not be null");
          Assertions.assertNotNull(delegationVoteDto.drep_type, "drep_type should not be null");
          Assertions.assertNotNull(delegationVoteDto.credential, "credential should not be null");
          Assertions.assertNotNull(delegationVoteDto.cred_type, "cred_type should not be null");
          Assertions.assertNotNull(delegationVoteDto.epoch, "epoch should not be null");
        });
      });
    });
  });
});
