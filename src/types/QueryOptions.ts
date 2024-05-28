import type { UndefinedInitialDataOptions } from "@tanstack/react-query";

export type QueryOptions<T> = Omit<
  UndefinedInitialDataOptions<T>,
  "queryKey" | "queryFn"
>;
