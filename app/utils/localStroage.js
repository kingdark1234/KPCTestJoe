export const getLocalStorageValue = itemKey =>
  window.localStorage.getItem(itemKey);

export const setLocalStorageValue = (itemKey, value) =>
  window.localStorage.setItem(itemKey, value);

export const getParsedLocalStorageValue = itemKey =>
  JSON.parse(getLocalStorageValue(itemKey));

export const setParsedLocalStorageValue = (itemKey, value) =>
  window.localStorage.setItem(itemKey, JSON.stringify(value));

export const removeLocalStroageByKey = key =>
  window.localStorage.removeItem(key);
