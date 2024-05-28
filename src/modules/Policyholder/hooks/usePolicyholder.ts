import { useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";

import {
  useQueryPolicyholders,
  useQueryTopPolicyholders,
} from "#/api/policyholder.ts";

const formSchema = z.object({
  code: z.string(),
});

export const usePolicyholder = ({ code }: { code?: string }) => {
  const navigate = useNavigate();

  const [searchTopNode, setSearchTopNode] = useState<undefined | string>();

  const queryPolicyholders = useQueryPolicyholders(code, {
    enabled: !!code,
  });
  const queryTopPolicyholders = useQueryTopPolicyholders(searchTopNode, {
    enabled: !!searchTopNode,
  });
  useEffect(() => {
    setSearchTopNode(undefined);
  }, [code]);

  const searchCurrentNode = (code: string) => {
    setSearchTopNode(undefined);
    navigate({ search: { code } });
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { code } = formSchema.parse(Object.fromEntries(formData.entries()));
    if (!code) {
      return void 0;
    }

    searchCurrentNode(code);
  };

  const handleSearchTopNode = (code: string) => {
    setSearchTopNode(code);
  };

  return {
    ...(searchTopNode ? queryTopPolicyholders : queryPolicyholders),
    handleSearchSubmit,
    handleSearchTopNode,
  };
};
