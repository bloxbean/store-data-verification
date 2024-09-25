import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @epoch", () => {
  test("Check the field of epoch parameter", async ({}) => {
    test.step("GIVEN: Retrieve epoch parameter", async () => {
      let epochParameter = await (await yaciService()).getLatestEpochParameters();

      await test.step("WHEN: Get epoch parameter field", async () => {
        let min_fee_a = epochParameter.map((epochParameterDto) => epochParameterDto.min_fee_a);
        let min_fee_b = epochParameter.map((epochParameterDto) => epochParameterDto.min_fee_b);
        let max_block_size = epochParameter.map((epochParameterDto) => epochParameterDto.max_block_size);
        let max_block_header_size = epochParameter.map((epochParameterDto) => epochParameterDto.max_block_header_size);
        let key_deposit = epochParameter.map((epochParameterDto) => epochParameterDto.key_deposit);
        let pool_deposit = epochParameter.map((epochParameterDto) => epochParameterDto.pool_deposit);
        let a0 = epochParameter.map((epochParameterDto) => epochParameterDto.a0);
        let rho = epochParameter.map((epochParameterDto) => epochParameterDto.rho);
        let tau = epochParameter.map((epochParameterDto) => epochParameterDto.tau);
        let decentralisation_param = epochParameter.map(
          (epochParameterDto) => epochParameterDto.decentralisation_param
        );
        let extra_entropy = epochParameter.map((epochParameterDto) => epochParameterDto.extra_entropy);
        let protocol_major_ver = epochParameter.map((epochParameterDto) => epochParameterDto.protocol_major_ver);
        let protocol_minor_ver = epochParameter.map((epochParameterDto) => epochParameterDto.protocol_minor_ver);
        let min_utxo = epochParameter.map((epochParameterDto) => epochParameterDto.min_utxo);
        let nonce = epochParameter.map((epochParameterDto) => epochParameterDto.nonce);
        let cost_models = epochParameter.map((epochParameterDto) => epochParameterDto.cost_models);
        let price_mem = epochParameter.map((epochParameterDto) => epochParameterDto.price_mem);
        let price_step = epochParameter.map((epochParameterDto) => epochParameterDto.price_step);
        let max_tx_ex_mem = epochParameter.map((epochParameterDto) => epochParameterDto.max_tx_ex_mem);
        let max_tx_ex_steps = epochParameter.map((epochParameterDto) => epochParameterDto.max_tx_ex_steps);
        let max_val_size = epochParameter.map((epochParameterDto) => epochParameterDto.max_val_size);
        let collateral_percent = epochParameter.map((epochParameterDto) => epochParameterDto.collateral_percent);
        let max_collateral_inputs = epochParameter.map((epochParameterDto) => epochParameterDto.max_collateral_inputs);
        let coins_per_utxo_size = epochParameter.map((epochParameterDto) => epochParameterDto.coins_per_utxo_size);
        let pvt_motion_no_confidence = epochParameter.map(
          (epochParameterDto) => epochParameterDto.pvt_motion_no_confidence
        );
        let pvt_committee_normal = epochParameter.map((epochParameterDto) => epochParameterDto.pvt_committee_normal);
        let pvt_committee_no_confidence = epochParameter.map(
          (epochParameterDto) => epochParameterDto.pvt_committee_no_confidence
        );
        let pvt_hard_fork_initiation = epochParameter.map(
          (epochParameterDto) => epochParameterDto.pvt_hard_fork_initiation
        );
        let dvt_motion_no_confidence = epochParameter.map(
          (epochParameterDto) => epochParameterDto.dvt_motion_no_confidence
        );
        let dvt_update_to_constitution = epochParameter.map(
          (epochParameterDto) => epochParameterDto.dvt_update_to_constitution
        );
        let dvt_hard_fork_initiation = epochParameter.map(
          (epochParameterDto) => epochParameterDto.dvt_hard_fork_initiation
        );
        let dvt_ppnetwork_group = epochParameter.map((epochParameterDto) => epochParameterDto.dvt_ppnetwork_group);
        let dvt_ppeconomic_group = epochParameter.map((epochParameterDto) => epochParameterDto.dvt_ppeconomic_group);
        let dvt_pptechnical_group = epochParameter.map((epochParameterDto) => epochParameterDto.dvt_pptechnical_group);
        let dvt_ppgov_group = epochParameter.map((epochParameterDto) => epochParameterDto.dvt_ppgov_group);
        let dvt_treasury_withdrawal = epochParameter.map(
          (epochParameterDto) => epochParameterDto.dvt_treasury_withdrawal
        );
        let committee_min_size = epochParameter.map((epochParameterDto) => epochParameterDto.committee_min_size);
        let committee_max_term_length = epochParameter.map(
          (epochParameterDto) => epochParameterDto.committee_max_term_length
        );
        let gov_action_lifetime = epochParameter.map((epochParameterDto) => epochParameterDto.gov_action_lifetime);
        let gov_action_deposit = epochParameter.map((epochParameterDto) => epochParameterDto.gov_action_deposit);
        let drep_deposit = epochParameter.map((epochParameterDto) => epochParameterDto.drep_deposit);
        let drep_activity = epochParameter.map((epochParameterDto) => epochParameterDto.drep_activity);
        let e_max = epochParameter.map((epochParameterDto) => epochParameterDto.e_max);
        let n_opt = epochParameter.map((epochParameterDto) => epochParameterDto.n_opt);

        await test.step("THEN: epoch param should not be null", () => {
          Assertions.assertNotNull(min_fee_a, "field should not be null");
          Assertions.assertNotNull(min_fee_b, "field should not be null");
          Assertions.assertNotNull(max_block_size, "field should not be null");
          Assertions.assertNotNull(max_block_header_size, "field should not be null");
          Assertions.assertNotNull(key_deposit, "field should not be null");
          Assertions.assertNotNull(pool_deposit, "field should not be null");
          Assertions.assertNotNull(a0, "field should not be null");
          Assertions.assertNotNull(rho, "field should not be null");
          Assertions.assertNotNull(tau, "field should not be null");
          Assertions.assertNotNull(decentralisation_param, "field should not be null");
          Assertions.assertNotNull(protocol_major_ver, "field should not be null");
          Assertions.assertNotNull(protocol_minor_ver, "field should not be null");
          Assertions.assertNotNull(min_utxo, "field should not be null");
          Assertions.assertNotNull(nonce, "field should not be null");
          Assertions.assertNotNull(cost_models, "field should not be null");
          Assertions.assertNotNull(price_mem, "field should not be null");
          Assertions.assertNotNull(price_step, "field should not be null");
          Assertions.assertNotNull(max_tx_ex_mem, "field should not be null");
          Assertions.assertNotNull(max_tx_ex_steps, "field should not be null");
          Assertions.assertNotNull(max_val_size, "field should not be null");
          Assertions.assertNotNull(extra_entropy, "field should not be null");
          Assertions.assertNotNull(collateral_percent, "field should not be null");
          Assertions.assertNotNull(max_collateral_inputs, "field should not be null");
          Assertions.assertNotNull(coins_per_utxo_size, "field should not be null");
          Assertions.assertNotNull(pvt_motion_no_confidence, "field should not be null");
          Assertions.assertNotNull(pvt_committee_normal, "field should not be null");
          Assertions.assertNotNull(pvt_committee_no_confidence, "field should not be null");
          Assertions.assertNotNull(pvt_hard_fork_initiation, "field should not be null");
          Assertions.assertNotNull(dvt_motion_no_confidence, "field should not be null");
          Assertions.assertNotNull(dvt_update_to_constitution, "field should not be null");
          Assertions.assertNotNull(dvt_hard_fork_initiation, "field should not be null");
          Assertions.assertNotNull(dvt_ppnetwork_group, "field should not be null");
          Assertions.assertNotNull(dvt_ppeconomic_group, "field should not be null");
          Assertions.assertNotNull(dvt_pptechnical_group, "field should not be null");
          Assertions.assertNotNull(dvt_ppgov_group, "field should not be null");
          Assertions.assertNotNull(dvt_treasury_withdrawal, "field should not be null");
          Assertions.assertNotNull(committee_min_size, "field should not be null");
          Assertions.assertNotNull(committee_max_term_length, "field should not be null");
          Assertions.assertNotNull(gov_action_lifetime, "field should not be null");
          Assertions.assertNotNull(gov_action_deposit, "field should not be null");
          Assertions.assertNotNull(drep_deposit, "field should not be null");
          Assertions.assertNotNull(drep_activity, "field should not be null");
          Assertions.assertNotNull(e_max, "field should not be null");
          Assertions.assertNotNull(n_opt, "field should not be null");
        });
      });
    });
  });
});
