import AuthSystemInterface from '../AuthSystem/AuthSystemInterface';
import { buildEndpointFor, getFrom } from '../fetch-helpers';
import GenericSystem from '../GenericSystem';
import ConnectionSystemInterface from './ConnectionSystemInterface';

export default class ConnectionSystem extends GenericSystem {
  constructor() {
    super();
    this.headers = {};
  }

  implementing() {
    return ConnectionSystemInterface;
  }

  #authSystem() {
    return this.parent.systemImplementing(AuthSystemInterface);
  }

  async #authorizationHeader() {
    const { token } = await this.#authSystem().getAuthInfo();
    if (!token) return {};
    return { authorization: `Bearer ${token}` };
  }

  async #buildHeaders() {
    return { ...this.headers, ...await this.#authorizationHeader() };
  }

  async get(resource) {
    return getFrom(buildEndpointFor(...resource), await this.#buildHeaders());
  }
}
