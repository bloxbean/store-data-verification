import { yaciApi } from "./yaci.api";
import { YaciGetTransactionDto } from "@common/dtos/yaci/yaci-get-transaction.dto";
import { YaciGetBlockListDto } from "@common/dtos/yaci/yaci-get-block-list.dto";
import { YaciGetBlockInformationDto } from "@common/dtos/yaci/yaci-get-block-information.dto";
import { YaciGetStakeDelegationDto } from "@common/dtos/yaci/yaci-get-stake-delegation.dto";
import { YaciGetStakeInformationDto } from "@common/dtos/yaci/yaci-get-stake-information.dto";
import { YaciGetTransactionWithdrawalsDto } from "@common/dtos/yaci/yaci-get-transanction-withdrawals.dto";
import { YaciGetTransactionDetailsWithdrawalsDto } from "@common/dtos/yaci/yaci-get-transanction-details-withdrawals.dto";
import { YaciGetTransactionWitnessesDto } from "@common/dtos/yaci/yaci-get-transaction-witnesses.dto";
import { YaciGetDetailTransactionDto } from "@common/dtos/yaci/yaci-get-detail-transaction.dto";
import { YaciSubmitTransactionDto } from "@common/dtos/yaci/yaci-submit-transaction.dto";
import { YaciGetEpochDto } from "@common/dtos/yaci/yaci-get-epoch.dto";
import { YaciGetEpochParametersDto } from "@common/dtos/yaci/yaci-get-epoch-parameters.dto";

export async function yaciService() {
  const getTransaction = async () => {
    const getTransactionData = await yaciApi().getTransaction();
    const getTransactionDataArrayResponse: YaciGetTransactionDto[] = await getTransactionData.data;
    return getTransactionDataArrayResponse;
  };

  const getBlockList = async () => {
    const getBlockListData = await yaciApi().getBlockList();
    const getBlockListDataArrayResponse: YaciGetBlockListDto[] = await getBlockListData.data;
    return getBlockListDataArrayResponse;
  };

  const getBlockLatestInformation = async () => {
    const getBlockLatestInformationData = await yaciApi().getBlockLatestInformation();
    const getBlockLatestInformationDataArrayResponse: YaciGetBlockInformationDto[] =
      await getBlockLatestInformationData.data;
    return getBlockLatestInformationDataArrayResponse;
  };

  const getPreviousBlockHash = async () => {
    const getBlockLatestInformationData = await yaciApi().getBlockLatestInformation();
    const getBlockLatestInformationDataArrayResponse: YaciGetBlockInformationDto[] =
      await getBlockLatestInformationData.data;
    const previousBlockInformation: unknown = getBlockLatestInformationDataArrayResponse.map(
      (blockInformationDto) => blockInformationDto.previous_block
    );
    return previousBlockInformation;
  };

  const getBlockInformationByHash = async (hash: unknown) => {
    const getBlockInformationByHashData = await yaciApi().getBlockInformationByHash(hash);
    const getBlockInformationByHashDataArrayResponse: YaciGetBlockInformationDto[] =
      await getBlockInformationByHashData.data;
    return getBlockInformationByHashDataArrayResponse;
  };

  const getStakeRegistrations = async () => {
    const getStakeRegistrationsData = await yaciApi().getStakeRegistrations();
    const getStakeRegistrationsDataArrayResponse: YaciGetStakeInformationDto[] = await getStakeRegistrationsData.data;
    return getStakeRegistrationsDataArrayResponse;
  };

  const getStakeDeregistrations = async () => {
    const getStakeDeregistrationsData = await yaciApi().getStakeDeregistrations();
    const getStakeDeregistrationsDataArrayResponse: YaciGetStakeInformationDto[] =
      await getStakeDeregistrationsData.data;
    return getStakeDeregistrationsDataArrayResponse;
  };

  const getStakeDelegations = async () => {
    const getStakeDelegationsData = await yaciApi().getStakeDelegations();
    const getStakeDelegationsDataArrayResponse: YaciGetStakeDelegationDto[] = await getStakeDelegationsData.data;
    return getStakeDelegationsDataArrayResponse;
  };

  const getAddressFromStakeRegistrations = async () => {
    const getStakeRegistrationsData = await yaciApi().getStakeRegistrations();
    const getStakeRegistrationsDataArrayResponse: YaciGetStakeInformationDto[] = await getStakeRegistrationsData.data;
    const addressInformation: unknown = getStakeRegistrationsDataArrayResponse.map(
      (addressInformationDto) => addressInformationDto.address
    );
    return addressInformation;
  };

  const getAddressFromDeregistrations = async () => {
    const getStakeDeregistrationsData = await yaciApi().getStakeDeregistrations();
    const getStakeDeregistrationsDataArrayResponse: YaciGetStakeInformationDto[] =
      await getStakeDeregistrationsData.data;
    const addressInformation: unknown = getStakeDeregistrationsDataArrayResponse.map(
      (addressInformationDto) => addressInformationDto.address
    );
    return addressInformation;
  };

  const getAddressFromDelegations = async () => {
    const getStakeDelegationsData = await yaciApi().getStakeDelegations();
    const getStakeDelegationsDataArrayResponse: YaciGetStakeDelegationDto[] = await getStakeDelegationsData.data;
    const addressInformation: unknown = getStakeDelegationsDataArrayResponse.map(
      (addressInformationDto) => addressInformationDto.address
    );
    return addressInformation;
  };

  const getWithdrawals = async () => {
    const getWithdrawalsData = await yaciApi().getWithdrawals();
    const getWithdrawalsDataArrayResponse: YaciGetTransactionWithdrawalsDto[] = await getWithdrawalsData.data;
    const txHashInformation: unknown = getWithdrawalsDataArrayResponse.map(
      (txHashInformationDto) => txHashInformationDto.tx_hash
    );
    return txHashInformation;
  };

  const getDetailTransaction = async (txHash: unknown) => {
    const getDetailTransactionData = await yaciApi().getDetailTransaction(txHash);
    const getDetailTransactionDataArrayResponse: YaciGetDetailTransactionDto[] = await getDetailTransactionData.data;
    return getDetailTransactionDataArrayResponse;
  };

  const getWitnesses = async (txHash: unknown) => {
    const getTransactionWitnessesData = await yaciApi().getWitnesses(txHash);
    const getTransactionWitnessesDataDataArrayResponse: YaciGetTransactionWitnessesDto[] =
      await getTransactionWitnessesData.data;
    return getTransactionWitnessesDataDataArrayResponse;
  };

  const getDetailWithdrawals = async (txHash: unknown) => {
    const getDetailWithdrawalsData = await yaciApi().getDetailsWithdrawals(txHash);
    const getDetailWithdrawalsDataArrayResponse: YaciGetTransactionDetailsWithdrawalsDto[] =
      await getDetailWithdrawalsData.data;
    return getDetailWithdrawalsDataArrayResponse;
  };

  const submitTransaction = async (txHash: unknown, index: number) => {
    const submitTransactionData = await yaciApi().submitTransaction(txHash, index);
    const submitTransactionDataArrayResponse: YaciSubmitTransactionDto[] = await submitTransactionData.data;
    return submitTransactionDataArrayResponse;
  };

  const submitUtxo = async (txHash: unknown, index: number) => {
    const submitTransactionData = await yaciApi().submitUtxo(txHash, index);
    const submitTransactionDataArrayResponse: YaciSubmitTransactionDto[] = await submitTransactionData.data;
    return submitTransactionDataArrayResponse;
  };

  const getLatestEpoch = async () => {
    const getEpochNumber = await yaciApi().getLatestEpoch();
    const getEpochNumberResponse: YaciGetEpochDto[] = await getEpochNumber.data;
    return getEpochNumberResponse;
  };

  const getLatestEpochParameters = async () => {
    const getEpochParameterData = await yaciApi().getLatestEpochParameters();
    const getEpochParameterDataResponse: YaciGetEpochParametersDto[] = await getEpochParameterData.data;
    return getEpochParameterDataResponse;
  };

  const getEpochParameter = async (number: number) => {
    const getEpochParameterData = await yaciApi().getEpochParameter(number);
    const getEpochParameterDataResponse: YaciGetEpochParametersDto[] = await getEpochParameterData.data;
    return getEpochParameterDataResponse;
  };

  return {
    getTransaction,
    getBlockList,
    getBlockLatestInformation,
    getPreviousBlockHash,
    getBlockInformationByHash,
    getStakeRegistrations,
    getStakeDeregistrations,
    getStakeDelegations,
    getAddressFromDelegations,
    getAddressFromDeregistrations,
    getAddressFromStakeRegistrations,
    getWithdrawals,
    getDetailTransaction,
    getWitnesses,
    getDetailWithdrawals,
    submitTransaction,
    submitUtxo,
    getLatestEpoch,
    getLatestEpochParameters,
    getEpochParameter,
  };
}
