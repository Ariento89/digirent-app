export const API_ASSET_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export const API_URL_WEBSOCKET = process.env.NEXT_PUBLIC_API_URL_WEBSOCKET;

export const API_TIMEOUT = 5000;

export const NO_VERIFICATION_NEEDED = 'NO_VERIFICATION_NEEDED';

export const NO_VERIFICATION_CONFIG = { params: NO_VERIFICATION_NEEDED };

export const UNAUTHORIZED_RESPONSE = ['Could not validate credentials', 'Not authenticated'];

export const HEADER_MULTIPART_FORM_DATA = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};
