export const saveAuthTokenAndUserId = (authToken, userid) => {
  console.log('logged in')
  try {
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('userid', userid)
  } catch(e) {}
};

export const clearLocalStorage = () => {
  console.log('logged out')
  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userid')
  } catch(e) {}
};