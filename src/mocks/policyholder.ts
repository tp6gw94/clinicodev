import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";

import type { Policyholder, RootPolicyholder } from "#/types/Policyholder.ts";

const cached = new Map<string, RootPolicyholder>();

const aPolicyholder = (introducerCode?: string): Policyholder => {
  return {
    code: faker.string.nanoid(6),
    name: faker.person.fullName(),
    registration_date: faker.date.past(),
    introducer_code: introducerCode ?? faker.string.nanoid(6),
  };
};

const children = (introducerCode: string) =>
  faker.helpers.multiple(
    () => aPolicyholder(Math.random() > 0.3 ? introducerCode : undefined),
    { count: 7 },
  );

export const policyholderHandlers = [
  http.get("/api/policyholders", ({ request }) => {
    const url = new URL(request.url);

    const code = url.searchParams.get("code");
    if (!code) {
      return HttpResponse.error();
    }

    const data = {
      ...aPolicyholder(),
      code,
      l: children(code),
      r: children(code),
    };
    cached.set(code, data);

    return HttpResponse.json(data);
  }),
  http.get<{ code: string }>("/api/policyholders/:code/top", ({ params }) => {
    const { code } = params;
    const node = cached.get(code);

    const topNode: RootPolicyholder = {
      ...aPolicyholder(),
      code: node?.introducer_code || faker.string.nanoid(6),
      l: children(code),
      r: [],
    };
    if (!node) {
      return HttpResponse.error();
    }

    topNode.r = (() => {
      const { l, r, ...policyholder } = node;
      const result: Policyholder[] = [policyholder];

      for (let i = 0; i < 3; i++) {
        const left = l.shift();
        const right = r.shift();
        result.push(left!);
        result.push(right!);
      }
      return result;
    })();

    cached.set(topNode.code, topNode);

    return HttpResponse.json(topNode);
  }),
];
