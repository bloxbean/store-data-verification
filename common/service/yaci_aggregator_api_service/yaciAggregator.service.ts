import { yaciAggregatorApi } from "./yaciAggregator.api";
import { YaciGetAddressAmountsDto } from "@common/dtos/yaci_aggregator/yaciGetAddressAmounts.dto";
import { YaciGetAddressBalanceDto } from "@common/dtos/yaci_aggregator/yaciGetAddressBalance.dto";

export async function yaciAggregatorService() {
  const getAddressBalance = async (address: unknown) => {
    const getAddressBalanceData = await yaciAggregatorApi().getAddressBalance(address);
    const getAddressBalanceDataArrayResponse: YaciGetAddressBalanceDto[] = await getAddressBalanceData.data;
    return getAddressBalanceDataArrayResponse;
  };

  const getAddressAmounts = async (address: unknown) => {
    const getAddressAmountsData = await yaciAggregatorApi().getAddressAmounts(address);
    const getAddressAmountsDataArrayResponse: YaciGetAddressAmountsDto[] = await getAddressAmountsData.data;
    return getAddressAmountsDataArrayResponse;
  };

  return {
    getAddressBalance,
    getAddressAmounts,
  };
}
