import { TxHashes } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @script", () => {
  test("Compare the script redeemer of Koios and Yaci Store", async ({}) => {
    test.step("GIVEN: Retrieve script redeemer information", async () => {
      let scriptRedeemerYaci = await (await yaciService()).getScript(TxHashes.TX_HASHES_3);

      test.step("WHEN: Retrieve script redeemer field information", async () => {
        let script_hash = scriptRedeemerYaci.map((scriptRedeemerYaciDto) => scriptRedeemerYaciDto.script_hash);
        let serialised_size = scriptRedeemerYaci.map((scriptRedeemerYaciDto) => scriptRedeemerYaciDto.serialised_size);
        let type = scriptRedeemerYaci.map((scriptRedeemerYaciDto) => scriptRedeemerYaciDto.type);

        await test.step("THEN: fetch script hash", () => {
          Assertions.assertNotNull(script_hash, "value should not be null.");
          Assertions.assertNotNull(serialised_size, "value should not be null.");
          Assertions.assertNotNull(type, "value should not be null.");
        });
      });
    });
  });
});
