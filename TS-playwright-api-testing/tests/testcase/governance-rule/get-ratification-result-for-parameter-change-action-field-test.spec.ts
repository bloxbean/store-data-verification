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

  test("Check get gov ratification result for parameter change", async ({}) => {
    test.step("GIVEN: Retrieve get gov ratification result for parameter change", async () => {
      let parameterChange = await (
        await yaciGovernanceRuleService()
      ).getRatificationResultForParameterChangeAction();

      await test.step("WHEN: Retrieve field", async () => {
        let parameter_change_action = parameterChange.map(
          (parameterChangeDto) => parameterChangeDto.parameter_change_action
        );
        let expired_epoch = parameterChange.map(
          (parameterChangeDto) => parameterChangeDto.expired_epoch
        );
        let spo_yes_vote_taken = parameterChange.map(
          (parameterChangeDto) => parameterChangeDto.spo_yes_vote_taken
        );
        let spo_abstain_vote_taken = parameterChange.map(
          (parameterChangeDto) => parameterChangeDto.spo_abstain_vote_taken
        );
        let spo_total_stake = parameterChange.map(
          (parameterChangeDto) => parameterChangeDto.spo_total_stake
        );
        let drep_yes_vote_stake = parameterChange.map(
          (parameterChangeDto) => parameterChangeDto.drep_yes_vote_stake
        );
        let drep_no_vote_stake = parameterChange.map(
          (parameterChangeDto) => parameterChangeDto.drep_no_vote_stake
        );
        let cc_state = parameterChange.map(
          (parameterChangeDto) => parameterChangeDto.cc_state
        );
        let last_enacted_gov_action_id = parameterChange.map(
          (parameterChangeDto) => parameterChangeDto.last_enacted_gov_action_id
        );
        let is_action_ratification_delayed = parameterChange.map(
          (parameterChangeDto) =>
            parameterChangeDto.is_action_ratification_delayed
        );
        let current_epoch_param = parameterChange.map(
          (parameterChangeDto) => parameterChangeDto.current_epoch_param
        );

        await test.step("THEN: Field should not be null", async () => {
          Assertions.assertNotNull(
            parameter_change_action,
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
