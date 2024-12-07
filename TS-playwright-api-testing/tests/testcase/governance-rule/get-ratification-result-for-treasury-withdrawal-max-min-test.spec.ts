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

  test("Check get gov ratification result for treasury withdrawal", async ({}) => {
    test.step("GIVEN: Retrieve get gov ratification result for treasury withdrawal", async () => {
      let treasuryWithdrawal = await (
        await yaciGovernanceRuleService()
      ).getRatificationResultForTreasuryWithdrawalsAction();

      await test.step("WHEN: Retrieve field", async () => {
        const fields = [
          {
            name: "treasury_withdrawals_action",
            values: treasuryWithdrawal.map(
              (treasuryWithdrawalDto) =>
                treasuryWithdrawalDto.treasury_withdrawals_action
            ),
          },
          {
            name: "expired_epoch",
            values: treasuryWithdrawal.map(
              (treasuryWithdrawalDto) => treasuryWithdrawalDto.expired_epoch
            ),
          },
          {
            name: "spo_yes_vote_taken",
            values: treasuryWithdrawal.map(
              (treasuryWithdrawalDto) =>
                treasuryWithdrawalDto.spo_yes_vote_taken
            ),
          },
          {
            name: "spo_abstain_vote_taken",
            values: treasuryWithdrawal.map(
              (treasuryWithdrawalDto) =>
                treasuryWithdrawalDto.spo_abstain_vote_taken
            ),
          },
          {
            name: "spo_total_stake",
            values: treasuryWithdrawal.map(
              (treasuryWithdrawalDto) => treasuryWithdrawalDto.spo_total_stake
            ),
          },
          {
            name: "drep_yes_vote_stake",
            values: treasuryWithdrawal.map(
              (treasuryWithdrawalDto) =>
                treasuryWithdrawalDto.drep_yes_vote_stake
            ),
          },
          {
            name: "drep_no_vote_stake",
            values: treasuryWithdrawal.map(
              (treasuryWithdrawalDto) =>
                treasuryWithdrawalDto.drep_no_vote_stake
            ),
          },
          {
            name: "cc_state",
            values: treasuryWithdrawal.map(
              (treasuryWithdrawalDto) => treasuryWithdrawalDto.cc_state
            ),
          },
          {
            name: "last_enacted_gov_action_id",
            values: treasuryWithdrawal.map(
              (treasuryWithdrawalDto) =>
                treasuryWithdrawalDto.last_enacted_gov_action_id
            ),
          },
          {
            name: "is_action_ratification_delayed",
            values: treasuryWithdrawal.map(
              (treasuryWithdrawalDto) =>
                treasuryWithdrawalDto.is_action_ratification_delayed
            ),
          },
          {
            name: "current_epoch_param",
            values: treasuryWithdrawal.map(
              (treasuryWithdrawalDto) =>
                treasuryWithdrawalDto.current_epoch_param
            ),
          },
        ];

        // Check if fields are not null
        await test.step("THEN: Field should not be null", async () => {
          fields.forEach((field) => {
            Assertions.assertNotNull(
              field.values,
              `${field.name} should not be null`
            );
          });
        });

        // Verify min and max values for each field
        fields.forEach((field) => {
          const numericValues = field.values.map((value) => {
            // Convert to number if value is a string
            const numericValue = Number(value);
            // Ensure it's a valid number (not NaN)
            if (isNaN(numericValue)) {
              throw new Error(`Invalid value for ${field.name}: ${value}`);
            }
            return numericValue;
          });

          const minValue = Math.min(...numericValues);
          const maxValue = Math.max(...numericValues);

          test.step(`THEN: Verify ${field.name} min and max values are not equal`, () => {
            Assertions.assertNotEqual(
              minValue,
              maxValue,
              `${field.name} min and max values should not be equal`
            );
          });
        });
      });
    });
  });
});
