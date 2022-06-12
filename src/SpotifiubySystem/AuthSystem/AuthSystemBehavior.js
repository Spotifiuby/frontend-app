import GenericSystem from '../GenericSystem';
import PersistentSystemInterface from '../PersistentSystem/PersistentSystemInterface';
import AuthSystemInterface from './AuthSystemInterface';

const AUTH_INFORMATION_KEY = '@AUTH_INFORMATION_KEY';
export default class AuthSystemBehavior extends GenericSystem {
  implementing() {
    return AuthSystemInterface;
  }

  registerSuccessfullLogin(authInfo) {
    return this.#persistAuthInfo(authInfo);
  }

  #persistentSystem() {
    return this.parent.systemImplementing(PersistentSystemInterface);
  }

  #persistAuthInfo(authInfo) {
    return this.#persistentSystem().storeOn(AUTH_INFORMATION_KEY, authInfo);
  }

  async getAuthInfo() {
    try {
      return await this.#persistentSystem().readFrom(AUTH_INFORMATION_KEY);
    } catch (e) {
      return {};
    }
  }

  logOut() {
    this.#persistentSystem().remove(AUTH_INFORMATION_KEY);
  }
}
