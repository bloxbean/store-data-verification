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

  test("Check get gov action ratifier", async ({}) => {
    test.step("GIVEN: Retrieve gov action ratifier", async () => {
      let govActionRatifier = await (
        await yaciGovernanceRuleService()
      ).getGovActionRatifier();

      await test.step("WHEN: Retrieve gov action ratifier fields", async () => {
        const fields = [
          {
            name: "gov_action",
            values: govActionRatifier.map((dto) => dto.gov_action),
          },
          {
            name: "expired_epoch",
            values: govActionRatifier.map((dto) => dto.expired_epoch),
          },
          {
            name: "cc_yes_vote",
            values: govActionRatifier.map((dto) => dto.cc_yes_vote),
          },
          {
            name: "cc_no_vote",
            values: govActionRatifier.map((dto) => dto.cc_no_vote),
          },
          {
            name: "cc_threshold",
            values: govActionRatifier.map((dto) => dto.cc_threshold),
          },
          {
            name: "spo_yes_vote_taken",
            values: govActionRatifier.map((dto) => dto.spo_yes_vote_taken),
          },
          {
            name: "spo_abstain_vote_taken",
            values: govActionRatifier.map((dto) => dto.spo_abstain_vote_taken),
          },
          {
            name: "spo_total_stake",
            values: govActionRatifier.map((dto) => dto.spo_total_stake),
          },
          {
            name: "drep_yes_vote_stake",
            values: govActionRatifier.map((dto) => dto.drep_yes_vote_stake),
          },
          {
            name: "drep_no_vote_stake",
            values: govActionRatifier.map((dto) => dto.drep_no_vote_stake),
          },
          {
            name: "cc_state",
            values: govActionRatifier.map((dto) => dto.cc_state),
          },
          {
            name: "last_enacted_gov_action_id",
            values: govActionRatifier.map(
              (dto) => dto.last_enacted_gov_action_id
            ),
          },
          {
            name: "is_action_ratification_delayed",
            values: govActionRatifier.map(
              (dto) => dto.is_action_ratification_delayed
            ),
          },
          {
            name: "current_epoch_param",
            values: govActionRatifier.map((dto) => dto.current_epoch_param),
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

        // Verify min and max values for numeric fields
        fields.forEach((field) => {
          const numericValues = field.values.map((value) => {
            // Convert to number if value is a string or number
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
