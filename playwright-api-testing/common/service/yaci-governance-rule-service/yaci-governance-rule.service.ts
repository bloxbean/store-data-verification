import { YaciGetRatificationResultHardForkIntiationDto } from "@common/dtos/yaci/governance-rule/yaci-get-ratification-result-for-hard-fork-intiation-action.dto";
import { YaciGetRatificationResultForNewConsitutionActionDto } from "@common/dtos/yaci/governance-rule/yaci-get-ratification-result-for-new-consitution-action.dto";
import { YaciGetRatificationResultNoConfidenceDto } from "@common/dtos/yaci/governance-rule/yaci-get-ratification-result-for-no-confidence.dto";
import { YaciGetRatificationResultParameterChangeDto } from "@common/dtos/yaci/governance-rule/yaci-get-ratification-result-for-parameter-change.dto";
import { YaciGetRatificationResultForTreasuryWithdrawalsDto } from "@common/dtos/yaci/governance-rule/yaci-get-ratification-result-for-treasury-withdrawals-action.dto";
import { YaciGetRatificationResultForUpdateCommitteeDto } from "@common/dtos/yaci/governance-rule/yaci-get-ratification-result-for-update-committee-action.dto";
import { YaciGetRatificationResultDto } from "@common/dtos/yaci/governance-rule/yaci-get-ratification-result.dto";
import { yaciGovernanceRuleApi } from "./yaci-governance-rule.api";

export async function yaciGovernanceRuleService() {
  const getGovActionRatifier = async () => {
    const getGovActionRatifierData =
      await yaciGovernanceRuleApi().getGovActionRatifier();
    const getGovActionRatifierDataArrayResponse: YaciGetRatificationResultDto[] =
      await getGovActionRatifierData.data;
    return getGovActionRatifierDataArrayResponse;
  };

  const getRatificationResult = async () => {
    const getRatificationResultData =
      await yaciGovernanceRuleApi().getRatificationResult();
    const getRatificationResultDataArrayResponse: YaciGetRatificationResultDto[] =
      await getRatificationResultData.data;
    return getRatificationResultDataArrayResponse;
  };

  const getRatificationResultForNoConfidenceAction = async () => {
    const getRatificationResultForNoConfidenceActionResultData =
      await yaciGovernanceRuleApi().getRatificationResultForNoConfidenceAction();
    const getRatificationResultForNoConfidenceActionResultDataArrayResponse: YaciGetRatificationResultNoConfidenceDto[] =
      await getRatificationResultForNoConfidenceActionResultData.data;
    return getRatificationResultForNoConfidenceActionResultDataArrayResponse;
  };

  const getRatificationResultForUpdateCommitteeAction = async () => {
    const getRatificationResultForUpdateCommitteeActionResultData =
      await yaciGovernanceRuleApi().getRatificationResultForUpdateCommitteeAction();
    const getRatificationResultForUpdateCommitteeActionResultDataArrayResponse: YaciGetRatificationResultForUpdateCommitteeDto[] =
      await getRatificationResultForUpdateCommitteeActionResultData.data;
    return getRatificationResultForUpdateCommitteeActionResultDataArrayResponse;
  };

  const getRatificationResultForHardForkInitiationAction = async () => {
    const getRatificationResultForHardForkInitiationActionResultData =
      await yaciGovernanceRuleApi().getRatificationResultForHardForkInitiationAction();
    const getRatificationResultForHardForkInitiationActionResultDataArrayResponse: YaciGetRatificationResultHardForkIntiationDto[] =
      await getRatificationResultForHardForkInitiationActionResultData.data;
    return getRatificationResultForHardForkInitiationActionResultDataArrayResponse;
  };

  const getRatificationResultForNewConstitutionAction = async () => {
    const getRatificationResultForNewConstitutionActionResultData =
      await yaciGovernanceRuleApi().getRatificationResultForNewConstitutionAction();
    const getRatificationResultForHardForkInitiationActionResultDataArrayResponse: YaciGetRatificationResultForNewConsitutionActionDto[] =
      await getRatificationResultForNewConstitutionActionResultData.data;
    return getRatificationResultForHardForkInitiationActionResultDataArrayResponse;
  };

  const getRatificationResultForTreasuryWithdrawalsAction = async () => {
    const getRatificationResultForTreasuryWithdrawalsActionResultData =
      await yaciGovernanceRuleApi().getRatificationResultForTreasuryWithdrawalsAction();
    const getRatificationResultForTreasuryWithdrawalsActionResultDataArrayResponse: YaciGetRatificationResultForTreasuryWithdrawalsDto[] =
      await getRatificationResultForTreasuryWithdrawalsActionResultData.data;
    return getRatificationResultForTreasuryWithdrawalsActionResultDataArrayResponse;
  };

  const getRatificationResultForParameterChangeAction = async () => {
    const getRatificationResultForParameterChangeActionResultData =
      await yaciGovernanceRuleApi().getRatificationResultForParameterChangeAction();
    const getRatificationResultForParameterChangeActionResultDataArrayResponse: YaciGetRatificationResultParameterChangeDto[] =
      await getRatificationResultForParameterChangeActionResultData.data;
    return getRatificationResultForParameterChangeActionResultDataArrayResponse;
  };

  return {
    getGovActionRatifier,
    getRatificationResult,
    getRatificationResultForNoConfidenceAction,
    getRatificationResultForUpdateCommitteeAction,
    getRatificationResultForHardForkInitiationAction,
    getRatificationResultForNewConstitutionAction,
    getRatificationResultForTreasuryWithdrawalsAction,
    getRatificationResultForParameterChangeAction,
  };
}
