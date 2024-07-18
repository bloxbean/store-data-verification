import { yaciApi } from "./yaci.api";
import { YaciGetTransactionDto } from "@common/dtos/yaci/yaciGetTransaction.dto";
import { YaciGetBlockListDto } from "@common/dtos/yaci/yaciGetBlockList.dto";
import { YaciGetBlockInformationDto } from "@common/dtos/yaci/yaciGetBlockInformation.dto";
import { YaciGetStakeDelegationDto } from "@common/dtos/yaci/yaciGetStakeDelegation.dto";
import { YaciGetStakeInformationDto } from "@common/dtos/yaci/yaciGetStakeInformation.dto";

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
  };
}
