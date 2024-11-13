import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Check the logic of process a governance committee registration", async ({}) => {
    test.step("GIVEN: Retrieve governance committee registration", async () => {
      let governanceCommitteeRegistration = await (await yaciService()).getGovernanceCommitteesRegistration();

      await test.step("THEN: governance committee registration field should not be null ", () => {
        governanceCommitteeRegistration.forEach((governanceCommitteeRegistrationsDto) => {
          Assertions.assertNotNull(governanceCommitteeRegistrationsDto.block_number, "block_number should not be null");
          Assertions.assertNotNull(governanceCommitteeRegistrationsDto.block_time, "block_time should not be null");
          Assertions.assertNotNull(governanceCommitteeRegistrationsDto.tx_hash, "tx_hash should not be null");
          Assertions.assertNotNull(governanceCommitteeRegistrationsDto.cert_index, "cert_index should not be null");
          Assertions.assertNotNull(governanceCommitteeRegistrationsDto.slot, "slot should not be null");
          Assertions.assertNotNull(governanceCommitteeRegistrationsDto.epoch, "epoch should not be null");
          Assertions.assertNotNull(governanceCommitteeRegistrationsDto.cold_key, "cold_key should not be null");
          Assertions.assertNotNull(governanceCommitteeRegistrationsDto.hot_key, "hot_key should not be null");
          Assertions.assertNotNull(governanceCommitteeRegistrationsDto.cred_type, "cred_type should not be null");
        });
      });
    });
  });
});
