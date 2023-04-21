export const LocalStorageSet = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    return true;
  } else {
    return false;
  }
};
