export const LocalStorageSet = ( name,token) => {
  if (token && name) {
    localStorage.setItem(name, token);
    return true;
  } else {
    return false;
  }
};
