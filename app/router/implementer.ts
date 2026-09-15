import { implement } from "@orpc/server";
import { contract } from "../contract";

export type AppContext = {
  headers: Pick<Headers, "get">;
};

export const implementer = implement(contract).$context<AppContext>();
