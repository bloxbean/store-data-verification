import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciGovernanceRuleService } from "@api-common/service/yaci-governance-rule-service/yaci-governance-rule.service";
import { test } from "@playwright/test";

test.describe("@regression @governance-rule", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check get gov ratification result for update committee", async ({}) => {
    test.step("GIVEN: Retrieve get gov ratification result for update committee", async () => {
      let updateCommittee = await (
        await yaciGovernanceRuleService()
      ).getRatificationResultForUpdateCommitteeAction();

      await test.step("WHEN: Retrieve field", async () => {
        let update_committee = updateCommittee.map(
          (updateCommitteeDto) => updateCommitteeDto.update_committee
        );
        let expired_epoch = updateCommittee.map(
          (updateCommitteeDto) => updateCommitteeDto.expired_epoch
        );
        let spo_yes_vote_taken = updateCommittee.map(
          (updateCommitteeDto) => updateCommitteeDto.spo_yes_vote_taken
        );
        let spo_abstain_vote_taken = updateCommittee.map(
          (updateCommitteeDto) => updateCommitteeDto.spo_abstain_vote_taken
        );
        let spo_total_stake = updateCommittee.map(
          (updateCommitteeDto) => updateCommitteeDto.spo_total_stake
        );
        let drep_yes_vote_stake = updateCommittee.map(
          (updateCommitteeDto) => updateCommitteeDto.drep_yes_vote_stake
        );
        let drep_no_vote_stake = updateCommittee.map(
          (updateCommitteeDto) => updateCommitteeDto.drep_no_vote_stake
        );
        let cc_state = updateCommittee.map(
          (updateCommitteeDto) => updateCommitteeDto.cc_state
        );
        let last_enacted_gov_action_id = updateCommittee.map(
          (updateCommitteeDto) => updateCommitteeDto.last_enacted_gov_action_id
        );
        let is_action_ratification_delayed = updateCommittee.map(
          (updateCommitteeDto) =>
            updateCommitteeDto.is_action_ratification_delayed
        );
        let current_epoch_param = updateCommittee.map(
          (updateCommitteeDto) => updateCommitteeDto.current_epoch_param
        );

        await test.step("THEN: Field should not be null", async () => {
          Assertions.assertNotNull(
            update_committee,
            "field should not be null"
          );
          Assertions.assertNotNull(expired_epoch, "field should not be null");
          Assertions.assertNotNull(
            spo_yes_vote_taken,
            "field should not be null"
          );
          Assertions.assertNotNull(
            spo_abstain_vote_taken,
            "field should not be null"
          );
          Assertions.assertNotNull(spo_total_stake, "field should not be null");
          Assertions.assertNotNull(
            drep_yes_vote_stake,
            "field should not be null"
          );
          Assertions.assertNotNull(
            drep_no_vote_stake,
            "field should not be null"
          );
          Assertions.assertNotNull(cc_state, "field should not be null");
          Assertions.assertNotNull(
            last_enacted_gov_action_id,
            "field should not be null"
          );
          Assertions.assertNotNull(
            is_action_ratification_delayed,
            "field should not be null"
          );
          Assertions.assertNotNull(
            current_epoch_param,
            "field should not be null"
          );
        });
      });
    });
  });
});
