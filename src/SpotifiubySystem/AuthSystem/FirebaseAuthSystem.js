import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithCredential,
} from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-auth-session/providers/google';
import AuthSystemBehavior from './AuthSystemBehavior';
import firebaseApp from './Firebase/config';

WebBrowser.maybeCompleteAuthSession();

export default class FirebaseAuthSystem extends AuthSystemBehavior {
  constructor() {
    super();
    this.auth = getAuth(firebaseApp);
    this.authInfo = {};
  }

  // async getAuthInfo() {
  //   const { email } = await super.getAuthInfo();
  //   const token = this.auth.currentUser ? await this.auth.currentUser.getIdToken(true) : '';
  //   return { token, email };
  // }

  async getAuthInfo() {
    return this.authInfo;
  }

  async useFacebookAuth(idToken) {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      return await signInWithCredential(this.auth, credential);
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  /*async useFacebookAuth() {
    await Facebook.initializeAsync({
      appId: '590592872502441',
    });
    try {
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const credential = FacebookAuthProvider.credential(token);
        return await signInWithCredential(this.auth, credential)
          .catch((error) => { throw new Error(error.code); });
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }*/

  useAuthentication(setIsAuthenticated) {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const { email } = user;
        this.authInfo = { token, email };
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }

  login({ email, password }) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken();
        this.authInfo = { email, token };
        return { token };
      })
      .catch((error) => { throw new Error(error.code); });
  }

  register({ email, password }) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .catch((error) => { throw new Error(error.code); });
  }

  logOut() {
    this.auth.signOut();
  }
}
