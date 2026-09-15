import { userFromAuthorization } from "../lib/auth";
import { implementer } from "./implementer";

export const requireAuth = implementer.middleware(
  ({ context, next, errors }) => {
    const user = userFromAuthorization(context.headers);

    if (!user) {
      throw errors.UNAUTHORIZED();
    }

    return next({ context: { user } });
  },
);
