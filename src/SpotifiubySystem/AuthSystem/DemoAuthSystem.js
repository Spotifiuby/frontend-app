import AuthSystemBehavior from './AuthSystemBehavior';

export default class DemoAuthSystem extends AuthSystemBehavior {
  constructor() {
    super();
    this.token = '';
  }

  getToken() {
    return this.token;
  }

  login({ email, password }) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolutionFunc, _) => {
      const token = email + password;
      this.token = token;
      this.registerSuccessfullLogin({ token, email });
      resolutionFunc({ token });
    });
  }

  register() {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolutionFunc, _) => {
      resolutionFunc();
    });
  }
}
