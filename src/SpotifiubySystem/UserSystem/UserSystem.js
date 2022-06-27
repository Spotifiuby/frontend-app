import AuthSystemInterface from '../AuthSystem/AuthSystemInterface';
import ConnectionSystemInterface from '../ConnectionSystem/ConnectionSystemInterface';
import GenericSystem from '../GenericSystem';
import UserSystemInterface from './UserSystemInterface';

const ROOT = 'users-api';
const RESOURCE = 'users';
export const UNDEFINED_USER = 'UNDEFINED_USER';
export const INVALID_USER = 'INVALID_USER';
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

  isValid(userType) {
    return userType && userType !== INVALID_USER && userType !== UNDEFINED_USER;
  }

  getUsers(query) {
    console.log('getUsers: ', query);
    let p1 = this.#connectionSystem().getJson([ROOT, RESOURCE], { email: query, is_active: true });
    let p2 = this.#connectionSystem().getJson([ROOT, RESOURCE], { first_name: query, is_active: true });
    let p3 = this.#connectionSystem().getJson([ROOT, RESOURCE], { last_name: query, is_active: true });
    let p4 =this.#connectionSystem().getJson([ROOT, RESOURCE], { email: query, is_active: true });

    return Promise.all([p1, p2, p3, p4]).then((responses) => {return responses.flat()})
  }

  getUserInfoFrom(anEmail) {
    return this.#connectionSystem().getJson([ROOT, RESOURCE, anEmail]);
  }

  getSubscriptionInfoFrom(anEmail) {
    const json = this.#connectionSystem().getJson([ROOT, RESOURCE, anEmail, 'subscriptions']);
    json.then(console.log);
    return json;
  }

  async userType() {
    const { email } = await this.#authSystem().getAuthInfo();

    return this.#connectionSystem().get([ROOT, RESOURCE, email])
      .then((response) => {
        if (response.status === 404) {
          return { user_type: UNDEFINED_USER };
        }
        return response.json();
      })
      .then((json) => {
        const userType = json.user_type;
        if (!json.is_active && userType !== UNDEFINED_USER) {
          return INVALID_USER;
        }
        if (REGISTERED_USERS.includes(userType)) {
          return userType;
        }
        if (userType === undefined) {
          return INVALID_USER;
        }

        return UNDEFINED_USER;
      })
      .catch(() => INVALID_USER);
  }

  async completeUserRegistrationWith({ firstName, lastName, isUploader }) {
    const { email } = await this.#authSystem().getAuthInfo();
    await this.#connectionSystem().postJson([ROOT, RESOURCE], {
      email,
      first_name: firstName,
      last_name: lastName,
      user_type: (isUploader ? UPLOADER_USER : LISTENER_USER),
    });
  }

  update(originalUserInfo, newUserInfo) {
    return this.#connectionSystem().putJson([ROOT, RESOURCE, originalUserInfo.email], {
      first_name: newUserInfo.firstName,
      last_name: newUserInfo.lastName,
    });
  }

  createSubscription(email, type) {
    return this.#connectionSystem().postJson([ROOT, RESOURCE, 'subscriptions'], {
      user_id: email,
      subscription_type_id: type,
    });
  }

  updateSubscription(email, type) {
    return this.#connectionSystem().putJson([ROOT, RESOURCE, email, 'subscriptions'], {
      user_id: email,
      subscription_type_id: type,
    });
  }

  removeSubscription(email) {
    return this.#connectionSystem().doDeleteRequest([ROOT, RESOURCE, email, 'subscriptions']);
  }
}
