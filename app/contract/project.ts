import { getProjectInput, projectDto } from "../schemas/project";
import { openapi } from "@orpc/openapi";
import { base } from "./base";

export const getProject = base
  .meta(
    openapi({
      method: "GET",
      path: "/projects/{id}",
      tags: ["projects"],
      summary: "Get a project by ID",
    }),
  )
  .input(getProjectInput)
  .output(projectDto);
