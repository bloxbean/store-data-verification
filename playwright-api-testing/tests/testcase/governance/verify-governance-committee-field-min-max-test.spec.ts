import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @governance", () => {
  test("Check the logic of process a governance committee registration", async ({}) => {
    test.step("GIVEN: Retrieve governance committee registration", async () => {
      let governanceCommitteeRegistration = await (await yaciService()).getGovernanceCommitteesRegistration();

      await test.step("WHEN: governance committee registration field should not be null ", () => {
        let fields = [
          {
            name: "block_number",
            values: governanceCommitteeRegistration.map(
              (governanceCommitteeRegistrationDto) => governanceCommitteeRegistrationDto.block_number
            ),
          },
          {
            name: "block_time",
            values: governanceCommitteeRegistration.map(
              (governanceCommitteeRegistrationDto) => governanceCommitteeRegistrationDto.block_time
            ),
          },
          {
            name: "cert_index",
            values: governanceCommitteeRegistration.map(
              (governanceCommitteeRegistrationDto) => governanceCommitteeRegistrationDto.cert_index
            ),
          },
          {
            name: "slot",
            values: governanceCommitteeRegistration.map(
              (governanceCommitteeRegistrationDto) => governanceCommitteeRegistrationDto.slot
            ),
          },
          {
            name: "epoch",
            values: governanceCommitteeRegistration.map(
              (governanceCommitteeRegistrationDto) => governanceCommitteeRegistrationDto.epoch
            ),
          },
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
