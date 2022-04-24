import getFromSettings, { BASE_URL } from './settings';

export function fetchObject(url, method, object, headers) {
  return fetch(url, {
    body: JSON.stringify(object),
    method,
    headers,
  });
}

export function fetchJsonFrom(fetchedObject) {
  return fetchedObject.then((response) => response.json());
}

export function postJsonObject(url, object, headers = {}) {
  const newHeader = { ...headers, 'Content-Type': 'application/json' };
  return fetchObject(url, 'POST', object, newHeader);
}

export const buildEndpointFor = (resource) => `${getFromSettings(BASE_URL)}/${resource}`;
