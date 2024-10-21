import { Assertions } from "@common/helpers/misc/assertions.helper";
import { DataGenerator } from "@common/helpers/misc/data-generator.helper";
import { sendSlackNotification } from "@common/helpers/misc/slack-notify.helper";
import { koiosService } from "@common/service/koios-api-service/koios.service";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @pool", () => {
  // This will run after each test
  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === "failed") {
      await sendSlackNotification(`Test failed: ${testInfo.title}`);
    }
  });

  test("Check the pool registration information in Yaci and Koios", async ({}) => {
    test.step("GIVEN: Retrieve pool information", async () => {
      const randomNumber = DataGenerator.generateRandomNumber(1, 999);
      let poolInformationYaci = await (await yaciService()).getPoolRegistration(randomNumber);
      let poolInformationKoios = await (await koiosService()).getPoolRegistration(randomNumber);

      await test.step("WHEN: Retrieve pool_id_bench32 from both pool", async () => {
        let poolIdBench32YaciInformation = poolInformationYaci.map((poolDto) => poolDto.pool_id_bech32);
        let poolIdBench32Yaci: string = poolIdBench32YaciInformation[0];

        let poolIdBench32KoiosInformation = poolInformationKoios.map((poolDto) => poolDto.pool_id_bech32);
        let poolIdBench32Koios: string = poolIdBench32KoiosInformation[0];

        await test.step("AND: Retrieve tx_hash from both pool", async () => {
          let txHashYaciInformation = poolInformationYaci.map((poolDto) => poolDto.tx_hash);
          let txHashYaci: string = txHashYaciInformation[0];

          let txHashKoiosInformation = poolInformationKoios.map((poolDto) => poolDto.tx_hash);
          let txHashKoios: string = txHashKoiosInformation[0];

          await test.step("AND: Retrieve block_hash from both pool ", () => {
            let blockHashYaciInformation = poolInformationYaci.map((poolDto) => poolDto.block_hash);
            let blockHashYaci: string = blockHashYaciInformation[0];

            let blockHashKoiosInformation = poolInformationKoios.map((poolDto) => poolDto.block_hash);
            let blockHashKoios: string = blockHashKoiosInformation[0];

            test.step("THEN: pool_id_bench32 , tx_hash and block_hash for the pool with same epoch_no should be equal ", () => {
              Assertions.assertEqual(poolIdBench32Yaci, poolIdBench32Koios, "pool_id_bench32 should be the same.");
              Assertions.assertEqual(txHashYaci, txHashKoios, "tx_hash should be the same.");
              Assertions.assertEqual(blockHashYaci, blockHashKoios, "block_hash should be the same.");
            });
          });
        });
      });
    });
  });
});
