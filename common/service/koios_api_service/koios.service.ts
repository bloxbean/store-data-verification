import { koiosApi } from "./koios.api";
import { KoiosGetTipInformationDto } from "@common/dtos/koios/koiosGetTipInformation.dto";
import { KoiosGetAccountAddressesDto } from "@common/dtos/koios/koiosGetAccountAddresses.dto";
import { KoiosGetAccountTransactionDto } from "@common/dtos/koios/koiosGetAccountTransaction.dto";

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

  const getAccountTransaction = async (stakeAddresses: string): Promise<string[]> => {
    const getAccountTransactionData = await koiosApi().getAccountTransaction(stakeAddresses);
    const getAccountTransactionDataArrayResponse: KoiosGetAccountTransactionDto[] =
      await getAccountTransactionData.data;
    const accountTransaction: string[] = getAccountTransactionDataArrayResponse.map(
      (transactionDto) => transactionDto.tx_hash
    );
    return accountTransaction;
  };

  return {
    getTip,
    getAccountAddresses,
    getAccountTransaction,
  };
}
