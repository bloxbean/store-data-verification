import { yaciApi } from "./yaci.api";
import { YaciGetTransactionDto } from "@common/dtos/yaci/yaciGetTransaction.dto";
import { YaciGetBlockListDto } from "@common/dtos/yaci/yaciGetBlockList.dto";
import { YaciGetBlockInformationDto } from "@common/dtos/yaci/yaciGetBlockInformation.dto";

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

  return {
    getTransaction,
    getBlockList,
    getBlockLatestInformation,
    getPreviousBlockHash,
    getBlockInformationByHash,
  };
}
