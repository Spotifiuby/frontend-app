import { GoogleAuthProvider } from '@firebase/auth';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { Alert } from 'react-native';
import getFromSettings, { FIREBASE_GOOGLE_WEB_CLIENT_ID } from '../../SpotifiubySystem/settings';

maybeCompleteAuthSession();

function login(idToken) {
  console.log('Signing in with Google...', idToken);
  return GoogleAuthProvider.credential(idToken);
}

export async function loginWithGoogle(authWithGoogle) {
  try {
    const [credential] = await authWithGoogle();
    await login(credential);
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Something went wrong. Please try again later.');
  }
}
export default function useGoogleAuthentication() {
  // eslint-disable-next-line no-unused-vars
  const [request, _, promptAsync] = useIdTokenAuthRequest({
    webClientId: getFromSettings(FIREBASE_GOOGLE_WEB_CLIENT_ID),
    expoClientId: getFromSettings(FIREBASE_GOOGLE_WEB_CLIENT_ID),
  });

  async function prompt() {
    const response = await promptAsync();

    if (response?.type !== 'success') {
      throw new Error(response.type);
    }
    const credential = login(response.params.id_token);

    return [credential];
  }

  return [!!request, prompt];
}
