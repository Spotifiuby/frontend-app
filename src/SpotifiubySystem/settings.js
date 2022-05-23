export const BASE_URL = 'BASE_URL';
export const LOCAL_BASE_URL = 'LOCAL_BASE_URL';
export const AUTHENTICATION_METHOD = 'AUTHENTICATION_METHOD';
export const FIREBASE_AUTH_METHOD = 'firebase';

export const settings = {
  [LOCAL_BASE_URL]: process.env.LOCAL_BASE_URL,
  [BASE_URL]: process.env.BASE_URL,
  [AUTHENTICATION_METHOD]: process.env.AUTHENTICATION_METHOD,
};

const getFromSettings = (aProperty) => settings[aProperty];

export default getFromSettings;
console.log(settings);
