import { buildEndpointFor, fetchJsonFrom, postJsonObject } from '../fetch-helpers';

export default function login({ username, password }) {
  return fetchJsonFrom(
    postJsonObject(
      buildEndpointFor('login'),
      { username, password },
    ),
  );
}
