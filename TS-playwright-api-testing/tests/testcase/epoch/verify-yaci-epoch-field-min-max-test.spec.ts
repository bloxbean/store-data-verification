import { Assertions } from "@api-common/helpers/misc/assertions.helper";
import { sendSlackNotification } from "@api-common/helpers/misc/slack-notify.helper";
import { yaciService } from "@api-common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @epoch", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the min max of field in epoch parameter", async ({}) => {
    test.step("GIVEN: Retrieve epoch parameter", async () => {
      let epochParameter = await (
        await yaciService()
      ).getLatestEpochParameters();

      await test.step("WHEN: Get epoch parameter field min and max value", async () => {
        let fields = [
          {
            name: "min_fee_a",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.min_fee_a
            ),
          },
          {
            name: "min_fee_b",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.min_fee_b
            ),
          },
          {
            name: "max_block_size",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.max_block_size
            ),
          },
          {
            name: "max_block_header_size",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.max_block_header_size
            ),
          },
          {
            name: "a0",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.a0
            ),
          },
          {
            name: "rho",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.rho
            ),
          },
          {
            name: "tau",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.tau
            ),
          },
          {
            name: "decentralisation_param",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.decentralisation_param
            ),
          },
          {
            name: "protocol_major_ver",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.protocol_major_ver
            ),
          },
          {
            name: "protocol_minor_ver",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.protocol_minor_ver
            ),
          },
          {
            name: "price_mem",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.price_mem
            ),
          },
          {
            name: "price_step",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.price_step
            ),
          },
          {
            name: "max_collateral_inputs",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.max_collateral_inputs
            ),
          },
          {
            name: "pvt_motion_no_confidence",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.pvt_motion_no_confidence
            ),
          },
          {
            name: "pvt_committee_normal",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.pvt_committee_normal
            ),
          },
          {
            name: "pvt_committee_no_confidence",
            values: epochParameter.map(
              (epochParameterDto) =>
                epochParameterDto.pvt_committee_no_confidence
            ),
          },
          {
            name: "pvt_hard_fork_initiation",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.pvt_hard_fork_initiation
            ),
          },
          {
            name: "dvt_motion_no_confidence",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.dvt_motion_no_confidence
            ),
          },
          {
            name: "dvt_update_to_constitution",
            values: epochParameter.map(
              (epochParameterDto) =>
                epochParameterDto.dvt_update_to_constitution
            ),
          },
          {
            name: "dvt_hard_fork_initiation",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.dvt_hard_fork_initiation
            ),
          },
          {
            name: "dvt_ppnetwork_group",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.dvt_ppnetwork_group
            ),
          },
          {
            name: "dvt_ppeconomic_group",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.dvt_ppeconomic_group
            ),
          },
          {
            name: "dvt_pptechnical_group",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.dvt_pptechnical_group
            ),
          },
          {
            name: "dvt_ppgov_group",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.dvt_ppgov_group
            ),
          },
          {
            name: "dvt_treasury_withdrawal",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.dvt_treasury_withdrawal
            ),
          },
          {
            name: "committee_min_size",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.committee_min_size
            ),
          },
          {
            name: "committee_max_term_length",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.committee_max_term_length
            ),
          },
          {
            name: "gov_action_lifetime",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.gov_action_lifetime
            ),
          },
          {
            name: "gov_action_deposit",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.gov_action_deposit
            ),
          },
          {
            name: "drep_deposit",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.drep_deposit
            ),
          },
          {
            name: "drep_activity",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.drep_activity
            ),
          },
          {
            name: "e_max",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.e_max
            ),
          },
          {
            name: "n_opt",
            values: epochParameter.map(
              (epochParameterDto) => epochParameterDto.n_opt
            ),
          },
        ];

        fields.forEach(async (field) => {
          let minValue = Math.min(...field.values);
          let maxValue = Math.max(...field.values);

          await test.step(`THEN: Verify ${field.name} min and max values are not equal`, () => {
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
