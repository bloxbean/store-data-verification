import { StakeAddresses } from "@common/constants/project.constants";
import type { APIRequestContext } from "@playwright/test";
import { Assertions } from "@common/helpers/misc/assertions.helper";
import { koiosApi } from "./koios.api";
import { KoiosGetTipInformationDto } from "@common/dtos/koiosGetTipInformation.dto";
import { KoiosGetAccountAddressesDto } from "@common/dtos/koiosGetAccountAddresses.dto";
import { HttpStatusCode } from "@common/helpers/common/httpStatusCodes.helper";

export async function getRandomAccountAddresses(maxNumOfAddresses: any): Promise<Set<string>> {
  const stakeAddresses: string[] = Object.values(StakeAddresses);
  const allAccountAddresses: string[] = await (await koiosService()).getAccountAddresses(stakeAddresses);

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
export async function getRandomAddressesSet(size: number): Promise<Set<string>> {
  let addresses: Set<string> = new Set<string>();
  do {
    addresses = await getRandomAccountAddresses(size);
  } while (addresses.size !== size);
  return addresses;
}

export async function koiosService() {
  const getTip = async () => {
    const getTipData = await koiosApi().getTip();
    const getTipArrayResponse: KoiosGetTipInformationDto[] = await getTipData.data.json();
    return getTipArrayResponse;
  };

  let accountAddress: any;
  const getAccountAddresses = async (stakeAddresses: string[]): Promise<string[]> => {
    const getAccountAddressesData = await koiosApi().getAccountAddresses(accountAddress);
    const getAccountAddressesArrayResponse: KoiosGetAccountAddressesDto[] = await getAccountAddressesData.data.json();
    const accountAddresses: string[] = getAccountAddressesArrayResponse.map((addressDto) => addressDto.addresses);
    return accountAddresses;
  };

  return {
    getTip,
    getAccountAddresses,
  };
}

// Usage
let maxNumOfAddresses: any;
let request: APIRequestContext;

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
