import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @smoke @block", () => {
  test("Check the rollback process", async ({}) => {
    test.step("GIVEN: Retrieve block latest information", async () => {
      let blockLatestInformation = await (await yaciService()).getBlockLatestInformation();

      await test.step("GIVEN: Retrieve previous block hash from the block latest information", async () => {
        let blockPreviousHash = await (await yaciService()).getPreviousBlockHash();

        await test.step("WHEN: Retrieve previous block information by Hash", async () => {
          let previousBlockInformation = await (await yaciService()).getBlockInformationByHash(blockPreviousHash);

          await test.step("WHEN: Retrieve block number from both block", async () => {
            let previousBlockNumberList = blockLatestInformation.map((blockNumberDto) => blockNumberDto.number);
            let previousBlockNumber: number = previousBlockNumberList[0];

            let latestBlockNumberList = previousBlockInformation.map((blockNumberDto) => blockNumberDto.number);
            let latestBlockNumber: number = latestBlockNumberList[0];

            await test.step("WHEN: Retrieve block hash from both block", async () => {
              let previousBlockHash = blockLatestInformation.map((blockHashDto) => blockHashDto.hash);
              let latestBlockHash = previousBlockInformation.map((blockHashDto) => blockHashDto.hash);

              await test.step("THEN: Block hash is different from both block ", () => {
                Assertions.assertNotEqual(previousBlockHash, latestBlockHash, "Block Hash should be different.");
              });

              await test.step("THEN: Latest block number is larger than previous block number by 1 ", () => {
                let blockNumberDifferent = latestBlockNumber - previousBlockNumber;
                Assertions.assertEqual(blockNumberDifferent, 1, "Block Number should be different by 1 point.");
              });
            });
          });
        });
      });
    });
  });
});
