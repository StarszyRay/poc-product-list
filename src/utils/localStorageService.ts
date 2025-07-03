const set = (key: string, value: unknown): void => {
  try {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  } catch (error) {
    console.error(`Error setting localStorage item with key "${key}":`, error);
  }
};

const get = <T>(key: string): T | null => {
  let item = null;
  try {
    item = localStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting localStorage item with key "${key}":`, error);
    return null; // Return null if there's an error accessing localStorage under the key
  }

  if (item === null) return null;
  try {
    return JSON.parse(item) as T;
  } catch (error) {
    return item as T | null; // Return the raw string or null if parsing fails
  }
};

const localStorageService = {
  get,
  set,
};

export default localStorageService;
