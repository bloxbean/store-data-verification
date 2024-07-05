import { test, expect } from "@playwright/test";
import { getRandomAccountAddresses } from "@common/service/koios_api_service/koios.service";
import { PostgreSQL } from "@helpers/database/database.helper";
import DatabaseConstants from "@common/constants/database.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { BackendFactory } from "@adabox/koios-ts-client";

test.describe("@smoke", () => {
  test("Compare balance of random 10 addresses", async ({}) => {
    // const koiosBackendService = await import("@adabox/koios-ts-client").then((module) =>
    //   module.BackendFactory.getKoiosMainnetService()
    // );
    const koiosBackendService = await BackendFactory.getKoiosPreprodService();
    const koiosAddressService = koiosBackendService.getAddressService();
    await test.step("GIVEN: Get random addresses", async () => {
      let addresses: Set<string> = new Set<string>();
      do {
        addresses = await getRandomAccountAddresses(10);
      } while (addresses.size !== 10);
      const addressArray: string[] = Array.from(addresses);
      // 16-20 wrap in a helper ,function

      await test.step("WHEN: Retrieve address balance comparison maps", async () => {
        const postgres = new PostgreSQL(DatabaseConstants.DATABASE_NAME, DatabaseConstants.BLOCK_TABLE);
        let addressBalanceComparisonMapLS = await postgres.getMapAddressBalanceFromAddress(addressArray);
        const addressBalanceComparisonMapKoios = await koiosAddressService.getAddressInformation(addressArray);

        await test.step("THEN: Compare balances", () => {
          for (const [
            addressBalanceComparisonKey,
            addressBalanceComparison,
          ] of addressBalanceComparisonMapLS.entries()) {
            const koiosBalance = addressBalanceComparisonMapKoios.get(addressBalanceComparisonKey)?.getBalance();
            const s = `comparison address=${addressBalanceComparisonKey.toString()}, ls_balance=${addressBalanceComparison.getBalance()}, koios_balance=${koiosBalance}`;
            console.log(s);
            test.step("THEN: Assert balance equality", () => {
              Assertions.assertEqual(koiosBalance, addressBalanceComparison.getBalance(), "Balance should be equal.");
            });
          }

          test.step("THEN:Assert map sizes are equal", () => {
            Assertions.assertEqual(
              Object.keys(addressBalanceComparisonMapKoios).length,
              String(Object.keys(addressBalanceComparisonMapLS).length),
              "Balance should be equal."
            );
          });
        });
      });
    });
  });
});
