export * from "./regex";

export const METHODS_THAT_NEED_CSRF = ["POST", "PUT", "DELETE", "PATCH"];

export const CSRF_COOKIE_NAME = "_csrf";
export const CSRF_HEADER_NAME = "X-CSRF-TOKEN";
