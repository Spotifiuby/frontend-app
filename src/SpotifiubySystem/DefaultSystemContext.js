import { createContext } from 'react';
import { Platform } from 'react-native';
import DemoAuthSystem from './AuthSystem/DemoAuthSystem';
import FirebaseAuthSystem from './AuthSystem/FirebaseAuthSystem';
import ConnectionSystem from './ConnectionSystem/ConnectionSystem';
import PersistentSystem from './PersistentSystem/PersistentSystem';
import getFromSettings, {
  AUTHENTICATION_METHOD, FIREBASE_AUTH_METHOD, GATEWAY_HEADERS,
} from './settings';
import SongsSystem from './SongsSystem/SongsSystem';
import SpotifiubySystem from './SpotifiubySystem';
import DefaultTranslationSystem from './TranslationSystem/DefaultTranslationSystem';
import UserSystem from './UserSystem/UserSystem';
import WebNotificationSystem from './NotificationSystem/WebNotificationSystem';
import AndroidNotificationSystem from './NotificationSystem/AndroidNotificationSystem';
import ChatsSystem from '../Components/Chats/ChatsSystem';

const SystemContext = createContext();

function buildDefaultRootSystem() {
  const rootSystem = new SpotifiubySystem();
  rootSystem.register(new PersistentSystem());
  rootSystem.register(new DefaultTranslationSystem());
  rootSystem.register(new UserSystem());
  rootSystem.register(new ConnectionSystem(getFromSettings(GATEWAY_HEADERS)));
  rootSystem.register(new SongsSystem());
  rootSystem.register(new ChatsSystem());

  if (getFromSettings(AUTHENTICATION_METHOD) === FIREBASE_AUTH_METHOD) {
    rootSystem.register(new FirebaseAuthSystem());
  } else {
    rootSystem.register(new DemoAuthSystem());
  }

  if (Platform.OS === 'android') {
    rootSystem.register(new AndroidNotificationSystem());
  } else {
    rootSystem.register(new WebNotificationSystem());
  }
  return rootSystem;
}

const rootSystem = buildDefaultRootSystem();

// eslint-disable-next-line
export const WithSystem = ({ children }) => {
  return (
    <SystemContext.Provider value={rootSystem}>
      {children}
    </SystemContext.Provider>
  );
};

export default SystemContext;
