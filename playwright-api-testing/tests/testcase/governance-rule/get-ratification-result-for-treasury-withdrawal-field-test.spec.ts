import { Assertions } from "@common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { yaciGovernanceRuleService } from "@common/service/yaci-governance-rule-service/yaci-governance-rule.service";
import { test } from "@playwright/test";

test.describe("@regression @governance-rule", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check get gov ratification result for treasury withdrawal", async ({}) => {
    test.step("GIVEN: Retrieve get gov ratification result for treasury withdrawal", async () => {
      let treasuryWithdrawal = await (
        await yaciGovernanceRuleService()
      ).getRatificationResultForTreasuryWithdrawalsAction();

      await test.step("WHEN: Retrieve field", async () => {
        let treasury_withdrawals_action = treasuryWithdrawal.map(
          (treasuryWithdrawalDto) =>
            treasuryWithdrawalDto.treasury_withdrawals_action
        );
        let expired_epoch = treasuryWithdrawal.map(
          (treasuryWithdrawalDto) => treasuryWithdrawalDto.expired_epoch
        );
        let spo_yes_vote_taken = treasuryWithdrawal.map(
          (treasuryWithdrawalDto) => treasuryWithdrawalDto.spo_yes_vote_taken
        );
        let spo_abstain_vote_taken = treasuryWithdrawal.map(
          (treasuryWithdrawalDto) =>
            treasuryWithdrawalDto.spo_abstain_vote_taken
        );
        let spo_total_stake = treasuryWithdrawal.map(
          (treasuryWithdrawalDto) => treasuryWithdrawalDto.spo_total_stake
        );
        let drep_yes_vote_stake = treasuryWithdrawal.map(
          (treasuryWithdrawalDto) => treasuryWithdrawalDto.drep_yes_vote_stake
        );
        let drep_no_vote_stake = treasuryWithdrawal.map(
          (treasuryWithdrawalDto) => treasuryWithdrawalDto.drep_no_vote_stake
        );
        let cc_state = treasuryWithdrawal.map(
          (treasuryWithdrawalDto) => treasuryWithdrawalDto.cc_state
        );
        let last_enacted_gov_action_id = treasuryWithdrawal.map(
          (treasuryWithdrawalDto) =>
            treasuryWithdrawalDto.last_enacted_gov_action_id
        );
        let is_action_ratification_delayed = treasuryWithdrawal.map(
          (treasuryWithdrawalDto) =>
            treasuryWithdrawalDto.is_action_ratification_delayed
        );
        let current_epoch_param = treasuryWithdrawal.map(
          (treasuryWithdrawalDto) => treasuryWithdrawalDto.current_epoch_param
        );

        await test.step("THEN: Field should not be null", async () => {
          Assertions.assertNotNull(
            treasury_withdrawals_action,
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
