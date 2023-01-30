class Storage {
  storage;
  constructor(getStorage = () => window.localStorage) {
    this.storage = getStorage();
  }

  get(key) {
    return this.storage.getItem(key);
  }
  set(key, value) {
    return this.storage.setItem(key, value);
  }
  remove(key) {
    return this.storage.removeItem(key);
  }
  removeMultiple(keys) {
    keys.forEach((key) => this.remove(key));
  }
}

export const storage = {
  local: new Storage(),
  session: new Storage(() => window.sessionStorage),
};
