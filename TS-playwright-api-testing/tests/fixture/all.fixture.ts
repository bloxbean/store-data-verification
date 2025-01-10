import { ApiFixtureType, apiFixture } from "@api-fixture/api.fixture";
import { test as baseTest } from "@playwright/test";

const test = baseTest.extend<ApiFixtureType>({
  ...apiFixture,
});

export default test;
export const { expect } = test;
