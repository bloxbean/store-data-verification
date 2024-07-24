import { yaciAggregatorApi } from "./yaci-aggregator.api";
import { YaciGetAddressAmountsDto } from "@common/dtos/yaci-aggregator/yaci-get-address-amounts.dto";
import { YaciGetAddressBalanceDto } from "@common/dtos/yaci-aggregator/yaci-get-address-balance.dto";

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
