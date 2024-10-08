import { Empty, Null, TxHashes } from "@common/constants/project.constants";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { yaciService } from "@common/service/yaci-api-service/yaci.service";
import { test } from "@playwright/test";

test.describe("@regression @script", () => {
  test("Verfiy script API using faulty data -1", async ({}) => {
    test.step("GIVEN: Retrieve script redeemer information", async () => {
      let scriptRedeemerYaci = await (await yaciService()).getScript(TxHashes.FAULT_TX_HASHES);

      await test.step("THEN: fetch script hash", () => {
        Assertions.assertNull(scriptRedeemerYaci, "Script redeemer should be null.");
      });
    });
  });
});

test.describe("@regression @script", () => {
  test("Verfiy script API using faulty data -2", async ({}) => {
    test.step("GIVEN: Retrieve script redeemer information", async () => {
      let scriptRedeemerYaci = await (await yaciService()).getScript(Empty.EMPTY);

      await test.step("THEN: fetch script hash", () => {
        Assertions.assertNull(scriptRedeemerYaci, "Script redeemer should be null.");
      });
    });
  });
});

test.describe("@regression @script", () => {
  test("Verfiy script API using faulty data -3", async ({}) => {
    test.step("GIVEN: Retrieve script redeemer information", async () => {
      let scriptRedeemerYaci = await (await yaciService()).getScript(Null.NULL);

      await test.step("THEN: fetch script hash", () => {
        Assertions.assertNull(scriptRedeemerYaci, "Script redeemer should be null.");
      });
    });
  });
});
