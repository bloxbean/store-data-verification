import { KoiosGetAccountAddressesDto } from "@common/dtos/koios/account/koios-get-account-addresses.dto";
import { KoiosGetAccountTransactionDto } from "@common/dtos/koios/account/koios-get-account-transaction.dto";
import { KoiosGetAssetHistoryDto } from "@common/dtos/koios/asset/koios-get-asset-history.dto";
import { KoiosGetAssetUtxoDto } from "@common/dtos/koios/asset/koios-get-asset-utxo.dto";
import { KoiosGetBlockListDto } from "@common/dtos/koios/block/koios-get-block-list.dto";
import { KoiosGetBlockTransactionDto } from "@common/dtos/koios/block/koios-get-block-transaction.dto";
import { KoiosGetEpochBlockProtocolnDto } from "@common/dtos/koios/epoch/koios-get-epoch-block-protocols.dto";
import { KoiosGetEpochInformationDto } from "@common/dtos/koios/epoch/koios-get-epoch-information.dto";
import { KoiosGetEpochProtocolParametersDto } from "@common/dtos/koios/epoch/koios-get-epoch-protocol-parameters.dto";
import { KoiosGetTipInformationDto } from "@common/dtos/koios/koios-get-tip-information.dto";
import { KoiosGetPoolRegistrationsDto } from "@common/dtos/koios/pool/koios-get-pool-registration.dto";
import { KoiosGetScriptHashDto } from "@common/dtos/koios/script/koios-get-script-hash.dto";
import { KoiosGetTransactionInfoDto } from "@common/dtos/koios/transaction/koios-get-transaction-info.dto";
import { koiosApi } from "./koios.api";

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

  const getBlockList = async () => {
    const getBlockListData = await koiosApi().getBlockList();
    const getBlockListDataArrayResponse: KoiosGetBlockListDto[] = await getBlockListData.data;
    return getBlockListDataArrayResponse;
  };

  const getBlockTransactions = async (blockHashes: string[]): Promise<string[]> => {
    const getBlockTransactionsData = await koiosApi().getAccountAddresses(blockHashes);
    const getBlockTransactionsDataArrayResponse: KoiosGetBlockTransactionDto[] = await getBlockTransactionsData.data;
    const hashValue: string[] = getBlockTransactionsDataArrayResponse.map((hashDto) => hashDto.tx_hash);
    return hashValue;
  };

  const getTransactionInformation = async (txHashes: string[]): Promise<string[]> => {
    const getTransactionInformationsData = await koiosApi().getTransactionInformation(txHashes);
    const getTransactionInformationsDataResponse: KoiosGetTransactionInfoDto[] =
      await getTransactionInformationsData.data;
    const transactionInfoStrings: string[] = getTransactionInformationsDataResponse.map((transaction) =>
      JSON.stringify(transaction)
    );
    return transactionInfoStrings;
  };

  const getTransactionStatus = async (txHashes: string[]): Promise<string[]> => {
    const getTransactionStatusData = await koiosApi().getTransactionStatus(txHashes);
    const getTransactionStatusDataResponse: KoiosGetTransactionInfoDto[] = await getTransactionStatusData.data;
    const transactionStatusStrings: string[] = getTransactionStatusDataResponse.map((transaction) =>
      JSON.stringify(transaction)
    );
    return transactionStatusStrings;
  };

  const getEpochInformation = async (number: number, isInclude: boolean): Promise<string[]> => {
    const getEpochInformationData = await koiosApi().getEpochInformation(number, isInclude);
    const getEpochInformationDataArrayResponse: KoiosGetEpochInformationDto[] = await getEpochInformationData.data;
    const epochInformation: string[] = getEpochInformationDataArrayResponse.map((epoch) => JSON.stringify(epoch));
    return epochInformation;
  };

  const getEpochParameter = async (number: number): Promise<string[]> => {
    const getEpochProtocolParameterData = await koiosApi().getEpochParameter(number);
    const getEpochProtocolParameterDataArrayResponse: KoiosGetEpochProtocolParametersDto[] =
      await getEpochProtocolParameterData.data;
    const epochParameter: string[] = getEpochProtocolParameterDataArrayResponse.map((epoch) => JSON.stringify(epoch));
    return epochParameter;
  };

  const getEpochBlockProtocols = async (number: number): Promise<string[]> => {
    const getEpochBlockProtocolData = await koiosApi().getEpochBlockProtocols(number);
    const getEpochBlockProtocolDataArrayResponse: KoiosGetEpochBlockProtocolnDto[] =
      await getEpochBlockProtocolData.data;
    const epochBlockProtocols: string[] = getEpochBlockProtocolDataArrayResponse.map((epoch) => JSON.stringify(epoch));
    return epochBlockProtocols;
  };

  const getAssetHistory = async (assetPolicy: string, assetName: string): Promise<string[]> => {
    const getAssetHistoryData = await koiosApi().getAssetHistory(assetPolicy, assetName);
    const getAssetHistoryDataArrayResponse: KoiosGetAssetHistoryDto[] = await getAssetHistoryData.data;
    const getAssetHistory: string[] = getAssetHistoryDataArrayResponse.map((asset) => JSON.stringify(asset));
    return getAssetHistory;
  };

  const getAssetUtxos = async (assetList: string[], isExtended: boolean): Promise<string[]> => {
    const getAssetUtxosData = await koiosApi().getAssetUtxos(assetList, isExtended);
    const getAssetUtxosDataArrayResponse: KoiosGetAssetUtxoDto[] = await getAssetUtxosData.data;
    const getAssetUtxos: string[] = getAssetUtxosDataArrayResponse.map((asset) => JSON.stringify(asset));
    return getAssetUtxos;
  };

  const getPoolRegistration = async (number: unknown) => {
    const getPoolRegistrationData = await koiosApi().getPoolRegistration(number);
    const getPoolRegistrationDataArrayResponse: KoiosGetPoolRegistrationsDto[] = await getPoolRegistrationData.data;
    return getPoolRegistrationDataArrayResponse;
  };

  const getScriptRedeemers = async (scriptHash: unknown) => {
    const getScriptRedeemersData = await koiosApi().getScriptRedeemers(scriptHash);
    const getScriptRedeemersnDataArrayResponse: KoiosGetScriptHashDto[] = await getScriptRedeemersData.data;
    return getScriptRedeemersnDataArrayResponse;
  };

  return {
    getTip,
    getAccountAddresses,
    getAccountTransaction,
    getBlockList,
    getBlockTransactions,
    getTransactionInformation,
    getTransactionStatus,
    getEpochInformation,
    getEpochParameter,
    getEpochBlockProtocols,
    getAssetHistory,
    getAssetUtxos,
    getPoolRegistration,
    getScriptRedeemers,
  };
}
