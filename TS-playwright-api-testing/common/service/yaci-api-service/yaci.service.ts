import { YaciGetAssetHistoryDto } from "@api-common/dtos/yaci/asset/yaci-get-asset-history.dto";
import { YaciGetAssetSupplyByUnitDto } from "@api-common/dtos/yaci/asset/yaci-get-asset-supply-by-unit.dto";
import { YaciGetAssetUtxoDto } from "@api-common/dtos/yaci/asset/yaci-get-asset-utxo.dto";
import { YaciGetBlockInformationDto } from "@api-common/dtos/yaci/block/yaci-get-block-information.dto";
import { YaciGetBlockListDto } from "@api-common/dtos/yaci/block/yaci-get-block-list.dto";
import { YaciGetEpochParametersDto } from "@api-common/dtos/yaci/epoch/yaci-get-epoch-parameters.dto";
import { YaciGetEpochDto } from "@api-common/dtos/yaci/epoch/yaci-get-epoch.dto";
import { YaciGetCurrentCommitteeInfoDto } from "@api-common/dtos/yaci/governance/yaci-get-current-committee-info.dto";
import { YaciGetCurrentConsitutionDto } from "@api-common/dtos/yaci/governance/yaci-get-current-consitution.dto";
import { YaciGetDelegationVoteDto } from "@api-common/dtos/yaci/governance/yaci-get-delegation-vote.dto";
import { YaciGetDrepRegistrationsDto } from "@api-common/dtos/yaci/governance/yaci-get-drep-registrations.dto";
import { YaciGetGovernanceActionProposalDto } from "@api-common/dtos/yaci/governance/yaci-get-governance-action-proposal.dto";
import { YaciGetGovernanceCommitteesRegistrationDto } from "@api-common/dtos/yaci/governance/yaci-get-governance-committees-registrations.dto";
import { YaciGetVotingProcedureDto } from "@api-common/dtos/yaci/governance/yaci-get-voting-procedure.dto";
import { YaciGetPoolRegistrationsDto } from "@api-common/dtos/yaci/pool/yaci-get-pool-registration.dto";
import { YaciGetScriptHashDto } from "@api-common/dtos/yaci/script/yaci-get-script-hash.dto";
import { YaciGetStakeDelegationDto } from "@api-common/dtos/yaci/stake/yaci-get-stake-delegation.dto";
import { YaciGetStakeInformationDto } from "@api-common/dtos/yaci/stake/yaci-get-stake-information.dto";
import { YaciGetDetailTransactionDto } from "@api-common/dtos/yaci/transaction/yaci-get-detail-transaction.dto";
import { YaciGetTransactionWitnessesDto } from "@api-common/dtos/yaci/transaction/yaci-get-transaction-witnesses.dto";
import { YaciGetTransactionDto } from "@api-common/dtos/yaci/transaction/yaci-get-transaction.dto";
import { YaciGetTransactionDetailsWithdrawalsDto } from "@api-common/dtos/yaci/transaction/yaci-get-transanction-details-withdrawals.dto";
import { YaciGetTransactionWithdrawalsDto } from "@api-common/dtos/yaci/transaction/yaci-get-transanction-withdrawals.dto";
import { YaciSubmitTransactionDto } from "@api-common/dtos/yaci/transaction/yaci-submit-transaction.dto";
import { yaciApi } from "./yaci.api";

export async function yaciService() {
  const getTransaction = async () => {
    const getTransactionData = await yaciApi().getTransaction();
    const getTransactionDataArrayResponse: YaciGetTransactionDto[] =
      await getTransactionData.data;
    return getTransactionDataArrayResponse;
  };

  const getBlockList = async () => {
    const getBlockListData = await yaciApi().getBlockList();
    const getBlockListDataArrayResponse: YaciGetBlockListDto[] =
      await getBlockListData.data;
    return getBlockListDataArrayResponse;
  };

  const getBlockLatestInformation = async () => {
    const getBlockLatestInformationData =
      await yaciApi().getBlockLatestInformation();
    const getBlockLatestInformationDataArrayResponse: YaciGetBlockInformationDto[] =
      await getBlockLatestInformationData.data;
    return getBlockLatestInformationDataArrayResponse;
  };

  const getPreviousBlockHash = async () => {
    const getBlockLatestInformationData =
      await yaciApi().getBlockLatestInformation();
    const getBlockLatestInformationDataArrayResponse: YaciGetBlockInformationDto[] =
      await getBlockLatestInformationData.data;
    const previousBlockInformation: unknown =
      getBlockLatestInformationDataArrayResponse.map(
        (blockInformationDto) => blockInformationDto.previous_block
      );
    return previousBlockInformation;
  };

  const getBlockInformationByHash = async (hash: unknown) => {
    const getBlockInformationByHashData =
      await yaciApi().getBlockInformationByHash(hash);
    const getBlockInformationByHashDataArrayResponse: YaciGetBlockInformationDto[] =
      await getBlockInformationByHashData.data;
    return getBlockInformationByHashDataArrayResponse;
  };

  const getStakeRegistrations = async () => {
    const getStakeRegistrationsData = await yaciApi().getStakeRegistrations();
    const getStakeRegistrationsDataArrayResponse: YaciGetStakeInformationDto[] =
      await getStakeRegistrationsData.data;
    return getStakeRegistrationsDataArrayResponse;
  };

  const getStakeDeregistrations = async () => {
    const getStakeDeregistrationsData =
      await yaciApi().getStakeDeregistrations();
    const getStakeDeregistrationsDataArrayResponse: YaciGetStakeInformationDto[] =
      await getStakeDeregistrationsData.data;
    return getStakeDeregistrationsDataArrayResponse;
  };

  const getStakeDelegations = async () => {
    const getStakeDelegationsData = await yaciApi().getStakeDelegations();
    const getStakeDelegationsDataArrayResponse: YaciGetStakeDelegationDto[] =
      await getStakeDelegationsData.data;
    return getStakeDelegationsDataArrayResponse;
  };

  const getAddressFromStakeRegistrations = async () => {
    const getStakeRegistrationsData = await yaciApi().getStakeRegistrations();
    const getStakeRegistrationsDataArrayResponse: YaciGetStakeInformationDto[] =
      await getStakeRegistrationsData.data;
    const addressInformation: unknown =
      getStakeRegistrationsDataArrayResponse.map(
        (addressInformationDto) => addressInformationDto.address
      );
    return addressInformation;
  };

  const getAddressFromDeregistrations = async () => {
    const getStakeDeregistrationsData =
      await yaciApi().getStakeDeregistrations();
    const getStakeDeregistrationsDataArrayResponse: YaciGetStakeInformationDto[] =
      await getStakeDeregistrationsData.data;
    const addressInformation: unknown =
      getStakeDeregistrationsDataArrayResponse.map(
        (addressInformationDto) => addressInformationDto.address
      );
    return addressInformation;
  };

  const getAddressFromDelegations = async () => {
    const getStakeDelegationsData = await yaciApi().getStakeDelegations();
    const getStakeDelegationsDataArrayResponse: YaciGetStakeDelegationDto[] =
      await getStakeDelegationsData.data;
    const addressInformation: unknown =
      getStakeDelegationsDataArrayResponse.map(
        (addressInformationDto) => addressInformationDto.address
      );
    return addressInformation;
  };

  const getWithdrawals = async () => {
    const getWithdrawalsData = await yaciApi().getWithdrawals();
    const getWithdrawalsDataArrayResponse: YaciGetTransactionWithdrawalsDto[] =
      await getWithdrawalsData.data;
    const txHashInformation: unknown = getWithdrawalsDataArrayResponse.map(
      (txHashInformationDto) => txHashInformationDto.tx_hash
    );
    return txHashInformation;
  };

  const getDetailTransaction = async (txHash: unknown) => {
    const getDetailTransactionData =
      await yaciApi().getDetailTransaction(txHash);
    const getDetailTransactionDataArrayResponse: YaciGetDetailTransactionDto[] =
      await getDetailTransactionData.data;
    return getDetailTransactionDataArrayResponse;
  };

  const getUnitFromDetailTransaction = async (txHash: unknown) => {
    const getDetailTransactionData =
      await yaciApi().getDetailTransaction(txHash);
    const getDetailTransactionDataArrayResponse: YaciGetDetailTransactionDto[] =
      await getDetailTransactionData.data;
    const unitInformation: unknown = getDetailTransactionDataArrayResponse.map(
      (unitInformationDto) => unitInformationDto.amount[0].unit
    );
    return unitInformation;
  };

  const getWitnesses = async (txHash: unknown) => {
    const getTransactionWitnessesData = await yaciApi().getWitnesses(txHash);
    const getTransactionWitnessesDataDataArrayResponse: YaciGetTransactionWitnessesDto[] =
      await getTransactionWitnessesData.data;
    return getTransactionWitnessesDataDataArrayResponse;
  };

  const getDetailWithdrawals = async (txHash: unknown) => {
    const getDetailWithdrawalsData =
      await yaciApi().getDetailsWithdrawals(txHash);
    const getDetailWithdrawalsDataArrayResponse: YaciGetTransactionDetailsWithdrawalsDto[] =
      await getDetailWithdrawalsData.data;
    return getDetailWithdrawalsDataArrayResponse;
  };

  const submitTransaction = async (txHash: unknown, index: number) => {
    const submitTransactionData = await yaciApi().submitTransaction(
      txHash,
      index
    );
    const submitTransactionDataArrayResponse: YaciSubmitTransactionDto[] =
      await submitTransactionData.data;
    return submitTransactionDataArrayResponse;
  };

  const submitUtxo = async (txHash: unknown, index: number) => {
    const submitTransactionData = await yaciApi().submitUtxo(txHash, index);
    const submitTransactionDataArrayResponse: YaciSubmitTransactionDto[] =
      await submitTransactionData.data;
    return submitTransactionDataArrayResponse;
  };

  const getLatestEpoch = async () => {
    const getEpochNumber = await yaciApi().getLatestEpoch();
    const getEpochNumberResponse: YaciGetEpochDto[] = await getEpochNumber.data;
    return getEpochNumberResponse;
  };

  const getLatestEpochParameters = async () => {
    const getEpochParameterData = await yaciApi().getLatestEpochParameters();
    const getEpochParameterDataResponse: YaciGetEpochParametersDto[] =
      await getEpochParameterData.data;
    return getEpochParameterDataResponse;
  };

  const getEpochParameter = async (number: number) => {
    const getEpochParameterData = await yaciApi().getEpochParameter(number);
    const getEpochParameterDataResponse: YaciGetEpochParametersDto[] =
      await getEpochParameterData.data;
    return getEpochParameterDataResponse;
  };

  const getUtxoOfAsset = async (unit: unknown) => {
    const getUtxoOfAssetData = await yaciApi().getUtxoOfAsset(unit);
    const getUtxoOfAssetDataResponse: YaciGetAssetUtxoDto[] =
      await getUtxoOfAssetData.data;
    return getUtxoOfAssetDataResponse;
  };

  const getAssetHistoryByUnit = async (unit: unknown) => {
    const getAssetHistoryByUnitData =
      await yaciApi().getAssetHistoryByUnit(unit);
    const getAssetHistoryByUnitDataResponse: YaciGetAssetHistoryDto[] =
      await getAssetHistoryByUnitData.data;
    return getAssetHistoryByUnitDataResponse;
  };

  const getAssetSupplyByUnit = async (unit: number) => {
    const getAssetSupplyByUnitData = await yaciApi().getAssetSupplyByUnit(unit);
    const getAssetSupplyByUnitDataResponse: YaciGetAssetSupplyByUnitDto[] =
      await getAssetSupplyByUnitData.data;
    return getAssetSupplyByUnitDataResponse;
  };

  const getPoolRegistration = async (number: unknown) => {
    const getPoolRegistrationData = await yaciApi().getPoolRegistration(number);
    const getPoolRegistrationDataArrayResponse: YaciGetPoolRegistrationsDto[] =
      await getPoolRegistrationData.data;
    return getPoolRegistrationDataArrayResponse;
  };

  const getScript = async (scriptHash: unknown) => {
    const getScriptData = await yaciApi().getScript(scriptHash);
    const getScriptDataArrayResponse: YaciGetScriptHashDto[] =
      await getScriptData.data;
    return getScriptDataArrayResponse;
  };

  const getVotingProcedure = async () => {
    const getVotingProcedureParameterData = await yaciApi().getVotes();
    const getVotingProcedureParameterDataResponse: YaciGetVotingProcedureDto[] =
      await getVotingProcedureParameterData.data;
    return getVotingProcedureParameterDataResponse;
  };

  const getDelegationVotes = async () => {
    const getDelegationVotesParameterData =
      await yaciApi().getDelegationVotes();
    const getDelegationVotesParameterDataResponse: YaciGetDelegationVoteDto[] =
      await getDelegationVotesParameterData.data;
    return getDelegationVotesParameterDataResponse;
  };

  const getDrepRegistrations = async () => {
    const getDrepRegistrationsParameterData =
      await yaciApi().getDrepRegistrations();
    const getDrepRegistrationsParameterDataResponse: YaciGetDrepRegistrationsDto[] =
      await getDrepRegistrationsParameterData.data;
    return getDrepRegistrationsParameterDataResponse;
  };

  const getGovernanceActionProposals = async () => {
    const getGovernanceActionProposalsParameterData =
      await yaciApi().getGovernanceActionProposals();
    const getGovernanceActionProposalsParameterDataResponse: YaciGetGovernanceActionProposalDto[] =
      await getGovernanceActionProposalsParameterData.data;
    return getGovernanceActionProposalsParameterDataResponse;
  };

  const getGovernanceCommitteesRegistration = async () => {
    const getGovernanceActionProposalsParameterData =
      await yaciApi().getGovernanceCommitteesRegistration();
    const getGovernanceActionProposalsParameterDataResponse: YaciGetGovernanceCommitteesRegistrationDto[] =
      await getGovernanceActionProposalsParameterData.data;
    return getGovernanceActionProposalsParameterDataResponse;
  };

  const getCurrentCommitteeInfo = async () => {
    const getCurrentCommitteeInfoParameterData =
      await yaciApi().getCurrentCommitteeInfo();
    const getCurrentCommitteeInfoParameterDataResponse: YaciGetCurrentCommitteeInfoDto[] =
      await getCurrentCommitteeInfoParameterData.data;
    return getCurrentCommitteeInfoParameterDataResponse;
  };

  const getCurrentConsitution = async () => {
    const getCurrentConsitutionParameterData =
      await yaciApi().getCurrentConsitution();
    const getCurrentConsitutionParameterDataResponse: YaciGetCurrentConsitutionDto[] =
      await getCurrentConsitutionParameterData.data;
    return getCurrentConsitutionParameterDataResponse;
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
    getUtxoOfAsset,
    getAssetHistoryByUnit,
    getAssetSupplyByUnit,
    getUnitFromDetailTransaction,
    getPoolRegistration,
    getScript,
    getVotingProcedure,
    getDelegationVotes,
    getDrepRegistrations,
    getGovernanceActionProposals,
    getGovernanceCommitteesRegistration,
    getCurrentCommitteeInfo,
    getCurrentConsitution,
  };
}
