export const BASE_URL = 'BASE_URL';
export const LOCAL_BASE_URL = 'LOCAL_BASE_URL';
export const AUTHENTICATION_METHOD = 'AUTHENTICATION_METHOD';
export const GATEWAY_HEADERS = 'GATEWAY_HEADERS';
export const LOCAL_SONGS_URL = 'LOCAL_SONGS_URL';
export const FIREBASE_GOOGLE_WEB_CLIENT_ID = 'FIREBASE_GOOGLE_WEB_CLIENT_ID';
export const FIREBASE_AUTH_METHOD = 'firebase';

export const settings = {
  [LOCAL_SONGS_URL]: process.env.LOCAL_SONGS_URL,
  [LOCAL_BASE_URL]: process.env.LOCAL_BASE_URL,
  [BASE_URL]: process.env.BASE_URL,
  [AUTHENTICATION_METHOD]: process.env.AUTHENTICATION_METHOD,
  [FIREBASE_GOOGLE_WEB_CLIENT_ID]: process.env.FIREBASE_GOOGLE_WEB_CLIENT_ID,
  [GATEWAY_HEADERS]: {
    'x-api-key': process.env.APP_GATEWAY_API_KEY,
  },
};

const getFromSettings = (aProperty) => settings[aProperty];

console.log(settings);
export default getFromSettings;
