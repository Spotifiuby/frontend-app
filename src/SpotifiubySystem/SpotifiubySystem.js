import GenericSystem from './GenericSystem';

const SpotifiubySystemInterface = 'SpotifiubySystemInterface';

export default class SpotifiubySystem extends GenericSystem {
  constructor() {
    super();
    this.systems = {};
  }

  implementing() {
    return SpotifiubySystemInterface;
  }

  register(aSystem) {
    const systemName = aSystem.implementing();
    if (systemName in this.systems) {
      throw new Error(`System ${systemName} already registered`);
    }
    aSystem.assignParent(this);
    this.systems[systemName] = aSystem;
  }

  systemImplementing(aClassInterface) {
    if (!(aClassInterface in this.systems)) {
      throw new Error(`System ${aClassInterface} is not registered`);
    }
    return this.systems[aClassInterface];
  }
}
