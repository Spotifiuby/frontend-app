import { createContext } from 'react';
import DemoAuthSystem from './AuthSystem/DemoAuthSystem';
import FirebaseAuthSystem from './AuthSystem/FirebaseAuthSystem';
import ConnectionSystem from './ConnectionSystem/ConnectionSystem';
import PersistentSystem from './PersistentSystem/PersistentSystem';
// import TransientPersistationSystem from './PersistentSystem/TransientPersistationSystem';
import getFromSettings, { AUTHENTICATION_METHOD, FIREBASE_AUTH_METHOD } from './settings';
import SongsSystem from './SongsSystem/SongsSystem';
import SpotifiubySystem from './SpotifiubySystem';
import DefaultTranslationSystem from './TranslationSystem/DefaultTranslationSystem';
import UserSystem from './UserSystem/UserSystem';

const SystemContext = createContext();

function buildDefaultRootSystem() {
  const rootSystem = new SpotifiubySystem();
  rootSystem.register(new PersistentSystem());
  // rootSystem.register(new TransientPersistationSystem());
  rootSystem.register(new DefaultTranslationSystem());
  rootSystem.register(new UserSystem());
  rootSystem.register(new ConnectionSystem());
  rootSystem.register(new SongsSystem());
  if (getFromSettings(AUTHENTICATION_METHOD) === FIREBASE_AUTH_METHOD) {
    rootSystem.register(new FirebaseAuthSystem());
  } else {
    rootSystem.register(new DemoAuthSystem());
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
