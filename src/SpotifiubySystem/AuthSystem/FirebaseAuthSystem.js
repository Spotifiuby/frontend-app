import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
} from 'firebase/auth';
import AuthSystemBehavior from './AuthSystemBehavior';
import firebaseApp from './Firebase/config';

export default class FirebaseAuthSystem extends AuthSystemBehavior {
  constructor() {
    super();
    this.auth = getAuth(firebaseApp);
  }

  // async getAuthInfo() {
  //   const { email } = await super.getAuthInfo();
  //   const token = this.auth.currentUser ? await this.auth.currentUser.getIdToken(true) : '';
  //   return { token, email };
  // }

  login({ email, password }) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken();
        this.registerSuccessfullLogin({ token, email });
        return { token };
      })
      .catch((error) => { throw new Error(error.code); });
  }

  register({ email, password }) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .catch((error) => { throw new Error(error.code); });
  }

  logOut() {
    super.logOut();
    this.auth.signOut();
  }
}
