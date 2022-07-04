export const BASE_URL = 'BASE_URL';
export const AUTHENTICATION_METHOD = 'AUTHENTICATION_METHOD';
export const GATEWAY_HEADERS = 'GATEWAY_HEADERS';
export const SONGS_URL = 'SONGS_URL';
export const FIREBASE_GOOGLE_WEB_CLIENT_ID = 'FIREBASE_GOOGLE_WEB_CLIENT_ID';
export const FIREBASE_AUTH_METHOD = 'firebase';

export const settings = {
  [SONGS_URL]: process.env.SONGS_URL,
  [BASE_URL]: process.env.BASE_URL,
  [AUTHENTICATION_METHOD]: process.env.AUTHENTICATION_METHOD,
  [FIREBASE_GOOGLE_WEB_CLIENT_ID]: process.env.FIREBASE_GOOGLE_WEB_CLIENT_ID,
  [GATEWAY_HEADERS]: {
    'x-api-key': process.env.APP_GATEWAY_API_KEY,
  },
};

console.log(settings);
const getFromSettings = (aProperty) => settings[aProperty];

export default getFromSettings;
console.log(settings);
