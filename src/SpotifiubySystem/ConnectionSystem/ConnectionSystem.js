import AuthSystemInterface from '../AuthSystem/AuthSystemInterface';
import {
  buildEndpointFor, doDelete, getFrom, jsonFrom, post, postJsonObject, putJsonObject,
} from './fetch-helpers';
import GenericSystem from '../GenericSystem';
import ConnectionSystemInterface from './ConnectionSystemInterface';

export default class ConnectionSystem extends GenericSystem {
  constructor(headers = {}) {
    super();
    this.headers = headers;
  }

  implementing() {
    return ConnectionSystemInterface;
  }

  #authSystem() {
    return this.parent.systemImplementing(AuthSystemInterface);
  }

  async #authorizationHeader() {
    const { token, email } = await this.#authSystem().getAuthInfo();
    if (!token) return {};
    return { authorization: `Bearer ${token}`, 'x-user-id': email };
  }

  async #buildHeaders() {
    return { ...this.headers, ...await this.#authorizationHeader() };
  }

  async get(resource, params = undefined) {
    return getFrom(buildEndpointFor(...resource), await this.#buildHeaders(), params);
  }

  getJson(resource, params = undefined) {
    return jsonFrom(this.get(resource, params));
  }

  async postJson(resource, data) {
    return postJsonObject(buildEndpointFor(...resource), data, await this.#buildHeaders());
  }

  async doDeleteRequest(resource) {
    return doDelete(buildEndpointFor(...resource), await this.#buildHeaders());
  }

  async post(resource, data, headers = {}) {
    return post(buildEndpointFor(...resource), data, { ...headers, ...await this.#buildHeaders() });
  }

  async putJson(resource, data, headers = {}) {
    return putJsonObject(
      buildEndpointFor(...resource),
      data,
      { ...headers, ...await this.#buildHeaders() },
    );
  }

  async withHeaders(request) {
    return { ...request, headers: await this.#buildHeaders() };
  }
}
