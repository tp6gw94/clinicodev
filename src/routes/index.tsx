import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { usePolicyholder } from "#/modules/Policyholder/hooks/usePolicyholder.ts";
import PolicyholderTree from "#/modules/Policyholder/PolicyholderTree";

const placeholdersSearchSchema = z.object({
  code: z.coerce.string().optional().catch(undefined),
});

export const Route = createFileRoute("/")({
  validateSearch: placeholdersSearchSchema,
  component: Index,
});

function Index() {
  const { code } = Route.useSearch();

  const { isFetching, isError, data, handleSearchTopNode, handleSearchSubmit } =
    usePolicyholder({ code });

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          className="border text-sm leading-none text-gray-600 bg-white rounded w-full px-10 py-4"
          placeholder="Search by code"
          type="search"
          name="code"
          defaultValue={code}
        />
      </form>
      {isError && <div>Error</div>}
      {isFetching && <div>Loading...</div>}
      {data && (
        <PolicyholderTree data={data} onClickTopNode={handleSearchTopNode} />
      )}
    </div>
  );
}
