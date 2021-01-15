export const request = {
  NONE: 0,
  REQUESTING: 1,
  SUCCESS: 2,
  ERROR: 3,
};

export const role = {
  ADMIN: 'admin',
  TENANT: 'tenant',
  LANDLORD: 'landlord',
};

export const userTypes = {
  TENANT: 'tenant',
  LANDLORD: 'landlords',
};

export const moveInScenarioTypes = {
  SEND: 'SEND',
  ATTACH: 'ATTACH',
  NO_NEED: 'NO_NEED',
};

export const languageSwitchOptions = {
  EN: 'en',
  NL: 'nl',
};

export const toastTypes = {
  SUCCESS: { appearance: 'success' },
  WARNING: { appearance: 'warning' },
  ERROR: { appearance: 'error' },
  INFO: { appearance: 'info' },
};

export const fbStatusTypes = {
  CONNECTED: 'connected',
  NOT_AUTHORIZED: 'not_authorized',
  UNKNOWN: 'unknown',
};

export const applicationStatusTypes = {
  NEW: 'new',
  REJECTED: 'rejected',
  CONSIDERED: 'considered',
  PROCESSING: 'processing',
  AWARDED: 'awarded',
  FAILED: 'failed',
  COMPLETED: 'completed',
};

export const eventTypes = {
  USER_CONNECTED: 'USER_CONNECTED',
  USER_DISCONNECTED: 'USER_DISCONNECTED',
  MESSAGE: 'MESSAGE',
  SEND_MESSAGE: 'SEND_MESSAGE',
};
