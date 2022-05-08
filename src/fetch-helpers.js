import getFromSettings, { BASE_URL, LOCAL_BASE_URL } from './settings';

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

export function jsonFrom(fetchedObject) {
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
  // TODO: Artilugio temporario hasta que esté el gateway
  let baseUrl = getFromSettings(BASE_URL);
  if (resource[0] === 'login' || resource[resource.length - 1] === 'cover') {
    baseUrl = getFromSettings(LOCAL_BASE_URL);
  }
  return `${baseUrl}/${resource.join('/')}`;
};
