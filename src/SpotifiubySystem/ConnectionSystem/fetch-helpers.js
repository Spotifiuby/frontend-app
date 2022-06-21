import getFromSettings, { BASE_URL } from '../settings';

export function fetchFrom(url, method, options = {}) {
  return fetch(url, {
    ...options,
    method,
  });
}

export function fetchObject(url, method, object, headers) {
  return fetchFrom(url, method, {
    body: object,
    headers,
  });
}

export function jsonFrom(fetchedObject) {
  return fetchedObject.then((response) => response.json());
}

export function post(url, object, headers = {}) {
  return fetchObject(url, 'POST', object, headers);
}

export function put(url, object, headers = {}) {
  return fetchObject(url, 'PUT', object, headers);
}

export function doDelete(url, headers = {}) {
  console.log(headers)
  return fetchObject(url, 'DELETE', null, headers);
}

export function putJsonObject(url, object, headers = {}) {
  const newHeader = { ...headers, 'Content-Type': 'application/json' };
  return put(url, JSON.stringify(object), newHeader);
}

export function postJsonObject(url, object, headers = {}) {
  const newHeader = { ...headers, 'Content-Type': 'application/json' };
  return fetchObject(url, 'POST', JSON.stringify(object), newHeader);
}

export function getFrom(url, headers = {}, params = undefined) {
  let fullUrl = url;
  if (params !== undefined) {
    fullUrl = `${url}?${new URLSearchParams(params)}`;
  }
  return fetchFrom(fullUrl, 'GET', { headers });
}

export const buildEndpointFor = (...resource) => {
  return `${getFromSettings(BASE_URL)}/${resource.join('/')}`;
};
