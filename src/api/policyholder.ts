import { skipToken, useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { RootPolicyholder } from "#/types/Policyholder";
import type { QueryOptions } from "#/types/QueryOptions.ts";

const queryPolicyholders = async (code: string) => {
  const { data } = await axios.get<RootPolicyholder>("/api/policyholders", {
    params: {
      code,
    },
  });
  return data;
};

const queryTopPolicyholders = async (code: string) => {
  const { data } = await axios.get<RootPolicyholder>(
    `/api/policyholders/${code}/top`,
  );
  return data;
};

export interface PolicyholderQueryParams {
  code?: string;
  type?: "top" | "current";
}

export const useQueryPolicyholders = (
  code?: string,
  options?: QueryOptions<RootPolicyholder>,
) =>
  useQuery({
    queryKey: ["policyholders", code],
    queryFn: code ? () => queryPolicyholders(code) : skipToken,
    ...(options || {}),
  });

export const useQueryTopPolicyholders = (
  code?: string,
  options?: QueryOptions<RootPolicyholder>,
) => {
  return useQuery({
    queryKey: ["policyholders", "top", code],
    queryFn: code ? () => queryTopPolicyholders(code) : skipToken,
    ...(options || {}),
  });
};
