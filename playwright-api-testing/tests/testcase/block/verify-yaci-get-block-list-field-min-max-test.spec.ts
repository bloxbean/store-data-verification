import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @block", () => {
  test("Check the logic of process a new block", async ({}) => {
    test.step("GIVEN: Retrieve block list", async () => {
      let blockListYaci = await (await yaciService()).getBlockList();

      await test.step("WHEN: Retrieve block list information", async () => {
        let time = blockListYaci.map((blockListYaciDto) => blockListYaciDto.time);
        let minTime: number = time[0];
        let maxTime: number = Math.max(...time);

        let number = blockListYaci.map((blockListYaciDto) => blockListYaciDto.number);
        let minNumber: number = number[0];
        let maxNumber: number = Math.max(...number);

        let slot = blockListYaci.map((blockListYaciDto) => blockListYaciDto.slot);
        let minSlot: number = slot[0];
        let maxSlot: number = Math.max(...slot);

        let epoch = blockListYaci.map((blockListYaciDto) => blockListYaciDto.epoch);
        let minEpoch: number = epoch[0];
        let maxEpoch: number = Math.max(...epoch);

        let era = blockListYaci.map((blockListYaciDto) => blockListYaciDto.era);
        let minEra: number = era[0];
        let maxEra: number;

        let output = blockListYaci.map((blockListYaciDto) => blockListYaciDto.output);
        let minOutput: number = output[0];
        let maxOutput: number = Math.max(...output);

        let fees = blockListYaci.map((blockListYaciDto) => blockListYaciDto.fees);
        let minFees: number = fees[0];
        let maxFees: number = Math.max(...fees);

        await test.step("THEN: block list should not be null", () => {
          Assertions.assertNotEqual(minNumber, maxNumber, "value should not be equal");
          Assertions.assertNotEqual(minTime, maxTime, "value should not be equal");
          Assertions.assertNotEqual(minSlot, maxSlot, "value should not be equal");
          Assertions.assertNotEqual(minEpoch, maxEpoch, "value should not be equal");
          Assertions.assertNotEqual(minEra, maxEra, "value should not be equal");
          Assertions.assertNotEqual(minOutput, maxOutput, "value should not be equal");
          Assertions.assertNotEqual(minFees, maxFees, "value should not be equal");
        });
      });
    });
  });
});
