import { test, expect } from "@playwright/test";
import { getRandomAccountAddresses, getRandomAddressesSet } from "@common/service/koios_api_service/koios.service";
import { PostgreSQL } from "@helpers/database/database.helper";
import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";

test.describe("@smoke", () => {
  test("Compare balance of random 10 addresses", async ({}) => {
    await test.step("GIVEN: Get random addresses", async () => {
      const addresses: Set<string> = await getRandomAddressesSet(10);
      const addressArray: string[] = Array.from(addresses);

      await test.step("WHEN: Retrieve address balance comparison maps", async () => {
        const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME, DatabaseConstants.BLOCK_TABLE);
        const addressBalanceComparisonMapLS = await postgres.getMapAddressBalanceFromAddress(addressArray);
        const addressBalanceComparisonMapKoios: Record<string, number> = {};
        for (const address of addresses) {
          const balance = await getRandomAccountAddresses(address);
          addressBalanceComparisonMapKoios[address] = balance.size;
        }

        await test.step("THEN: Compare balances", () => {
          for (const addressBalanceComparisonKey in addressBalanceComparisonMapLS) {
            const addressBalanceComparison = addressBalanceComparisonMapLS[addressBalanceComparisonKey];
            const koiosBalance = addressBalanceComparisonMapKoios[addressBalanceComparisonKey];
            const s = `comparison address=${addressBalanceComparisonKey.toString()}, ls_balance=${addressBalanceComparison}, koios_balance=${koiosBalance}`;
            console.log(s);
            test.step("THEN: Assert balance equality", () => {
              Assertions.assertEqual(koiosBalance, addressBalanceComparison, "Balance should be equal.");
            });
          }

          test.step("THEN: Assert map sizes are equal", () => {
            Assertions.assertEqual(
              Object.keys(addressBalanceComparisonMapKoios).length,
              addressArray.length,
              "Map sizes should be equal."
            );
          });
        });
      });
    });
  });
});
