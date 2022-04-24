export const BASE_URL = 'BASE_URL';

export const settings = {
  [BASE_URL]: process.env.BASE_URL,
};

const getFromSettings = (aProperty) => settings[aProperty];

export default getFromSettings;
