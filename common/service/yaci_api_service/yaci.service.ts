import { yaciApi } from "./yaci.api";
import { YaciGetTransactionDto } from "@common/dtos/yaci/yaciGetTransaction.dto";
import { YaciGetBlockListDto } from "@common/dtos/yaci/yaciGetBlockList.dto";
import { YaciGetBlockLatestInformationDto } from "@common/dtos/yaci/yaciGetBlockLatestInformation.dto";

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
    const getBlockLatestInformationDataArrayResponse: YaciGetBlockListDto[] = await getBlockLatestInformationData.data;
    return getBlockLatestInformationDataArrayResponse;
  };

  return {
    getTransaction,
    getBlockList,
    getBlockLatestInformation,
  };
}
