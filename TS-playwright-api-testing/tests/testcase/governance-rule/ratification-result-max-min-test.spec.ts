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

  test("Check get ratification result", async ({}) => {
    test.step("GIVEN: Retrieve ratification result", async () => {
      const getRatificationResult = await (
        await yaciGovernanceRuleService()
      ).getRatificationResult();

      await test.step("WHEN: Retrieve ratification result", async () => {
        const fields = [
          {
            name: "gov_action",
            values: getRatificationResult.map((dto) => dto.gov_action),
          },
          {
            name: "expired_epoch",
            values: getRatificationResult.map((dto) => dto.expired_epoch),
          },
          {
            name: "cc_yes_vote",
            values: getRatificationResult.map((dto) => dto.cc_yes_vote),
          },
          {
            name: "cc_no_vote",
            values: getRatificationResult.map((dto) => dto.cc_no_vote),
          },
          {
            name: "cc_threshold",
            values: getRatificationResult.map((dto) => dto.cc_threshold),
          },
          {
            name: "spo_yes_vote_taken",
            values: getRatificationResult.map((dto) => dto.spo_yes_vote_taken),
          },
          {
            name: "spo_abstain_vote_taken",
            values: getRatificationResult.map(
              (dto) => dto.spo_abstain_vote_taken
            ),
          },
          {
            name: "spo_total_stake",
            values: getRatificationResult.map((dto) => dto.spo_total_stake),
          },
          {
            name: "drep_yes_vote_stake",
            values: getRatificationResult.map((dto) => dto.drep_yes_vote_stake),
          },
          {
            name: "drep_no_vote_stake",
            values: getRatificationResult.map((dto) => dto.drep_no_vote_stake),
          },
          {
            name: "cc_state",
            values: getRatificationResult.map((dto) => dto.cc_state),
          },
          {
            name: "last_enacted_gov_action_id",
            values: getRatificationResult.map(
              (dto) => dto.last_enacted_gov_action_id
            ),
          },
          {
            name: "is_action_ratification_delayed",
            values: getRatificationResult.map(
              (dto) => dto.is_action_ratification_delayed
            ),
          },
          {
            name: "current_epoch_param",
            values: getRatificationResult.map((dto) => dto.current_epoch_param),
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

        // Additional validation for numeric fields (ensure values are not zero or invalid)
        fields.forEach((field) => {
          if (
            field.name === "spo_total_stake" ||
            field.name === "spo_yes_vote_taken" ||
            field.name === "spo_abstain_vote_taken" ||
            field.name === "drep_yes_vote_stake" ||
            field.name === "drep_no_vote_stake"
          ) {
            const numericValues = field.values.map((value) => {
              const numericValue = Number(value);
              if (isNaN(numericValue)) {
                throw new Error(`Invalid number for ${field.name}: ${value}`);
              }
              return numericValue;
            });

            test.step(`THEN: Validate ${field.name} has positive numeric values`, () => {
              numericValues.forEach((value) => {
                Assertions.assertGreaterThan(
                  value,
                  0,
                  `${field.name} should be greater than 0`
                );
              });
            });
          }
        });
      });
    });
  });
});
