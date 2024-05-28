import { setupWorker } from "msw/browser";

import { policyholderHandlers } from "#/mocks/policyholder.ts";

export const worker = setupWorker(...policyholderHandlers);
