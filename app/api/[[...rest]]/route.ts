import { router } from "@/app/router";
import { SmartCoercionHandlerPlugin } from "@orpc/json-schema";
import { OpenAPIGenerator } from "@orpc/openapi";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferenceHandlerPlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { ZodToJsonSchemaConverter } from "@orpc/zod";

const zodToJsonSchema = new ZodToJsonSchemaConverter();

const generator = new OpenAPIGenerator({
  converters: [zodToJsonSchema],
});

const handler = new OpenAPIHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
  plugins: [
    new SmartCoercionHandlerPlugin({
      converters: [zodToJsonSchema],
    }),
    new OpenAPIReferenceHandlerPlugin({
      spec: () =>
        generator.generate(router, {
          base: {
            info: {
              title: "Project API",
              version: "1.0.0",
            },
            servers: [{ url: "/api" }],
          },
        }),
    }),
  ],
});

async function handleRequest(request: Request) {
  const { matched, response } = await handler.handle(request, {
    prefix: "/api",
    context: {
      headers: request.headers,
    },
  });

  if (matched) {
    return response;
  }

  return new Response("Not found", { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
