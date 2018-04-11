export const setItem = (keyName, keyValue) => {
  window.localStorage.setItem(keyName, JSON.stringify(keyValue))
}

export const getItem = (keyName) => {
  return JSON.parse(window.localStorage.getItem(keyName))
}
