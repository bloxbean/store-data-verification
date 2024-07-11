import { yaciApi } from "./yaci.api";
import { YaciGetTransactionDto } from "@common/dtos/yaci/yaciGetTransaction.dto";

export async function yaciService() {
  const getTransaction = async () => {
    const getTransactionData = await yaciApi().getTransaction();
    const getTransactionDataArrayResponse: YaciGetTransactionDto[] = await getTransactionData.data;
    return getTransactionDataArrayResponse;
  };

  return {
    getTransaction,
  };
}
