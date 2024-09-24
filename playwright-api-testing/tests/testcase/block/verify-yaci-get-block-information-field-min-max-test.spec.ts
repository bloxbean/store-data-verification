import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @block", () => {
  test("Check the rollback process", async ({}) => {
    test.step("GIVEN: Retrieve block latest information", async () => {
      let blockInformation = await (await yaciService()).getBlockLatestInformation();

      await test.step("WHEN: Get block information field and it min and max value", async () => {
        let number = blockInformation.map((blockInformationDto) => blockInformationDto.number);
        let minNumber: number = number[0];
        let maxNumber: number = Math.max(...number);

        let time = blockInformation.map((blockInformationDto) => blockInformationDto.time);
        let minTime: number = time[0];
        let maxTime: number = Math.max(...time);

        let height = blockInformation.map((blockInformationDto) => blockInformationDto.height);
        let minHeight: number = height[0];
        let maxHeight: number = Math.max(...height);

        let slot = blockInformation.map((blockInformationDto) => blockInformationDto.slot);
        let minSlot: number = slot[0];
        let maxSlot: number = Math.max(...slot);

        let epoch = blockInformation.map((blockInformationDto) => blockInformationDto.epoch);
        let minEpoch: number = epoch[0];
        let maxEpoch: number = Math.max(...epoch);

        let era = blockInformation.map((blockInformationDto) => blockInformationDto.era);
        let minEra: number = era[0];
        let maxEra: number;

        let epoch_slot = blockInformation.map((blockInformationDto) => blockInformationDto.epoch_slot);
        let minEpochSlot: number = epoch_slot[0];
        let maxEpochSlot: number = Math.max(...epoch_slot);

        let size = blockInformation.map((blockInformationDto) => blockInformationDto.size);
        let minSize: number = size[0];
        let maxSize: number = Math.max(...size);

        let tx_count = blockInformation.map((blockInformationDto) => blockInformationDto.tx_count);
        let minTxCount: number = tx_count[0];
        let maxTxCount: number = Math.max(...tx_count);

        let output = blockInformation.map((blockInformationDto) => blockInformationDto.output);
        let minOutput: number = output[0];
        let maxOutput: number = Math.max(...output);

        let fees = blockInformation.map((blockInformationDto) => blockInformationDto.fees);
        let minFees: number = fees[0];
        let maxFees: number = Math.max(...fees);

        let op_cert_counter = blockInformation.map((blockInformationDto) => blockInformationDto.op_cert_counter);
        let minOpCertCounter: number = op_cert_counter[0];
        let maxOpCertCounter: number = Math.max(...op_cert_counter);

        let protocol_version = blockInformation.map((blockInformationDto) => blockInformationDto.protocol_version);
        let minProtocolVersion: number = protocol_version[0];
        let maxProtocolVersion: number = Math.max(...protocol_version);

        await test.step("THEN: Verify block information is not null", async () => {
          Assertions.assertNotEqual(minNumber, maxNumber, "value should not be equal");
          Assertions.assertNotEqual(minTime, maxTime, "value should not be equal");
          Assertions.assertNotEqual(minHeight, maxHeight, "value should not be equal");
          Assertions.assertNotEqual(minSlot, maxSlot, "value should not be equal");
          Assertions.assertNotEqual(minEpoch, maxEpoch, "value should not be equal");
          Assertions.assertNotEqual(minEra, maxEra, "value should not be equal");
          Assertions.assertNotEqual(minEpochSlot, maxEpochSlot, "value should not be equal");
          Assertions.assertNotEqual(minSize, maxSize, "value should not be equal");
          Assertions.assertNotEqual(minTxCount, maxTxCount, "value should not be equal");
          Assertions.assertNotEqual(minOutput, maxOutput, "value should not be equal");
          Assertions.assertNotEqual(minFees, maxFees, "value should not be equal");
          Assertions.assertNotEqual(minOpCertCounter, maxOpCertCounter, "value should not be equal");
          Assertions.assertNotEqual(minProtocolVersion, maxProtocolVersion, "value should not be equal");
        });
      });
    });
  });
});
