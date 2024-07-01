import { test as baseTest } from '@playwright/test';
import { ApiFixtureType, apiFixture } from '@fixture/api.fixture';

const test = baseTest.extend< ApiFixtureType >({
  ...apiFixture,
});

export default test;
export const { expect } = test;
