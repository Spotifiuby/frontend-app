import AuthSystemInterface from '../AuthSystem/AuthSystemInterface';
import ConnectionSystemInterface from '../ConnectionSystem/ConnectionSystemInterface';
import GenericSystem from '../GenericSystem';
import UserSystemInterface from './UserSystemInterface';

const ROOT = 'users-api';
export const UNDEFINED_USER = 'UNDEFINED_USER';
export const UPLOADER_USER = 'uploader';
export const ADMIN_USER = 'admin'; // En un principio, no usaría la app
export const LISTENER_USER = 'listener';

const REGISTERED_USERS = [UPLOADER_USER, ADMIN_USER, LISTENER_USER];

export default class UserSystem extends GenericSystem {
  implementing() {
    return UserSystemInterface;
  }

  #connectionSystem() {
    return this.parent.systemImplementing(ConnectionSystemInterface);
  }

  #authSystem() {
    return this.parent.systemImplementing(AuthSystemInterface);
  }

  async userType() {
    const { email } = await this.#authSystem().getAuthInfo();

    return this.#connectionSystem().get([ROOT, email])
      .then((response) => {
        if (response.status === 404) {
          return UNDEFINED_USER;
        }
        return response.json();
      })
      .then(({ userType }) => {
        if (REGISTERED_USERS.includes(userType)) {
          return userType;
        }
        return UNDEFINED_USER;
      })
      .catch(() => UNDEFINED_USER);
  }
}
