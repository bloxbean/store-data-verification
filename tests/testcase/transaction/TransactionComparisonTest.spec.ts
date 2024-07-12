import { test, expect } from "@playwright/test";
import { StakeAddresses } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { koiosService } from "@common/service/koios_api_service/koios.service";
import { yaciService } from "@common/service/yaci_api_service/yaci.service";

test.describe("@smoke", () => {
  test("Compare the transaction of Koios and Yaci Store", async ({}) => {
    test.step("GIVEN: Retrieve chain tip", async () => {
      let transactionKoios = await (await koiosService()).getAccountTransaction(StakeAddresses.STAKE_ADDRESS_1);
      let transactionYaci = await (await yaciService()).getTransaction();

      await test.step("THEN: Compare chain tip", () => {
        Assertions.assertEqual(transactionKoios, transactionYaci, "Transaction should be equal.");
      });
    });
  });
});
