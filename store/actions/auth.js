import { AsyncStorage } from 'react-native';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer; 

const clearLogoutTimer = () => {
   if(timer) {
     clearTimeout(timer); 
   }
}

const setLogoutTimer = expiryTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expiryTime);
  };
};

export const logout = () => {
  clearLogoutTimer(); 
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  }
};

export const login = (email, password) => {
  return async dispatch => {
    const resp = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDv-b1uh3cAr4sRwfRItb_FNJ94axo4Vlk',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!resp.ok) {
      const errorRespData = await resp.json();
      let errorId = errorRespData.error.message;
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found';
      } else if ((errorId = 'INVALID_PASSWORD')) {
        message = 'This password is not valid';
      }
      throw new Error(message);
    }
    const respData = await resp.json();
    dispatch(authenticate(respData.localId, respData.idToken, parseInt(respData.expiresIn) * 1000));
    const expiryDate = new Date(
      new Date().getTime() + parseInt(respData.expiresIn) * 1000
    );
    saveDataToStorage(respData.idToken, respData.localId, expiryDate);
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const resp = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDv-b1uh3cAr4sRwfRItb_FNJ94axo4Vlk',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!resp.ok) {
      const errorRespData = await resp.json();
      let errorId = errorRespData.error.message;
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email is taken';
        throw new Error(message);
      }
    }
    const respData = await resp.json();
    dispatch(authenticate(respData.localId, respData.idToken, parseInt(respData.expiresIn) * 1000));
    const expiryDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(respData.idToken, resData.localId, expiryDate);
  };
};

const saveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expiryDate.toISOString()
    })
  );
};
