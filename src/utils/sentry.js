import * as Sentry from "@sentry/nextjs";

export const startSentryTransaction = (name, op = "api") => {
  return Sentry.startTransaction({
    op,
    name,
  });
};

export const captureApiError = (error, endpoint, additionalTags = {}) => {
  Sentry.captureException(error, {
    tags: {
      endpoint,
      ...additionalTags,
    },
  });
};

export const logApiSuccess = (data, endpoint, additionalData = {}) => {
  Sentry.addBreadcrumb({
    category: "api",
    message: `${endpoint} request successful`,
    level: "info",
    data: {
      endpoint,
      ...data,
      ...additionalData,
    },
  });
};

export const logFaxSuccess = (data, additionalData = {}) => {
  Sentry.addBreadcrumb({
    category: "fax",
    message: "Fax sent successfully",
    level: "info",
    data: {
      faxId: data.id,
      status: data.status,
      ...additionalData,
    },
  });
}; 