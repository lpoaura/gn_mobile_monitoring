import { AppError } from "../errors/_models/appError.model";

function readResponse(response: Response) {
  if (response.headers.get("content-length") === "0") {
    return Promise.resolve(undefined);
  }

  const contentType = response.headers.get("content-type");
  if (contentType) {
    if (contentType.startsWith("application/json")) {
      return response.json();
    } else if (contentType.startsWith("multipart/form-data")) {
      return response.formData();
    }
  }
  return response.text();
}

function executeRequest<T>(url: string, fetchOptions: Partial<Request>) {
  return fetch(url, fetchOptions)
    .then(
      response =>
        readResponse(response).then(
          data => ({ data, response }),
          () => ({ data: null, response }),
        ),
      () => {
        throw { key: "errors.global.network" };
      },
    )
    .then(({ data, response }) => {
      let error: AppError | undefined;

      try {
        //should not be done here, the api should return the right content type instead
        data = JSON.parse(data);
      } catch (e) {}
      if (response.status >= 400) {
        error = {
          key: data?.type ? "errors.api." + data.type : "errors.global.unknownLight",
          message: data?.msg,
          code: response.status,
        };
      }

      if (error) {
        throw error;
      }

      return { data, response };
    }) as Promise<{ data: T; response: Response }>;
}

function executeRequestWithBody<T>(
  url: string,
  fetchOptions: Partial<Request & { body: any }>,
  body: any,
  isFormData: boolean,
) {
  const headers = fetchOptions?.headers ?? new (Headers ?? (global as any).Headers)();
  if (!isFormData && !headers.get("Content-Type")) {
    headers.append("Content-Type", "application/json");
  }
  if (typeof body !== "string" && !isFormData) {
    body = JSON.stringify(body);
  }
  return executeRequest<T>(url, { body, headers, ...fetchOptions });
}

export const fetchUtils = {
  get<T>(url: string, fetchOptions?: Partial<Request>) {
    return executeRequest<T>(url, { ...fetchOptions, method: "GET" });
  },

  patch<T>(url: string, body: any = {}, isFormData = false, fetchOptions?: Partial<Request>) {
    return executeRequestWithBody<T>(url, { ...fetchOptions, method: "PATCH" }, body, isFormData);
  },

  post<T>(url: string, body: any = {}, isFormData = false, fetchOptions?: Partial<Request>) {
    return executeRequestWithBody<T>(url, { ...fetchOptions, method: "POST" }, body, isFormData);
  },

  put<T>(url: string, body: any = {}, isFormData = false, fetchOptions?: Partial<Request>) {
    return executeRequestWithBody<T>(url, { ...fetchOptions, method: "PUT" }, body, isFormData);
  },

  delete<T>(url: string, fetchOptions?: Partial<Request>) {
    return executeRequest<T>(url, {
      ...fetchOptions,
      method: "DELETE",
    });
  },
};
