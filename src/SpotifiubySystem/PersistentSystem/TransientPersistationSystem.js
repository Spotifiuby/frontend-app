import GenericSystem from '../GenericSystem';
import PersistentSystemInterface from './PersistentSystemInterface';

export default class TransientPersistationSystem extends GenericSystem {
  constructor() {
    super();
    this.data = {};
  }

  implementing() {
    return PersistentSystemInterface;
  }

  async storeOn(aKey, aValue) {
    this.data[aKey] = aValue;
  }

  async readFrom(aKey) {
    if (this.data[aKey] === undefined) throw new Error('Key not found');
    return this.data[aKey];
  }

  async remove(aKey) {
    delete this.data[aKey];
  }
}
