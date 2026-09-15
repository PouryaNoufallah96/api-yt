import { createIssue } from "./issue";
import { getProject } from "./project";

export const contract = {
  project: {
    get: getProject,
  },
  issue: {
    create: createIssue,
  },
};
