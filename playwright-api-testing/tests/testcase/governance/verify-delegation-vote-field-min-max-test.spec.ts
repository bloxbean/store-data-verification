import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Check the logic of process a new delegation vote", async ({}) => {
    test.step("GIVEN: Retrieve delegation vote", async () => {
      let delegationVote = await (await yaciService()).getDelegationVotes();

      await test.step("WHEN: verify delegation vote field ", () => {
        let fields = [
          { name: "block_number", values: delegationVote.map((delegationVoteDto) => delegationVoteDto.block_number) },
          { name: "block_time", values: delegationVote.map((delegationVoteDto) => delegationVoteDto.block_time) },
          { name: "cert_index", values: delegationVote.map((delegationVoteDto) => delegationVoteDto.cert_index) },
          { name: "slot", values: delegationVote.map((delegationVoteDto) => delegationVoteDto.slot) },
          { name: "drep_type", values: delegationVote.map((delegationVoteDto) => delegationVoteDto.drep_type) },
          { name: "cred_type", values: delegationVote.map((delegationVoteDto) => delegationVoteDto.cred_type) },
          { name: "epoch", values: delegationVote.map((delegationVoteDto) => delegationVoteDto.epoch) },
        ];

        fields.forEach(async (field) => {
          let minValue = Math.min(...field.values);
          let maxValue = Math.max(...field.values);

          await test.step(`THEN: Verify ${field.name} min and max values are not equal`, () => {
            Assertions.assertNotEqual(minValue, maxValue, `${field.name} min and max values should not be equal`);
          });
        });
      });
    });
  });
});
