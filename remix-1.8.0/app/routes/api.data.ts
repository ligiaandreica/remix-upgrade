import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { cors } from "remix-utils";

const ALLOWED_CORS_ORIGINS = [/^https?:\/\/localhost:([0-9]*)$/];
const ALLOWED_METHODS = ["GET", "POST"];

export function corsJsonResponse<T>(
  request: Request,
  data: T,
  responseInit: ResponseInit = {}
): Promise<Response> {
  return cors(request, json(data, responseInit), {
    origin: ALLOWED_CORS_ORIGINS,
    methods: ALLOWED_METHODS,
  });
}

export const loader: LoaderFunction = async ({ request }) => {
  if (request.method === "OPTIONS") {
    return corsJsonResponse(request, {}, {});
  }
  const response = { hello: "world" };
  return corsJsonResponse(request, response, { statusText: "ok", status: 200 });
};
