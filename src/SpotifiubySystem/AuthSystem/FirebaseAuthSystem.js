import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, signInWithCredential,
} from 'firebase/auth';
import AuthSystemBehavior from './AuthSystemBehavior';
import firebaseApp from './Firebase/config';
import * as Facebook from 'expo-facebook'

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
  
  // useFacebookAuth() {
  //   const provider = new FacebookAuthProvider();
  //   return signInWithPopup(this.auth, provider)
  //     .catch((error) => { 
  //       throw new Error(error.code);
  //     });
  // }

  async useFacebookAuth() {
    await Facebook.initializeAsync({ 
      appId: '590592872502441',
    })
    try {
      const {
        type,
        token, 
        expirationDate,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      })
      if (type === 'success') {
        const credential = FacebookAuthProvider.credential( accessToken=token );
        return signInWithCredential(credential)
          .catch((error) => { throw new Error(error.code); });
      }
    } catch ({message}) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

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
