import { openapi } from "@orpc/openapi";
import { createIssueInput, issueDto } from "../schemas/issue";
import { base } from "./base";

export const createIssue = base
  .meta(
    openapi({
      method: "POST",
      path: "/projects/{projectId}/issues",
      tags: ["issues"],
      summary: "Create an issue",
      successStatus: 201,
    }),
  )
  .input(createIssueInput)
  .output(issueDto);
