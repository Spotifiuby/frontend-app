import getFromSettings, { BASE_URL } from './settings';

export function fetchFrom(url, method, options = {}) {
  return fetch(url, {
    ...options,
    method,
  });
}

export function fetchObject(url, method, object, headers) {
  return fetchFrom(url, method, {
    body: JSON.stringify(object),
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

export function getFrom(url, headers = {}) {
  return fetchFrom(url, 'GET', headers);
}

export const buildEndpointFor = (...resource) => {
  return `${getFromSettings(BASE_URL)}/${resource.join('/')}`;
};
