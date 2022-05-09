import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
} from 'firebase/auth';
import firebaseApp from '../Firebase/config';

const auth = getAuth(firebaseApp);

export function login({ email, password }) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user.getIdToken()
        .then((token) => {
          return { token };
        });
    })
    .catch((error) => { throw new Error(error.code); });
}

export function register({ email, password }) {
  return createUserWithEmailAndPassword(auth, email, password)
    .catch((error) => { throw new Error(error.code); });
}
