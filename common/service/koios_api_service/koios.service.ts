import { StakeAddresses } from "@common/constants/project.constants";
import type { APIRequestContext } from "@playwright/test";
import { expect } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { koiosApi } from "./koios.api";
import { KoiosGetTipInformationDto } from "@common/dtos/koiosGetTipInformation.dto";
import { HttpStatusCode } from "@common/helpers/common/httpStatusCodes.helper";

export async function getRandomAccountAddresses(maxNumOfAddresses: number): Promise<Set<string>> {
  const koiosBackendService = await import("@adabox/koios-ts-client").then((module) =>
    module.BackendFactory.getKoiosMainnetService()
  );
  const koiosAccountService = koiosBackendService.getAccountService();
  const stakeAddresses: string[] = Object.values(StakeAddresses);
  const allAccountAddresses: string[] = await koiosAccountService.getAccountAddresses(stakeAddresses);

  function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const shuffledAccountAddresses: string[] = shuffleArray(allAccountAddresses);
  const randomAccountAddresses: Set<string> = new Set(shuffledAccountAddresses.slice(0, maxNumOfAddresses));

  return randomAccountAddresses;
}

// Usage
let maxNumOfAddresses: any;

if (isNaN(maxNumOfAddresses)) {
  getRandomAccountAddresses(maxNumOfAddresses)
    .then((randomAddresses) => {
      console.log(randomAddresses);
    })
    .catch((error) => {
      console.error("Error retrieving random account addresses:", error);
    });
} else {
  console.error("Invalid input. Please enter a valid number.");
}

export async function koiosService(request: APIRequestContext) {
  const getTip = async () => {
    const getTipData = await koiosApi(request).getTip();
    Assertions.assertEqual(getTipData.status(), HttpStatusCode.Ok, "status code is wrong.");
    const getTipArrayResponse: KoiosGetTipInformationDto[] = await getTipData.json();
    return getTipArrayResponse;
  };

  return {
    getTip,
  };
}
