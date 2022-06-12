import AsyncStorage from '@react-native-async-storage/async-storage';
import GenericSystem from '../GenericSystem';
import PersistentSystemInterface from './PersistentSystemInterface';

export default class PersistentSystem extends GenericSystem {
  implementing() {
    return PersistentSystemInterface;
  }

  storeOn(aKey, aValue) {
    return AsyncStorage.setItem(aKey, JSON.stringify(aValue));
  }

  async readFrom(aKey) {
    const value = await AsyncStorage.getItem(aKey);
    if (value === null) {
      throw new Error(`Key: ${aKey} could not be found on storage`);
    }
    return JSON.parse(value);
  }

  async remove(aKey) {
    await AsyncStorage.removeItem(aKey);
  }
}
