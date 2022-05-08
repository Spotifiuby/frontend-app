export const BASE_URL = 'BASE_URL';
export const LOCAL_BASE_URL = 'LOCAL_BASE_URL';

export const settings = {
  [BASE_URL]: process.env.BASE_URL,
  [LOCAL_BASE_URL]: process.env.LOCAL_BASE_URL,
};

console.log(settings);
const getFromSettings = (aProperty) => settings[aProperty];

export default getFromSettings;
