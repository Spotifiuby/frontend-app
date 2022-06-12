export default class GenericSystem {
  subclassResponsability() {
    throw new Error('Method must be implemented on child class');
  }

  implementing() {
    this.subclassResponsability();
  }

  assignParent(aGenericSystem) {
    this.parent = aGenericSystem;
  }
}
