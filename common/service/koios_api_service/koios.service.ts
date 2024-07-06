import { koiosApi } from "./koios.api";
import { KoiosGetTipInformationDto } from "@common/dtos/koiosGetTipInformation.dto";
import { KoiosGetAccountAddressesDto } from "@common/dtos/koiosGetAccountAddresses.dto";

export async function koiosService() {
  const getTip = async () => {
    const getTipData = await koiosApi().getTip();
    const getTipArrayResponse: KoiosGetTipInformationDto[] = await getTipData.data;
    return getTipArrayResponse;
  };

  const getAccountAddresses = async (stakeAddresses: string[]): Promise<string[]> => {
    const getAccountAddressesData = await koiosApi().getAccountAddresses(stakeAddresses);
    const getAccountAddressesArrayResponse: KoiosGetAccountAddressesDto[] = await getAccountAddressesData.data;
    const accountAddresses: string[] = getAccountAddressesArrayResponse.map((addressDto) => addressDto.addresses);
    return accountAddresses;
  };

  return {
    getTip,
    getAccountAddresses,
  };
}
